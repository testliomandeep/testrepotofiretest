type BrowserSync = import('webdriverio/build/types').Browser<'async'>;

import { remote } from 'webdriverio';
const logger = require('../../../utils/Logger');
const log = logger(module);

class TestlioWebDriverProvider {
    public browser: BrowserSync;
    async createTestlioDriver() : Promise<BrowserSync> {
        const url = new URL(process.env.SESSION_URL);
        this.browser = await remote({
            logLevel: 'trace',
            hostname: url.host,
            path: url.pathname,
            protocol: 'https',
            port: 443,
            capabilities: {
                browserName: process.env.BROWSER,
                browserVersion: process.env.BROWSER_VERSION,
            }

        });
        log.info(this.browser.capabilities);
        return this.browser;
    };
}

export default new TestlioWebDriverProvider()