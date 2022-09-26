import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import ExecutionTypes from '../env/ExecutionTypes';
import ProviderTypes from '../env/ProviderTypes';
import MobileTypes from '../env/MobileTypes';
const argv = yargs(hideBin(process.argv)).argv;

class AutomationProperties {
    get executionType(): string {
        return String (argv.executiontype);
    }

    get provider(): string {
        return String (argv.provider);
    }

    get mobileDevicePlatform(): string {
        return String (argv.mobileDevicePlatform);
    }

    get mobileDevicePlatformVersion(): string {
        return String (argv.mobileDevicePlatformVersion);
    }

    get appPackageName(): string {
        return String (argv.appPackage);
    }

    get appLaunchActivity(): string {
        return String (argv.appLaunchActivity);
    }

    get deviceId(): string {
        return String (argv.deviceId);
    }

    get implicitWait(): number {
        return 45000;
    }

    get waitForTimeout(): number {
        return 25000;
    }

    get interval(): number {
        return 1000;
    }

    get bundleID(): string {
        return String (argv.bundleID);
    }

    get udid(): string {
        return String (argv.udid);
    }

    get testGrep(): string {
        return String (argv.tgrep);
    }

    get testSpec(): string {
        return String (argv.testSpec);
    }

    get screenShotPath(): string {
        return String (argv.screenShotPath);
    }

    get browserName(): string {
        return String (argv.browser);
    }

    get allureResult(): string {
        console.log("man...."+argv.allureResults);
        return String (argv.allureResults);
    }

    get appiumScreenshotPath(): string {
        return String (argv.appiumScreenshotPath);
    }

    isLocalExecution(): boolean {
        return this.provider.toLowerCase() === ProviderTypes.LOCAL.toLowerCase();
    }

    isTestlioExecution(): boolean {
        return this.provider.toLowerCase() === ProviderTypes.TESTLIO.toLowerCase();
    }

    isWebExecution(): boolean {
        return this.executionType.toLowerCase() === ExecutionTypes.WEB.toLowerCase();
    }

    isMobileNativeExecution(): boolean {
        return this.executionType.toLowerCase() === ExecutionTypes.MOBILE_NATIVE.toLowerCase();
    }

    isMobileWebExecution(): boolean {
        return this.executionType.toLowerCase() === ExecutionTypes.MOBILE_WEB.toLowerCase();
    }

    isAndroidExecution(): boolean {
        return this.mobileDevicePlatform.toLowerCase() === MobileTypes.ANDROID.toLowerCase();
    }

    isIOSExecution(): boolean {
        return this.mobileDevicePlatform.toLowerCase() === MobileTypes.IOS.toLowerCase();
    }

    returnTGrep(): string {
        if (this.testGrep === undefined) {
            return '';
        } else {
            return this.testGrep;
        }
    }
}

export default new AutomationProperties();
