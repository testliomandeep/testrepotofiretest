import Page from './Page';
import automationProperties from '../properties/AutomationProperties';
const logger = require('../utils/Logger');
const log = logger(module);

export default abstract class MobileScreen extends Page {

    protected constructor(client) {
        super(client);
    }

    async navigateBack(selector) {

        if (automationProperties.isIOSExecution()) {
            await this.driver.$(selector).touchAction('tap');
        } else {
            await this.driver.back();
        }
    }

    async tapOnElementBySelector(selector) {

        await this.driver.$(selector).touchAction('tap');
    }

    async tapOnElementBySelectorByLocation(selector) {

        const { y, x} = await this.driver.$(selector).getLocation();
        log.info(`xPoint: ${x}, yPoint: ${y}`);

        await this.driver.touchAction({
            action: 'tap',
            x: x,
            y: y
        });
    }

    async scrollVerticalView(direction) {

        let startY;
        let endY;
        const { width, height } = await this.driver.getWindowSize();
        log.info("Width: " +  width + " and Height: " + height);
        const anchor = width * 0.5;
        if (direction.toLowerCase() === "up") {
            startY = height * 0.5;
            endY = width * 0.2;
        } else if (direction.toLowerCase() === "down") {
            startY = height * 0.2;
            endY = width * 0.5;
        } else {
            log.error('Illegal direction passed');
        }

        try {
            await this.driver.touchPerform([
                {
                    action: 'press',
                    options: {
                        x: anchor,
                        y: startY,
                    },
                },
                {
                    action: 'wait',
                    options: {
                        ms: 100,
                    },
                },
                {
                    action: 'moveTo',
                    options: {
                        x: anchor,
                        y: endY,
                    },
                },
                {
                    action: 'release',
                    options: {},
                },
            ]);
            log.info(`Swiping down from: (on X) ${anchor} and (on Y): ${startY} to ${endY}`);
        } catch (e) {
            log.error("Swipe did not complete successfully: " + e);
        }
    }

    async scrollDownScrollView() {
        await this.scrollVerticalView("down");
    }

    async scrollUpScrollView() {

        await this.scrollVerticalView("up");
    }

    async scrollDownViewWithParameters(start, end) {
        const { width, height } = await this.driver.getWindowSize();
        const startY = height * start;
        const endY = height * end;

        const anchor = width * 0.5;
        try {
            await this.driver.touchPerform([
                {
                    action: 'press',
                    options: {
                        x: anchor,
                        y: startY,
                    },
                },
                {
                    action: 'wait',
                    options: {
                        ms: 100,
                    },
                },
                {
                    action: 'moveTo',
                    options: {
                        x: anchor,
                        y: endY,
                    },
                },
                {
                    action: 'release',
                    options: {},
                },
            ]);
            log.info(`Swiping down from: (on X) ${anchor} and (on Y): ${startY} to ${endY}`);
        } catch (e) {
            log.error("Swipe did not complete successfully");
        }
    }

    async scrollDownScrollViewTimes(times) {
        for (let scrollAttempts = 0; scrollAttempts < times - 1; scrollAttempts++) {
            await this.scrollDownScrollView();
            log.info("Scroll down #" + scrollAttempts);
        }
    }

    async scrollUpScrollViewTimes(times) {

        for (let scrollAttempts = 0; scrollAttempts < times - 1; scrollAttempts++) {
            await this.scrollUpScrollView();
            log.info("Scroll down #" + scrollAttempts);
        }
    }

    async scrollElementListBySelectorHorizontally(selector, increaseDistanceBy) {

        const elementWidth = await this.driver.$$(selector)[0].getSize('width');
        const elementHeight = await this.driver.$$(selector)[0].getSize('height');
        const x = await this.driver.$$(selector)[0].getLocation('x');
        const y = await this.driver.$$(selector)[0].getLocation('y');
        const anchor = elementHeight + y / 2;

        const xElementCenter = elementWidth + x / 2;
        const startX = xElementCenter * increaseDistanceBy;
        const endX = xElementCenter * 0.2;

        try {
            await this.driver.touchPerform([
                {
                    action: 'press',
                    options: {
                        x: startX,
                        y: anchor,
                    },
                },
                {
                    action: 'wait',
                    options: {
                        ms: 100,
                    },
                },
                {
                    action: 'moveTo',
                    options: {
                        x: endX,
                        y: anchor,
                    },
                },
                {
                    action: 'release',
                    options: {},
                },
            ]);

            log.info(`Swiping down from: (on Y) ${anchor} and (on X): ${startX} to ${endX}`);
        } catch (e) {
            log.error("Swipe did not complete successfully");
        }
    }

    async isElementPresentWithScrollAttempts(selector, scrollAttempts) {

        let isElementFound = await this.isElementPresentBySelector(selector);
        let numberOfScrolls = 0;
        while (!isElementFound && numberOfScrolls < scrollAttempts) {
            await this.scrollDownScrollView();
            isElementFound = await this.isElementPresentBySelectorWithTimeout(selector, 1000);
            numberOfScrolls++;
        }
        return await this.isElementPresentBySelectorWithTimeout(selector, 1000);
    }

    async isListElementPresentBySelectorWithOneScrollAttempt(selector) {

        let isElementFound = await this.driver.$$(selector).length > 0;
        let numberOfScrolls = 0;
        while (!isElementFound && numberOfScrolls < 1) {
            await this.scrollDownScrollView();
            isElementFound = await this.driver.$$(selector).length > 0;
            numberOfScrolls++;
        }
        return await this.isElementPresentBySelectorWithTimeout(selector, 1000);
    }

    async toggleWiFiOnDevice() {

        try {
            await this.driver.toggleWiFi();
        } catch (e) {
            log.error(`Error while toggling WiFi: ${e}`);
        }
    }

    async closeAppOnDevice() {

        try {
            await this.driver.closeApp();
        } catch (e) {
            log.error(`Error while closing app: ${e}`);
        }
    }

    async launchAppOnDevice() {

        const command = 'mobile: launchApp';
        const args = {bundleId: automationProperties.bundleID};
        log.info('Launching app');
        if (automationProperties.isIOSExecution()) {
            try {
                await this.executeMobileCommandOnDevice(command, args);
            } catch (e) {
                log.error(`Error while launching app:${e}`);
            }
        } else {
            await this.driver.launchApp();
        }
    }

    async executeMobileCommandOnDevice(command, jsonArgs) {

        if (typeof jsonArgs !== 'undefined') {
            try {
                await this.driver.execute(command, jsonArgs);
            } catch (e) {
                log.error(`Error while executing mobile commands "${command}" with args "${jsonArgs}": ${e}`);
            }
        } else {
            try {
                await this.driver.execute(command);
            } catch (e) {
                log.error(`Error while executing mobile commands "${command}"": ${e}`);
            }
        }
    }

    /*async checkImageSimilarity(selector, image) {
        //wdioImageComparisonService.defaultOptions.autoSaveBaseline = true;
        //browser.defaultOptions = wdioImageComparisonService.defaultOptions;
        //browser.folders = wdioImageComparisonService.folders;

        //wdioImageComparisonService.before(browser.capabilities);
        await browser.saveElement(browser.$(selector), 'firstButtonElement', {});
        await executionHelper.sleepInSeconds(2);
        let result = await browser.checkElement(browser.$(selector), 'firstButtonElement', {} );
        log.info(`The value of the result: ${result}`);
    }*/
}
