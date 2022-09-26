const AutomationProperties = require("./src/com/testlio/lib/properties/AutomationProperties");
module.exports = {
    reporterEnabled: 'spec, allure-mocha',
    allureMochaReporterOptions: {
        resultsDir: process.env.ALLURE_RESULTS_DIR || AutomationProperties.default.allureResult
        //resultDir: './allure-results'
    }
};