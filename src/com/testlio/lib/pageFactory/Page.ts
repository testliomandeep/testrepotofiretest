import automationProperties from '../properties/AutomationProperties';
import { Browser, ElementArray } from 'webdriverio';
import { step } from 'allure-decorators';
import AllureReportHelper from '../utils/AllureReportHelper';
import ExecutionHelper from '../utils/ExecutionHelper';
const logger = require('../utils/Logger');
const log = logger(module);
type ElementSync = import('webdriverio/build/types').Element<'async'>;


/**
 * main page object containing all methods and functionality
 * that is shared across all page objects
 */
export default abstract class Page {

    async isPageLoaded(): Promise<void> { }


    driver: Browser<'async'>;

    /**
     * Constructor for page class
     * @param client
     * @protected
     */
    protected constructor(client) {
        this.driver = client;
    }
    
    /**
     * Get current driver  instance
     */
    @step('Get driver')
    getDriver(): Browser<'async'> {
        return this.driver;
    }

    /**
     * Wait till element exists with timeout
     * @param element
     * @param timeout
     */
    @step('Wait till element exists')
    async waitTillElementExists(element: ElementSync, timeout: number): Promise<void> {
        AllureReportHelper.createAllureParameters('element.selector,timeout',
            `${element.selector},${timeout}`);
        await element.waitForExist({ timeout: timeout });
    }

    /**
     * Wait till element becomes enabled with timeout
     * @param element
     * @param timeout
     */
    @step('Wait till element is element')
    async waitTillElementIsEnabled(element: ElementSync, timeout: number): Promise<void> {
        AllureReportHelper.createAllureParameters('element.selector,timeout',
            `${element.selector},${timeout}`);
        await this.driver.waitUntil(
            async () => await element.isEnabled(),
            {
                timeout: timeout,
                timeoutMsg: 'expected text to be different after 5s'
            }
        );
    }

    /**
     * Sets passed value to element using passed selector
     * @param selector
     * @param value
     */
    @step('Set value to element by selector')
    async setValueToElementBySelector(selector: string, value: string): Promise<void> {
        AllureReportHelper.createAllureParameters('selector,value', `${selector},${value}`);
        await this.driver.$(selector).setValue(value);
    }
    /**
     * Sets value with random number
     * @param selector
     * @param value
     */
    @step('Set value to element by selector')
    async setValuewithrandomnumberToElementBySelector(selector: string, value: string): Promise<void> {
        AllureReportHelper.createAllureParameters('selector,value', `${selector},${value}`);
        await this.driver.$(selector).setValue(value + Math.floor(Math.random()* (50 - 10 + 1) + 10));
    }

    /**
     * clear value
     * @param selector
     * 
     */
     @step('Clear Text from input field')
     async clearfield(selector: string): Promise<void> {
         AllureReportHelper.createAllureParameters('selector', `${selector}`);
         await this.driver.$(selector).clearValue();
     }

    /**
     * Sets value to element using passed selector after clearing it
     * @param selector
     * @param value
     */
    @step('Set value to element by selector after clearing it')
    async setValueToElementBySelectorAfterClear(selector: string, value: string): Promise<void> {
        AllureReportHelper.createAllureParameters('selector,value', `${selector},${value}`);
        await this.driver.$(selector).clearValue();
        await this.driver.$(selector).setValue(value);
    }

    /**
     * Adds passed value to element by selector
     * @param selector
     * @param value
     */
    @step('Add value to element by selector')
    async addValueToElementBySelector(selector: string, value: string): Promise<void> {
        AllureReportHelper.createAllureParameters('selector,value', `${selector},${value}`);
        await this.driver.$(selector).addValue(value);
    }

    /**
     * Click on element by selector
     * @param selector
     */
    @step('Click on element by selector')
    async clickOnElementBySelector(selector: string): Promise<void> {
        AllureReportHelper.createAllureParameters('selector', `${selector}`);
        await ExecutionHelper.sleepInSeconds(4);
        await this.driver.$(selector).click();
    }


    /**
     * Click on element
     * @param element
     */
    @step('Click on element')
    async clickOnElement(element: ElementSync): Promise<void> {
        AllureReportHelper.createAllureParameters('element.selector', `${element.selector}`);
        await element.click();
    }

    /**
     * Get elements by selector
     * @param selector
     */
    @step('Get elements by selector')
    async getElementsBySelector(selector: string): Promise<ElementArray> {
        AllureReportHelper.createAllureParameters('selector', selector);
        return await this.driver.$$(selector);
    }

    /**
     * Get element text by selector
     * @param selector
     */
    @step('Get element text by selector')
    async getElementTextBySelector(selector: string): Promise<string> {
        AllureReportHelper.createAllureParameters('selector', selector);
        return await this.driver.$(selector).getText();
    }

    /**
     * Checks element by selector is not present or not
     * @param selector
     */
    @step('Is element present by selector')
    async isElementPresentBySelector(selector: string): Promise<boolean> {
        AllureReportHelper.createAllureParameters('selector', `${selector}`);
        try {
            const elem = await this.driver.$(selector);
            return await elem.isEnabled();
        } catch (e) {
            log.error(`error while checking element is present by selector: ${selector}, error: ${e}`);
            return false;
        }

    }

        /**
     * Checks element is selected
     * @param selector
     */
         @step('Is element Selected by selector')
         async isSelectedBySelector(selector: string): Promise<boolean> {
             AllureReportHelper.createAllureParameters('selector', `${selector}`);
             try {
                 const elem = await this.driver.$(selector);
                 return await elem.isSelected();
             } catch (e) {
                 log.error(`error while checking element is present by selector: ${selector}, error: ${e}`);
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

    /**
     * Checks first element by selector in list is present or not
     * @param selector
     */
    @step('Is element in list present by selector')
    async isFirstElementInListPresentBySelector(selector: string): Promise<boolean> {
        AllureReportHelper.createAllureParameters('selector', `${selector}`);
        try {
            const elem = await this.driver.$$(selector);
            return await elem[0].isEnabled();
        } catch (e) {
            log.error(`error while checking element is present by selector: ${selector}, error: ${e}`);
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
     * Sets implicit wait
     * @param timeout
     */
    @step('Set implicit timeout')
    async setImplicitWait(timeout: number): Promise<void> {
        AllureReportHelper.createAllureParameters(`timeout`, `${timeout}`);
        await this.driver.setTimeout({ 'implicit': timeout });
    }

    /**
     * Reset implicit wait
     */
    @step('Reset implicit timeout')
    async resetImplicitWait(): Promise<void> {
        try {
            await this.driver.setTimeout({ 'implicit': automationProperties.implicitWait });
        } catch (e) {
            log.error('error while resetting implicit time: ' + e);
        }
    }

    /**
     * Switch to iframe by Id
     * @param elemOrId - representing the index of the window object corresponding to a frame
     *                   or an Element object received using findElement
     */
    @step('Switch to iframe')
    async switchToIframeById(elemOrId: any): Promise<void> {
        await this.driver.switchToFrame(elemOrId);
    }

    /**
     * Switch to Parent frame
     */
    @step('Switch to Parent frame')
    async switchToParentFrame(): Promise<void> {
        await this.driver.switchToParentFrame();
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

}
