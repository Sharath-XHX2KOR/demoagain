//set up project configuration in this file
const cucumber = require('cypress-cucumber-preprocessor').default
const marge = require('mochawesome-report-generator');
const { defineConfig } = require("cypress");
const fs = require('fs-extra');
const path = require("path");
const fetchConfigurationByFile = (file) => {
  const pathOfConfigurationFile = path.join(process.cwd(), `cypress/env`, `${file}.env`) //path of the env file
  return (
    file && fs.readJson(pathOfConfigurationFile));
};
module.exports = defineConfig({
    video: true,
  e2e: {
    setupNodeEvents (on, config) {
      on('after:run', (results) => {
        // Check if results include failures
        const hasFailures = results.totalFailed > 0;

        // Generate Mochawesome report
        const options = {
          reportTitle: 'Cypress Tests',
          inline: true,
          charts: true,
          overwrite: false,
          // other configuration options...
        };

        // Use marge to generate the report
        marge(results, options);
      });

      on('file:preprocessor', cucumber())
      return fetchConfigurationByFile(config.env.configFile || "qa") || config;  //qa will be the default env if not mentioned.
    },
    specPattern: "cypress/e2e/consumer/**/*.feature", //will refer the featurefiles steps
  }
}
);