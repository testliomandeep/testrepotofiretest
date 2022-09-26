import Page from './Page';
import validUrl from 'valid-url';
import initPage from './InitPage';
import { step } from 'allure-decorators';
import AllureReportHelper from '../utils/AllureReportHelper';
import { Browser } from 'webdriverio';
import InitPage from "./InitPage";
const logger = require('../utils/Logger');
const log = logger(module);
import automationProperties from '../properties/AutomationProperties';

type ElementSync = import('webdriverio/build/types').Element<'async'>;


export default abstract class Webpage extends Page {
    /**
     * Constructor for Webpage class
     * @param driver
     * @protected
     */
    protected constructor (driver: Browser<'async'>) {
        super(driver);
    }

    /**
     * Open the passed url
     * @param url
     * @param page
     */
    @step('Open url')
    async open<T extends Page>(url, page: T): Promise<T> {
        AllureReportHelper.createAllureParameters("url", `${url}`);
        try {
            if (validUrl.isUri(url)) {
                await this.driver.url(url);
                log.info(`The opened url title is: ${await this.getWindowTitle()}`);
                return InitPage.initPage(page);
            } else {
                log.error('Not a valid url');
            }
        } catch (e) {
            log.error(`Error ${e} happened while opening url: ${url}`);
        }
    }

    /**
     * get current window title
     */
    @step('Get opened window title')
    async getWindowTitle(): Promise<string> {
        return await this.driver.getTitle();
    }

    /**
     * Click on web element using js
     * @param element
     */
    @step('Click on web element using js script')
    async jsClickOnWebElement(element: ElementSync): Promise<void> {
        AllureReportHelper.createAllureParameters("element.selector", `${element.selector}`);
        await this.driver.execute("arguments[0].scrollIntoView();", element );
        await this.driver.execute("arguments[0].click();", element );
    }

    /**
     * Hover to passed element
     * @param element
     */
    @step('Hover to element')
    async hoverToElement(element: ElementSync): Promise<void> {
        AllureReportHelper.createAllureParameters("element.selector", `${element.selector}`);
        await element.moveTo();
    }

    /**
     * Gets web element test using js
     * @param element
     */
    @step('Get web element text using js script')
    async jsGetWebElementText(element: ElementSync): Promise<void> {
        AllureReportHelper.createAllureParameters("element.selector", `${element.selector}`);
        return await this.driver.execute("return arguments[0].textContent", element);
    }

    /**
     * Gets the passed attribute of web element using js
     * @param element
     * @param attribute
     */
    @step('Get web element element attribute')
    async jsGetWebElementAttribute(element: ElementSync, attribute: string): Promise<void> {
        AllureReportHelper.createAllureParameters("element.selector,attribute",
            `${element.selector},${attribute}`);
        return await this.driver.execute(`return arguments[0].getAttribute('${attribute}')`, element);
    }

    @step('Wait till page loaded using js script')
    async jsWaitTillPageLoaded(): Promise<void> {
        await this.driver.waitUntil(
            () => this.driver.execute(() => document.readyState === 'complete'),
            {
                timeout: 60 * 1000, // 60 seconds
                timeoutMsg: 'Message on failure'
            });
    }

    /**
     * Waits till Element to be clickable with timeout
     * @param element
     * @param timeout
     */
    @step('Wait till element to be clickable')
    async waitTillElementToBeClickable(element: ElementSync, timeout: number) {
        AllureReportHelper.createAllureParameters('element.selector,timeout',
            `${element.selector},${timeout}`);
        await element.waitForClickable({timeout: timeout});
    }

    /**
     * Scrolls to web element using js
     * @param element
     */
    @step('Scroll to web element using js script')
    async jsScrollToWebElement(element: ElementSync): Promise<void> {
        AllureReportHelper.createAllureParameters("element.selector", `${element.selector}`);
        await this.driver.execute("arguments[0].scrollIntoView();", element );
    }

    /**
     * Sends text to element using js
     * @param element
     * @param text
     */
    @step('Send text to element using js script')
    async jsSendTextToElement(element: ElementSync, text: string): Promise<void> {
        AllureReportHelper.createAllureParameters("element.selector,text",
            `${element.selector},${text}`);
        await this.driver.execute("arguments[0].setAttribute('value', arguments[1])", element, text);
    }

    /**
     * Checks element by selector is present by JS
     * @param selector
     */
    @step(`Check element by selector is present by JS`)
    async jsIsElementPresent(selector: string): Promise<boolean> {
        AllureReportHelper.createAllureParameters('selector', `${selector}`);
        const element = await this.driver.$(selector);
        const condition = await this.driver
            .execute("return typeof(arguments[0]) != 'undefined' && arguments[0] != null;", element);
        log.info("The value of condition: " + condition.toString());
        if (condition.toString().includes('true')) {
            return true;
        }
        return false;
    }

    /**
     * Scrolls to web element aligned to bottom using js
     * @param element
     */
    @step('Scroll to web element aligned to bottom using js scroll')
    async jsScrollToWebElementAlignedToBottom(element: ElementSync): Promise<void> {
        AllureReportHelper.createAllureParameters("element.selector", `${element.selector}`);
        await this.driver.execute("arguments[0].scrollIntoView(false);", element );
    }

    /**
     * Scrolls to web element aligned to bottom
     * @param element
     */
    @step('Scroll to web element scroll to bottom')
    async scrollToWebElementAlignedToBottom(element: ElementSync): Promise<void> {
        AllureReportHelper.createAllureParameters("element.selector", `${element.selector}`);
        await element.scrollIntoView(false);
    }

    /**
     * Opens another tab
     * @param url
     * @param expectedPage
     * @return expectedPage
     */
    @step('Open another tab')
    async openAnotherWindowTab<T extends Page>(url: string, expectedPage: T): Promise<T> {
        AllureReportHelper.createAllureParameters("url,page", `${url},${expectedPage}`);
        try {
            await this.driver.newWindow(url);
            const windowTitle = await this.driver.getTitle();
            log.info(`Window Title of the newly opened window: ${windowTitle}`);
        } catch (e) {
            log.info(`Error: ${e} happened while opening url: ${url}`);
        }
        return expectedPage;
    }

    /**
     * Gets window handles
     */
    @step('Get window handles')
    async getWindowHandles(): Promise<string[]> {
        log.info(`In getWindowHandles`);
        const winHandles = await this.driver.getWindowHandles();
        log.info(`Window Handles: ${winHandles}`);
        return winHandles;
    }

    /**
     * Gets opened window quantities
     * @returns size
     */
    @step('Get opened window quantities')
    async getOpenWindowsQuantity(): Promise<number> {
        const size = (await this.getWindowHandles()).length;
        log.info(`Windows opened: ${size}`);
        return size;
    }

    /**
     * Get list of current window handles
     */
    @step('Get current window handles')
    async getCurrentWindowHandle(): Promise<string> {
        const currentWindowSession = await this.driver.getWindowHandle();
        log.info(`The current window session is: ${currentWindowSession}`);
        return currentWindowSession;
    }

    /**
     * Switch to another window by passed window handle
     * @param winHandle
     */
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

    /**
     * Switches to opened window
     */
    @step('Switch to opened window')
    async switchToOpenedWindow(): Promise<void> {
        log.info('Switch to current window');
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

    /**
     * Switch to windows and returns passed expected class
     * @param expectedClass
     * @returns expectedClass - <T extends Page>
     */
    @step('Switch to window with expected class')
    async switchToWindowWithExpectedClass<T extends Page>(expectedClass: T): Promise<T> {
        AllureReportHelper.createAllureParameters("expectedClass", `${expectedClass}`);
        await this.driver.waitUntil(
            async () => (await this.getWindowHandles()).length > 1,
            {
                timeout: 50000,
                timeoutMsg: 'expected Windows Handles to greate than 1'
            }
        );
        await this.switchToOpenedWindow();
        log.info("Switch to window happened");
        return expectedClass;
    }

    /**
     * Switches to newly opened window if was opened
     * @param currentOpenedWindowSessions
     */
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

    /**
     * Closes current opened window
     * @param expectedClass
     * @returns expectedClass - <T extends Page>
     */
    @step('Close current opened window')
    async closeCurrentOpenedWindow<T extends Page>(expectedClass: T): Promise<T> {
        AllureReportHelper.createAllureParameters("expectedClass", `${expectedClass}`);
        const handles = await this.getWindowHandles();
        if (handles.length > 1) {
            log.info(`Handle length is greater than 1`);
            await this.driver.closeWindow();
            await this.driver.switchToWindow(handles[0]);
        } else {
            log.info("Window handle count is 1 or less, in else block");
        }
        log.info(`Current Win handle in closeCurrentOpenedWindow is: ${await this.getCurrentWindowHandle()}`);
        return await initPage.initPage(expectedClass);
    }

    /**
     * Gets Element value
     * @param element
     * @returns value - Promise<string>
     */
    @step('Get element value')
    async getElementValue(element: ElementSync): Promise<string> {
        AllureReportHelper.createAllureParameters("element.selector", `${element.selector}`);
        return await element.getValue();
    }

    /**
     * Get element text
     * @param element
     */
    @step('Get element text')
    async getElementText(element: ElementSync): Promise<string> {
        AllureReportHelper.createAllureParameters("element.selector", `${element.selector}`);
        return await element.getText();
    }

    /**
     * Gets url of current window
     * @returns url - Promise<string>
     */
    @step('Get url')
    async getUrl(): Promise<string> {
        return await this.driver.getUrl();
    }

    /**
     * Navigate back
     * @param expectedClass
     * @returns expectedClass - <T extends Page>
     */
    @step('Navigate Back')
    async navigateBack<T extends Page>(expectedClass: T): Promise<T> {
        AllureReportHelper.createAllureParameters("expectedClass", `${expectedClass}`);
        await this.driver.back();
        return expectedClass;
    }

    /**
     * Navigate to URL
     * @param url
     */
     @step('Navigate to URL')
     async navigateTo(url) {
         AllureReportHelper.createAllureParameters('URL', `${url}`);
         await this.driver.navigateTo(url);
         await this.pauseBrowser();
     }

    /**
     * Navigate to Expected page by url
     * @param url
     * @param expectedPage page on which user should appear after navigation
     * @return expectedPage on which user want to navigate
     */
    @step('Navigate to URL')
    async navigateToExpectedUrl<T extends Page>(url, ExpectedPage: T): Promise<T> {
        AllureReportHelper.createAllureParameters('URL', `${url}`);
        await this.driver.navigateTo(url);
        await this.pauseBrowser();
        return ExpectedPage;
    }

    /**
     * Wait for the element to be clickable then clicks on that element
     * @param ele element that needs to be clicked
     */
     @step('Click on element')
     async clickOnElement(ele: ElementSync): Promise<void> {
        AllureReportHelper.createAllureParameters('Element', `${ele.selector}`);
        await ele.waitForClickable({timeout: 5000});
        await ele.click();
     }

    /**
     * Waits for the element to be clickable, clicks on that element and then enters given text
     *
     * @param text the text to enter
     */
     @step('Enter text to element')
     async enterText(selector: string, text: string) {
        AllureReportHelper.createAllureParameters(`Element,Text`, `${selector},${text}`);
        const element = await this.waitForClickable(selector);
        await element.click();
        await element.setValue(text);
    }

    /**
     * Wait for an element for the provided amount of milliseconds to be displayed
     *
     * @returns true if it is displayed otherwise false
     */
     @step('Wait until element to be displayed')
     async waitForDisplayed(selector: string): Promise<boolean> {
         AllureReportHelper.createAllureParameters(`Element`, `${selector}`);
         try {
            const element = await this.driver.$(selector);
            return await element.waitForDisplayed({
                timeout: automationProperties.waitForTimeout,
                interval: automationProperties.interval,
                reverse: false,
                timeoutMsg: 'Timed out waiting for element to be displayed'
            });
         } catch (e) {
            return false;
         }
    }

    /**
     * Wait for the element to be clickable then clicks on that element
     *
     */
     @step('Click on element')
     async click(selector: string): Promise<void> {
        AllureReportHelper.createAllureParameters('Element', `${selector}`);
        await (await this.waitForClickable(selector)).click();
     }

    /**
     * Wait for clickable
     * @param selector
     */
    @step('Wait until element to be clickable')
    async waitForClickable(selector: string): Promise<ElementSync> {
        AllureReportHelper.createAllureParameters(`Element`, `${selector}`);
        try {
            const element = await this.driver.$(selector);

            await element.waitForClickable({
                timeout: automationProperties.waitForTimeout,
                interval: automationProperties.interval,
                reverse: false,
                timeoutMsg: `Timedout waiting for element ${selector} to be clickable`
            });

            return await element;
        } catch (e) {
            log.error(e);
        }
    }

        /**
     * Waits for the element to be clickable, and select dropdown value by visible text
     *
     * @param text the text to select
     */
         @step('Select text to element')
         async dropdownSelectByVisibleText(selector: string, text: string) {
            AllureReportHelper.createAllureParameters(`Element,Text`, `${selector},${text}`);
            const element = await this.waitForClickable(selector);
            await element.selectByVisibleText(text);
        }

    /**
     * Wait for given text to be present for the provided amount of milliseconds in the given element
     *
     * @param text text to check for the presence of
     * @returns true if the give @param text present otherwise false
     */
    @step('Wait until text to contain')
    async waitUntilTextToBeIn(selector: string, text: string): Promise<boolean | void> {
    AllureReportHelper.createAllureParameters(`Element,Text`, `${selector}, ${text}`);
        const element = this.driver.$(selector);
        return await element.waitUntil(async function () {
            return (await this.getText()).includes(text);
        }, {
        timeout: automationProperties.waitForTimeout,
        timeoutMsg: `Expected text to include after ${automationProperties.waitForTimeout}`
        });
    }

    /**
     * Press Escape
     */
    @step('Press Escape')
    async pressEscape() {
        await this.driver.keys('Escape');
    }

    /**
     * Pause browser
     */
    @step('Pause browser')
    async pauseBrowser() {
        await this.driver.pause(automationProperties.interval);
    }


    /**
     *
     * @param title Title of the window to which driver needs to be switched
     * @returns true If its able to find the window that title and switched otherwise false
     */
     @step('Switch to window')
     async switchToWindow(title: string): Promise<void> {
         AllureReportHelper.createAllureParameters(`title`, `${title}`);
 
         const ids: string[] = await this.driver.getWindowHandles();
         let actualTitle: string;
 
         for (const id of ids) {
             await this.switchToWindowByWinHandle(id);
             await this.waitUntilWindowHasTitle();
             actualTitle = await this.driver.getTitle();
             if (actualTitle.includes(title)) {
                 break;
             }
         }
     }

     @step('Wait until window has title')
    async waitUntilWindowHasTitle(timeInMillis: number = 1500): Promise<void> {
        AllureReportHelper.createAllureParameters(`timeInMillis`, `${timeInMillis}`);
            await this.driver.waitUntil(
                async () => ((await this.driver.getTitle()).trim().length) > 0,
                {
                    timeout: timeInMillis,
                    timeoutMsg: `expected window to have title`
                }
            );
    }

    /**
     * Refresh the page
     */
    @step('Refresh page')
    async refreshPage() {
        await this.driver.refresh();
    }

    /**
     * Wait until element not be displayed
     * @param selector
     */
    @step('Wait until element to be not displayed')
    async waitForNotDisplayed(selector: string): Promise<boolean> {
        AllureReportHelper.createAllureParameters(`Element`, `${selector}`);
        try {
            const element = await this.driver.$(selector);
            return await element.waitForDisplayed({
                timeout: automationProperties.waitForTimeout,
                interval: automationProperties.interval,
                reverse: true,
                timeoutMsg: 'Timed out waiting for element to be not displayed'
        });
        } catch (e) {
            return false;
        }
    }

        /**
     * Check element by selector is present with timeout
     * @param selector
     * @param timeout
     */
         @step('Is element present by selector with timeout')
         async isElementPresentBySelectorWithTimeout(selector: string, timeout: number): Promise<boolean> {
             AllureReportHelper.createAllureParameters('selector,timeout', `${selector},${timeout}`);
             try {
                 await this.setImplicitWait(timeout);
                 return await this.driver.$(selector).isEnabled();
             } catch (e) {
                 log.error(`Error: ${e}`);
                 return false;
             } finally {
                 await this.resetImplicitWait();
             }
         }

                 /**
     * Check element by selector is present with timeout
     * @param selector
     * @param timeout
     */
                  @step('Is element present by selector with timeout')
                  async isElementSelectedBySelectorWithTimeout(selector: string, timeout: number): Promise<boolean> {
                      AllureReportHelper.createAllureParameters('selector,timeout', `${selector},${timeout}`);
                      try {
                          await this.setImplicitWait(timeout);
                          return await this.driver.$(selector).isSelected();
                      } catch (e) {
                          log.error(`Error: ${e}`);
                          return false;
                      } finally {
                          await this.resetImplicitWait();
                      }
                  }
                //switch to frame elements
                  @step('switch to frame')
                  async switchtoframe(selector:string){
                    AllureReportHelper.createAllureParameters('selector,timeout', `${selector}`);
                    try{
                        console.log("element is ..."+selector);
                        
                        await this.driver.switchToFrame(await this.driver.$(selector));

                    }catch (e) {
                        log.error(`Error: ${e}`);
                        return false;
                    } finally {
                        await this.resetImplicitWait();
                    }

                  }


                  //switch back to parent iframe elements
                  @step('switch back to parent frame')
                  async switchtofparentrame(selector:string){
                    AllureReportHelper.createAllureParameters('selector,timeout', `${selector}`);
                    try{
                        console.log("element is ..."+selector);
                        
                        await this.driver.switchToParentFrame();

                    }catch (e) {
                        log.error(`Error: ${e}`);
                        return false;
                    } finally {
                        await this.resetImplicitWait();
                    }

                  }
}
