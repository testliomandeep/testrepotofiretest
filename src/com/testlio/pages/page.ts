import { step } from 'allure-decorators';
import AllureReportHelper from '../lib/utils/AllureReportHelper';
import ExecutionHelper from '../lib/utils/ExecutionHelper';
type BrowserSync = import('webdriverio/build/types').Browser<'async'>;
type ElementSync = import('webdriverio/build/types').Element<'async'>;
const logger = require('../lib/utils/Logger');
const log = logger(module);


// tslint:disable-next-line:class-name
export abstract class page {
    private readonly driver: BrowserSync;
    protected constructor(driver) {
        this.driver = driver;
    }

    public getDriver(): BrowserSync {
        return this.driver;
    }

    public async openUrl(url: string) {
        await this.driver.url(url);
    }

    public async inputElement() {
        const inputElem = await this.driver.$('#search_form_input_homepage');
        await inputElem.setValue('WebdriverIO');
    }

    @step('Is element present by selector')
    public async isElementPresentBySelector(selector): Promise<boolean> {
        AllureReportHelper.createAllureParameters('selector', `${selector}`);
        try {
            return await this.driver.$(selector).isEnabled();
        } catch (e) {
            return false;
        }
    }

    /**
     * Check if element by selector is displayed
     * @param selector
     */
    @step('Is element displayed by selector')
    public async isElementDisplayedBySelector(selector): Promise<boolean> {
        AllureReportHelper.createAllureParameters('selector', `${selector}`);
        try {
            return await this.driver.$(selector).isDisplayed();
        } catch (e) {
            return false;
        }
    }

    @step('Set value to element by selector')
    public async setValueToElementBySelector(selector, input) {
        AllureReportHelper.createAllureParameters('selector,input', `${selector},${input}`);
        await this.driver.$(selector).setValue(input);
        await AllureReportHelper.attachScreenShot(this.getDriver());
    }

    @step('Click on element by selector')
    async clickOnElementBySelector(selector) {
        AllureReportHelper.createAllureParameters('selector', `${selector}`);
        await this.driver.$(selector).click();
    }

    @step('Resolve element locator')
    async resolveElementLocator(element: ElementSync) {
        await AllureReportHelper.attachScreenShot(this.getDriver());
    }

    @step('Hover to element by selector')
    async hoverToElementBySelector(element: ElementSync) {
        AllureReportHelper.createAllureParameters('element.selector', `${element.selector}`);
        await element.moveTo();
    }
    @step('Switch to opened window')
    async switchToOpenedWindow(): Promise<void> {
        log.info('Switch to current window');
        await ExecutionHelper.sleepInSeconds(5);
        const currentWindowSession = await this.getCurrentWindowHandle();
        log.info(`Current Window Session is: ${currentWindowSession}`);
        const windowSessions = await this.getWindowHandles();
        log.info(`Window sessions available: ${windowSessions}`);

        for (const session of windowSessions) {
            if (session !== currentWindowSession) {
                await this.switchToWindowByWinHandle(session);
            }
        }
    }
    @step('Get current window handles')
    async getCurrentWindowHandle(): Promise<string> {
        const currentWindowSession = await this.driver.getWindowHandle();
        log.info(`The current window session is: ${currentWindowSession}`);
        return currentWindowSession;
    }
    @step('Get window handles')
    async getWindowHandles(): Promise<string[]> {
        log.info(`In getWindowHandles`);
        const winHandles = await this.driver.getWindowHandles();
        log.info(`Window Handles: ${winHandles}`);
        return winHandles;
    }
    @step('Switch to window by win handle')
    async switchToWindowByWinHandle(winHandle: string): Promise<void> {
        AllureReportHelper.createAllureParameters("winhandle", `${winHandle}`);
        log.info(`Switching to window handle: ${winHandle}`);
        try {
            await this.driver.switchToWindow(winHandle);
        } catch (e) {
            log.error(`Error while switching to Handle:${winHandle} is: ${e}`);
        }
    }

    @step('Switch to newly opened window if it was opened')
    async switchToNewlyOpenedWindowIfItWasOpened(currentOpenedWindowSessions: string[]): Promise<void> {
        AllureReportHelper.createAllureParameters("currentOpenedWindowSessions",
            `${currentOpenedWindowSessions.toString()}`);
        const currentWindowSession = await this.getCurrentWindowHandle();
        try {
            await this.driver.waitUntil(
                async () => (await this.getWindowHandles()).length > currentOpenedWindowSessions.length,
                {
                    timeout: 50000,
                    timeoutMsg: 'expected Windows Handles length to greater than currentOpenedWindows Session'
                }
            );
            let currentWindowSessionsAfterAction = await this.getWindowHandles();
            currentWindowSessionsAfterAction = currentWindowSessionsAfterAction.filter( ( element ) => {
                return currentOpenedWindowSessions.indexOf( element ) < 0;
            } );
            for (let i = 0; i < currentWindowSessionsAfterAction.length; i++) {
                if (currentOpenedWindowSessions[i] !== currentWindowSession) {
                    await this.switchToWindowByWinHandle(currentOpenedWindowSessions[i]);
                }
            }
        } catch (e) {
            log.error(`Now new window detected. Stay on the same opened window, with error: ${e}`);
        }
    }
}