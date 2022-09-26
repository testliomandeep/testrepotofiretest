import { page } from './page';
import { Browser } from 'webdriverio';
import AppObjsMap from '../lib/appObjects/AppObjsMap';
import { step } from 'allure-decorators';
import AllureReportHelper from '../lib/utils/AllureReportHelper';
import ExecutionHelper from '../lib/utils/ExecutionHelper';
import browser from 'webdriverio/build/commands/browser';
import Webpage from '../lib/pageFactory/Webpage';



let driver: Browser<'async'>;
export class LoupeLoginWebPage extends Webpage {
    Browser: any;
    constructor(driver: Browser<'async'>) {
        super(driver);
    }
    


    
    //Locators for Login Page Loupe Web
    get louploginButton(): string { return AppObjsMap.appObjs.get('louploginbutton'); }
    get googlebutton(): string { return AppObjsMap.appObjs.get('googlebutton'); }
    get googletext(): string { return AppObjsMap.appObjs.get('googletext'); }
    get emailfield(): string { return AppObjsMap.appObjs.get('emailfield'); }
    get passfield(): string { return AppObjsMap.appObjs.get('passfield'); }
    get nextbuttonPassword(): string { return AppObjsMap.appObjs.get('nextbuttonpassword'); }
    get googleTryagaintext(): string { return AppObjsMap.appObjs.get('googletryagaintext'); }  
    get googleSigninText(): string { return AppObjsMap.appObjs.get('googlesigninText'); }
    get nextbuttonEmail(): string { return AppObjsMap.appObjs.get('nextbuttonemail'); }
    get ContuinueonLoupelogin(): string { return AppObjsMap.appObjs.get('Contuinueonloupelogin'); }
    

    
     

    @step('Is login button present')
    async isLoginButtonPresent(): Promise<boolean> {
        await AllureReportHelper.attachScreenShot(this.getDriver());
        return await this.isElementPresentBySelectorWithTimeout(this.louploginButton,3000);
    }
    @step('get current win handles')
    async getwinhandles(): Promise<void> {
        await AllureReportHelper.attachScreenShot(this.getDriver());
    }
    @step('Click on Login Button on Loupe Web')
    async clickonloginbutton(): Promise<void> {
        await AllureReportHelper.attachScreenShot(this.getDriver());
         await this.clickOnElementBySelector(this.louploginButton);
    }
    @step('Click on Google login Button on Loupe Web')
    async clickongooglebutton(): Promise<void> {
        await AllureReportHelper.attachScreenShot(this.getDriver());
         await this.clickOnElementBySelector(this.googlebutton);
    }
    @step('Swith to new google window')
    async switchtogoglewin(): Promise<void> {
        await AllureReportHelper.attachScreenShot(this.getDriver());
        await this.switchToOpenedWindow();
    }
    @step('Check Signin field present')
    async checksigninfielddisplay(): Promise<void> {
        await AllureReportHelper.attachScreenShot(this.getDriver());
        await this.isElementPresentBySelector(this.googleSigninText);
    }
    @step('Enter email address in the field')
    async enteremailforsignin(): Promise<void> {
        await AllureReportHelper.attachScreenShot(this.getDriver());
        await this.setValueToElementBySelector(this.emailfield,'mandeep.singh@testers.testlio.com');
    }
    @step('Click Next Button After sign in')
    async clicknext(): Promise<void> {
        await AllureReportHelper.attachScreenShot(this.getDriver());
        await this.clickOnElementBySelector(this.nextbuttonEmail);
    }
    @step('Enter password in the field')
    async enterpassword(): Promise<void> {
        await AllureReportHelper.attachScreenShot(this.getDriver());
        await this.setValueToElementBySelector(this.passfield,'Mandeep-1988');
    }
    @step('Click Next Button After sign in')
    async clicknextforpass(): Promise<void> {
        await AllureReportHelper.attachScreenShot(this.getDriver());
        await this.clickOnElementBySelector(this.nextbuttonEmail);
    }
    @step('Switch back to Loupe Window')
    async switchbacktoloupwindow(): Promise<void> {
        await AllureReportHelper.attachScreenShot(this.getDriver());
        await this.switchToWindow('Loupe Sports Cards');
    }
    @step('Click continue to complete signin')
    async clickcontinue(): Promise<void> {
        await AllureReportHelper.attachScreenShot(this.getDriver());
        await ExecutionHelper.sleepInSeconds(4);
        console.log("Title of current window is ............" +await this.getWindowTitle());
        console.log("Check Element display" + await this.isElementDisplayedBySelector(this.ContuinueonLoupelogin));
        console.log("check Element enabled" + await this.isElementPresentBySelector(this.ContuinueonLoupelogin));
        await this.jsClickOnWebElement(await this.driver.$(this.ContuinueonLoupelogin));
    }

}