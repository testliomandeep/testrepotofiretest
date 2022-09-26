import { allure } from 'allure-mocha/runtime';
import { ContentType } from 'allure-js-commons';
import { Browser } from 'webdriverio';
const logger = require('./Logger');
const log = logger(module);

class AllureReportHelper {
    async attachScreenShot(driver: Browser<'async'>) {
        const buf64: string = await driver.takeScreenshot();
        const buf: Buffer = Buffer.from(buf64, 'base64');
        await allure.attachment('Screenshot', buf, ContentType.PNG);
    }
    createAllureParameters(nameParameters: string, valueParameters: string) {
        if (nameParameters.includes(',') && valueParameters.includes(',')) {
            const nameArray: string[] = nameParameters.split(',');
            const valueArray: string[] = valueParameters.split(',');
            if (nameArray.length === valueArray.length) {
                for (let i = 0; i < nameArray.length; i++) {
                    allure.parameter(nameArray[i], valueArray[i]);
                }
            } else {
                log.info('The length of nameArray is not equal to the length of valueArray, hence not creating parameters');
            }
        } else {
            allure.parameter(nameParameters, valueParameters);
        }
    }
}

export default new AllureReportHelper();