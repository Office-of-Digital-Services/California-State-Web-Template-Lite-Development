# California State Web Template Lite Development

This repository contains the development source code for the California State Web Template Lite, an independent, stand-alone component library for California government websites.

## About State Web Template Lite

State Web Template Lite is an independent, stand-alone component library for California government websites. Each component is designed to be dropped into a page with minimal setup and without framework lock-in.

### Built for a no-code first workflow

Most teams can implement Template Lite components using only HTML and CSS. This no-code approach makes adoption faster, reduces maintenance complexity, and keeps content teams productive.

- Independent components that can be used one at a time
- Consistent visual patterns across pages and services
- Simple integration into static sites, CMS pages, and server-rendered templates

### JavaScript is progressive enhancement

Components are built to work without JavaScript whenever possible. JavaScript is included to enhance accessibility, provide polyfills for broader browser support, and improve usability in advanced interactions.

- Accessibility enhancements for interactive controls
- Polyfills for cross-browser behavior and compatibility
- Usability improvements such as better keyboard and interaction handling

### Use what you need

You can start with a single component and expand over time. Template Lite is intentionally modular, so teams can scale from one page pattern to a complete design implementation at their own pace.

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/Office-of-Digital-Services/California-State-Web-Template-Lite-Development.git
cd California-State-Web-Template-Lite-Development
npm install
```

### NPM Commands

**Start development server** - Watches for changes and serves the site locally:

```bash
npm start
```

**Build the project** - Creates optimized production files:

```bash
npm run build
```

**Build with full CSS** - Generates a complete CSS build:

```bash
npm run buildFullCSS
```

**Watch JavaScript** - Watches and rebuilds JavaScript files only:

```bash
npm run watch:js
```

**Watch Eleventy** - Watches and rebuilds Eleventy templates only:

```bash
npm run watch:eleventy
```

**Build JavaScript** - Builds JavaScript files without watching:

```bash
npm run build:js
```

**Build Eleventy** - Builds Eleventy templates without watching:

```bash
npm run build:eleventy
```

**Stylelint** - Check CSS/SCSS for linting issues and auto-fix:

```bash
npm run stylelint run fix
```

## How to Use This Repository

You can use this repository to download, clone, fork or contribute to the development of the State Web Template Lite. You can also browse the components, explore color themes and learn what's new in the latest version of the template.

To download or clone this repository, click on the green **Code** button on the top right corner of this page. You can also use the command line to clone the repository using `git clone https://github.com/Office-of-Digital-Services/California-State-Web-Template-Lite-Development.git`.

To fork this repository, click on the **Fork** button on the top right corner of this page. This will create a copy of this repository in your own GitHub account that you can modify and customize.

To contribute to this repository, you can create a pull request with your proposed changes. Please follow the contribution guidelines before submitting a pull request.

## Documentation

For more information on how to use the state web template, please visit [webstandards.ca.gov](https://webstandards.ca.gov/template/). There you will find documentation on how to get started, how to customize the template, how to follow the web standards and best practices, and how to join the community of web developers and designers working with the state web template.

You can also visit [template.webstandards.ca.gov](https://template.webstandards.ca.gov/) to see examples of websites built with the state web template and learn more about the upcoming design system that will replace the state web template in the future.

## License

The state web template is licensed under the MIT License. See [LICENSE](https://github.com/Office-of-Digital-Services/California-State-Web-Template-Development/blob/main/LICENSE) for details.
