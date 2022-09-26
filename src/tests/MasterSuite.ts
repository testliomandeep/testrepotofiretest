import testReader from '../com/testlio/lib/excelReader/TestReader';
import { allure, MochaAllure } from 'allure-mocha/runtime';
import { decorate } from 'allure-decorators';
import AutomationProperties from '../com/testlio/lib/properties/AutomationProperties';
const logger = require('../com/testlio/lib/utils/Logger');
const log = logger(module);

function importTest(name, path) {
    describe(name, () => {
        require(path);
    });
}

// @ts-ignore
declare function require(path: string);

describe('top suite', () => {

    before(async () => {
        decorate<MochaAllure>(allure);
    });

    if (AutomationProperties.testSpec !== 'undefined') {
        importTest('Custom Test', AutomationProperties.testSpec);
    } else {
        const a: Map<string, string> = testReader.getTestList();
        for (const [key, value] of a) {
            log.info(`Key : ${key} and Value : ${value}`);
            importTest(key, value);
        }
    }

    after(async () => {
        log.info('after all tests');
    });
});
