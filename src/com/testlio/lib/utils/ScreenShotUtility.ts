import AutomationProperties from '../properties/AutomationProperties';

const logger = require('./Logger');
const log = logger(module);
type ElementSync = import('webdriverio/build/types').Element<'async'>;
type BrowserSync = import('webdriverio/build/types').Browser<'async'>;

const WdioImageComparisonService = require('wdio-image-comparison-service').default;

const wdioImageComparisonService = new WdioImageComparisonService({});

const nativeImageService = require('wdio-native-app-compare-service').default;
const nativeImage = new nativeImageService({
    baselineFolder: 'test/image-baseline',
    screenshotPath: '.tmp/image-compare',
    autoSaveBaseline: true
});

class ScreenShotUtility {

    async saveScreenshot(name: string, driver: BrowserSync) {

        const filePath: string = `${AutomationProperties.appiumScreenshotPath}/${name}.png`;
        log.info('The file path is: ' + filePath);
        try {
            await driver.saveScreenshot(filePath);
        } catch (e) {
            log.info('Getting screen shot might not be possible this time: ' + e);
        }

    }

    async compareImages(browser): Promise<number> {
        global.browser = browser;
        wdioImageComparisonService.before(browser.capabilities);
        wdioImageComparisonService.defaultOptions.autoSaveBaseline = true;
        browser.defaultOptions = wdioImageComparisonService.defaultOptions;
        browser.folders = wdioImageComparisonService.folders;
        await browser.saveElement(await browser.$("//ul[@class='menu logo-home']"), 'logo');
        const result: number = await browser.checkElement(await browser.$("//ul[@class='menu logo-home']"), 'logo');

        log.info('The value of checkElement: ' + result);
        return result;

    }

    async compareImagesMobile(driver, element: ElementSync): Promise<number> {
        global.driver = driver;

        nativeImage.before(driver.capabilities);

        await driver.saveElement(element, 'logo');
        return (await driver.compareElement(element, 'logo')).misMatchPercentage;
    }
}

export default new ScreenShotUtility();