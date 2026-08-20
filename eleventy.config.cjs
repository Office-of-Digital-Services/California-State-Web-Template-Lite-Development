//@ts-check
const docSiteUrl = "https://template.webstandards.ca.gov/";
const path = require("path");
const postcss = require("postcss");
const postcssNested = require("postcss-nested");
const PurgeCSS = require("@fullhuman/postcss-purgecss");

/**
 * @typedef {import("@11ty/eleventy/src/defaultConfig").defaultConfig} EleventyDefaultConfig
 * @typedef {import("@11ty/eleventy/src/UserConfig").default} EleventyConfig
 */

module.exports = function (/** @type {EleventyConfig} **/ eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    "src/fonts": "/fonts",
    "sample_site/images": "images",
    "sample_site/siteRoot": "/",
    components: "/components"
  });

  // Watch the ./src/css/ folder for changes
  eleventyConfig.addWatchTarget("./src/**/*");
  eleventyConfig.addWatchTarget("./sample_site/**/*.html.*");
  eleventyConfig.addWatchTarget(
    "./sample_site/pages/independent-components/**/*.css"
  );

  // Ignore this file that gets dynamically created
  eleventyConfig.watchIgnores.add("./src/css/cagov/template-comments.css");

  //Sorted list of all the samples
  eleventyConfig.addFilter(
    "allSamples",
    (/** @type {{data:{title:string, tags:string}}[]} */ values) => {
      return values
        .slice()
        .filter(x => x.data.tags == "sample")
        .sort((a, b) => (a.data.title || "").localeCompare(b.data.title));
    }
  );

  //Automatically uses the template site URL for images inside sample content
  eleventyConfig.addFilter(
    "SampleCodeUseMainSiteImages",
    (/** @type {string} */ content) =>
      content
        .replace(/="\/images\//g, `="${docSiteUrl}images/`)
        .replace(/url\('\/images\//g, `url('${docSiteUrl}images/`)
  );

  /**
   * @param {string} content
   */
  const minifyCSS = content =>
    content
      .replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, "")
      .replace(/ {2,}/g, " ")
      .replace(/ ([{:}]) /g, "$1")
      .replace(/([{:}]) /g, "$1")
      .replace(/([;,]) /g, "$1")
      .replace(/ !/g, "!");

  eleventyConfig.addNunjucksAsyncFilter(
    "cssmin",
    /**
     *
     * @param {string} code
     * @param {(arg0: null, arg1: string) => void} callback
     */

    async (code, callback) => {
      callback(null, minifyCSS(code));
    }
  );

  // PurgeCSS filter to extract only used CSS
  eleventyConfig.addFilter(
    "purgeCSS",
    async (
      /** @type {string} */ css,
      contentPaths = [
        "./sample_site/**/*.html",
        "./sample_site/**/*.njk",
        "./src/css/**/*.css",
        "./src/js/**/*.js",
        "./src/js/**/*.js"
      ]
    ) => {
      const isFullCSS = process.env.FULL_CSS_BUILD === "true";

      // Skip PurgeCSS entirely in fullCSS mode
      if (isFullCSS) {
        console.log("📦 FULL CSS BUILD: Skipping PurgeCSS");
        return css; // Return unminified CSS, since we'll run it through minifyCSS filter later
      }

      // Normal dev build → run PurgeCSS
      const result = await postcss([
        // @ts-ignore
        PurgeCSS({
          content: contentPaths,
          safelist: [
            ":nth-child",
            ":first-of-type",
            ":first-child",
            ":hover",
            ":focus",
            /focus/,
            "focus-visible",
            "focus-within",
            /^modal-backdrop/
          ],
          defaultExtractor: (/** @type {string} */ content) =>
            content.match(/[\w-/:]+(?<!:)/g) || []
        })
      ]).process(css, { from: undefined });

      return result.css;
    }
  );

  // Add regexReplace filter
  const newLocal = "regexReplace";
  eleventyConfig.addFilter(newLocal, (value, pattern, replacement) => {
    const regex = new RegExp(pattern, "g");
    return value.replace(regex, replacement);
  });

  // For making a non-nested fallback
  eleventyConfig.addFilter("flattenCSS", async code => {
    const result = await postcss([postcssNested])
      .use(require("postcss-aspect-ratio-polyfill"))
      .process(code, {
        from: undefined
      });
    return result.css;
  });

  // Read file content and escape HTML for code display
  const fs = require("fs");
  const markdownIt = require("markdown-it");
  const markdownRenderer = markdownIt({
    html: true,
    linkify: true,
    typographer: true
  });

  eleventyConfig.addFilter("readMarkdownAsHtml", filePath => {
    try {
      const fullPath = path.join(__dirname, filePath);
      const content = fs.readFileSync(fullPath, "utf-8");
      return markdownRenderer.render(content);
    } catch (error) {
      console.error(`Error reading markdown file ${filePath}:`, error.message);
      return `<p>Error rendering markdown file: ${filePath}</p>`;
    }
  });

  eleventyConfig.addFilter("readFileForCode", filePath => {
    try {
      const fullPath = path.join(__dirname, filePath);
      const content = fs.readFileSync(fullPath, "utf-8");
      // Escape HTML entities
      return content
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
    } catch (error) {
      console.error(`Error reading file ${filePath}:`, error.message);
      return `<!-- Error reading file: ${filePath} -->`;
    }
  });

  //Start with default config, easier to configure 11ty later
  /** @type {EleventyDefaultConfig} */
  const config = {
    // allow nunjucks templating in .html files
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    templateFormats: ["html", "njk", "11ty.js", "md"],
    keys: {},
    dir: {
      // site content pages
      input: "sample_site/pages",
      // site structure pages (path is realtive to input directory)
      data: "../_data",
      includes: "../_includes",
      // @ts-ignore
      layouts: "../_includes/layouts",
      // site final outpuut directory
      output: "_site"
    }
  };

  //Adding a transform to make the output work as non-server static files
  eleventyConfig.addTransform(
    "staticPaths",
    /**
     * @param {string} content
     * @param {string} outputPath
     */
    async (content, outputPath) => {
      const basePath = config.dir.output;

      const relativePath = path
        .relative(path.dirname(outputPath), path.dirname(basePath))
        .slice(0, -2); //removing last 2 dots

      return content
        .replace(/href="(.*\/)"/g, 'href="$1index.html"') // fixing any root path links
        .replace(/="\//g, `="${relativePath}`); //Replace all ... ="/  ... with new path
    }
  );

  return config;
};
