//const AutomationProperties = require('./src/com/testlio/lib/properties/AutomationProperties');
//const AutomationProperties = require("./src/com/testlio/lib/properties/AutomationProperties");
module.exports = {
  "exit": true,
  "timeout": 0,
  "spec": "src/tests/MasterSuite.ts",
  //"grep": AutomationProperties.default.returnTGrep(),
  "recursive": true,
  "reporter": "mocha-multi-reporters",
  "reporter-option": "configFile=reporterConfig.js",
  "require": "ts-node/register"
}