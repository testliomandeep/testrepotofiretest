import automationProperties from '../../../properties/AutomationProperties';
import { remote } from 'webdriverio';
const logger = require('../../../utils/Logger');
const log = logger(module);
type BrowserSync = import('webdriverio/build/types').Browser<'async'>;

class LocalMobileNativeDriverProvider {
    protected driver: BrowserSync;
    async createLocalMobileNativeDriver(): Promise<BrowserSync> {
        this.driver = await remote({
            logLevel: 'trace',
            port: 4723,
            path: '/wd/hub',
            capabilities: this.returnLocalMobileNativeCapabilities()
            }
        );
        log.info(this.driver.capabilities);
        return this.driver;
    }

    returnLocalMobileNativeCapabilities() {
        if (automationProperties.isIOSExecution()) {
            return this.returnIOSLocalMobileNativeProvider();
        } else {
            return this.returnAndroidMobileNativeCapabilities();
        }
    }
    returnAndroidMobileNativeCapabilities(): object {
        return {
            "platformName": "android",
            "platformVersion": automationProperties.mobileDevicePlatformVersion,
            "automationName": "uiautomator2",
            "deviceName": automationProperties.deviceId,
            "newCommandTimeout": 720,
            "appPackage": automationProperties.appPackageName,
            "appActivity": automationProperties.appLaunchActivity
        };

    }

    returnIOSLocalMobileNativeProvider(): object {
        return {

            "webDriverAgentUrl": "http://169.254.99.95:8100",
            "platformName": "ios",
            "platformVersion": automationProperties.mobileDevicePlatformVersion,
            "automationName": "xcuitest",
            "udid": automationProperties.udid,
            "bundleId": automationProperties.bundleID,
            "deviceName": automationProperties.deviceId,
            "newCommandTimeout": "720"
        };
    }
}

export default new LocalMobileNativeDriverProvider();