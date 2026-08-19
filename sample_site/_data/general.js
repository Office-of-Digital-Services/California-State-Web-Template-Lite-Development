const packageJsonVersion = require("../../package.json").version;

module.exports = {
  CdnPath: `https://cdn.cdt.ca.gov/cdt/statetemplate/${packageJsonVersion}/`,
  StateTemplateVersion: packageJsonVersion
};
