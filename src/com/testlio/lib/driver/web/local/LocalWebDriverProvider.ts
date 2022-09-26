import AutomationProperties from '../../../properties/AutomationProperties';
import BrowserTypes from '../../../env/BrowserTypes';
import { remote } from 'webdriverio';
import Capabilities from './capabilities/Capabilities';
import ChromeCapabilities from './capabilities/ChromeCapabilities';
import EdgeCapabilities from './capabilities/EdgeCapabilities';
import FirefoxCapabilities from './capabilities/FirefoxCapabilities';
const logger = require('../../../utils/Logger');
const log = logger(module);

type BrowserSync = import('webdriverio/build/types').Browser<'async'>;

class LocalWebDriverProvider {
    public browser: BrowserSync;
    async createLocalDriver(
        customCapabilities: Capabilities = this.getCommonCapabilities()
    ): Promise<BrowserSync> {
        this.browser = await remote({
            logLevel: 'trace',
            capabilities: {
                ...this.getCommonCapabilities(),
                ...this.getBrowserCapabilities(),
                ...customCapabilities
            }
        });
        log.info(this.browser.capabilities);
        return this.browser;
    }

    returnBrowser(): string {
        return 'chrome';
    }

    getBrowserCapabilities(): Capabilities {
        switch (AutomationProperties.browserName) {
            case BrowserTypes.CHROME.browser:
                return this.getChromeCapabilities();
            case BrowserTypes.EDGE.browser:
                return this.getEdgeCapabilities();
            default:
                return this.getFirefoxCapabilities();
        }
    }

    // Add common capabilities
    getCommonCapabilities(): Capabilities {
        return {
            acceptInsecureCerts: true
        };
    }

    // Add chrome-specific capabilities here
    getChromeCapabilities(): ChromeCapabilities {
        return {
            browserName: BrowserTypes.CHROME.driver,
            'goog:chromeOptions': {
                args: [
                    '--enable-automation',
                    '--window-size=1920,1080',
                    '--no-sandbox',
                    '--disable-extensions',
                    '--disable-gpu',
                    '--allow-running-insecure-content',
                    '--disable-dev-shm-usage'
                ]
            }
        };
    }

    // Add edge-specific capabilities here
    getEdgeCapabilities(): EdgeCapabilities {
        return {
            browserName: BrowserTypes.EDGE.driver
        };
    }

    // Add firefox-specific capabilities here
    getFirefoxCapabilities(): FirefoxCapabilities {
        return {
            browserName: BrowserTypes.FIREFOX.driver,
            'moz:firefoxOptions': {
                args: []
            }
        };
    }
}

export default new LocalWebDriverProvider();
