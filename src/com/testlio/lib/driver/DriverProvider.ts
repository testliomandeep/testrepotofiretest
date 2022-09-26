import AutomationProperties from '../properties/AutomationProperties';
import TestlioWebDriverProvider from './web/testlio/TestlioWebDriverProvider';
import LocalMobileNativeDriverProvider from './mobile/local/LocalMobileNativeDriverProvider';
import TestlioMobileNativeDriverProvider from './mobile/testlio/TestlioMobileNativeDriverProvider';
import LocalWebDriverProvider from './web/local/LocalWebDriverProvider';
import { Browser } from 'webdriverio';
const logger = require('../utils/Logger');
const log = logger(module);
type BrowserSync = import('webdriverio/build/types').Browser<'async'>;

class DriverProvider {
    public browser: Browser<'async'>;
    async createDriver(): Promise<BrowserSync> {
        if (AutomationProperties.isMobileNativeExecution()) {
            log.info("Create driver for local mobile native execution");
            if (AutomationProperties.isLocalExecution()) {
                log.info("Create driver for testlio mobile native execution");
                this.browser = await LocalMobileNativeDriverProvider.createLocalMobileNativeDriver();
            } else {
                log.info("Create driver for testlio mobile native execution");
                this.browser = await TestlioMobileNativeDriverProvider.createTestlioMobileNativeDriver();
            }
        } else {
            if (AutomationProperties.isLocalExecution()) {
                log.info("Create driver for local web execution");
                this.browser = await LocalWebDriverProvider.createLocalDriver();
            } else {
                log.info("Creating driver for testlio web execution");
                this.browser = await TestlioWebDriverProvider.createTestlioDriver();
            }
        }
        return this.browser;
    }

}

export default new DriverProvider();