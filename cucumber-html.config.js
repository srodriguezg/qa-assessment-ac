const reporter = require('cucumber-html-reporter');

const options = {
    brandTitle: 'Test Cases',
    jsonFile: 'reports/cucumber_report.json',
    launchReport: false,
    name: 'My Tasks Automated bugs reported',
    output: 'reports/cucumber_report.html',
    reportSuiteAsScenarios: true,
    scenarioTimestamp: true,
    theme: 'bootstrap'
};

reporter.generate(options);

// more info on `metadata` is available in `options` section below.

// to generate consolidated report from multi-cucumber JSON files, please use `jsonDir` option instead of `jsonFile`.
// More info: https://www.npmjs.com/package/cucumber-html-reporter
