import { remote } from 'webdriverio';
type BrowserSync = import('webdriverio/build/types').Browser<'async'>;

class TestlioMobileNativeDriverProvider {
    browser: BrowserSync;
    async createTestlioMobileNativeDriver() : Promise<BrowserSync> {
        this.browser = await remote({
                logLevel: 'trace',
                port: 4723,
                path: '/wd/hub',
                capabilities: {}
            }
        );
        return this.browser;
    }
}

export default new TestlioMobileNativeDriverProvider();