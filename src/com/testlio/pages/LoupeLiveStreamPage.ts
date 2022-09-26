import { page } from './page';
import { Browser } from 'webdriverio';
import AppObjsMap from '../lib/appObjects/AppObjsMap';
import { step } from 'allure-decorators';
import AllureReportHelper from '../lib/utils/AllureReportHelper';
import ExecutionHelper from '../lib/utils/ExecutionHelper';
import browser from 'webdriverio/build/commands/browser';
import Webpage from '../lib/pageFactory/Webpage';
//import { Webpage } from '../lib/pageFactory/Webpage';



let driver: Browser<'async'>;
export class LoupeLiveStreamPage extends Webpage {
    Browser: any;
    constructor(driver: Browser<'async'>) {
        super(driver);
    }
    


    

    //Locators for Live Stream page
    get livestream(): string { return AppObjsMap.appObjs.get('livestreamhome'); }
    get livestreamvideo(): string { return AppObjsMap.appObjs.get('livevideostreaming'); }
    get chatbutton(): string { return AppObjsMap.appObjs.get('chatbutton'); }
    get signintextbottom(): string { return AppObjsMap.appObjs.get('signinText'); }
    get salesitemsbutton(): string { return AppObjsMap.appObjs.get('salesitembutton'); }
    get radiobuttonallitems(): string { return AppObjsMap.appObjs.get('allitemsradiobutton'); }
    get radiobuttonavailable(): string { return AppObjsMap.appObjs.get('availableradiobutton'); }
    get radiobuttonpurchased(): string { return AppObjsMap.appObjs.get('purchasedradiobutton'); }

    
     

    @step('Verify is Live Stream Present')
    async islivestreampresent(): Promise<boolean> {
        await AllureReportHelper.attachScreenShot(this.getDriver());
        return await this.isElementPresentBySelectorWithTimeout(this.livestream,4000);
    }
    @step('Click on CHAT button')
    async clickonlivestream(): Promise<void> {
        await AllureReportHelper.attachScreenShot(this.getDriver());
         await this.clickOnElementBySelector(this.livestream);
    }

    @step('Verify Live Stream Video Display')
    async verifylivestreamvideo(): Promise<boolean> {
        await AllureReportHelper.attachScreenShot(this.getDriver());
        console.log("mandeep live stream" + this.isElementPresentBySelectorWithTimeout(this.livestreamvideo,10000));
         return await this.isElementPresentBySelectorWithTimeout(this.livestreamvideo,10000);
    }
    @step('Click on CHAT button')
    async clickonchatbutton(): Promise<void> {
        await AllureReportHelper.attachScreenShot(this.getDriver());
         await this.clickOnElementBySelector(this.chatbutton);
    }

    @step('Verify Signin text display')
    async checkSigninTextDispalay(): Promise<boolean> {
        await AllureReportHelper.attachScreenShot(this.getDriver());
        return await this.isElementPresentBySelectorWithTimeout(this.signintextbottom,4000);
    }
    
    @step('Click on SALES ITEMS Button/Link')
    async clicksalesitembutton(): Promise<void> {
        await AllureReportHelper.attachScreenShot(this.getDriver());
        await this.clickOnElementBySelector(this.salesitemsbutton);
    }

    @step('Click on ALL radio Button')
    async clickAllradio(): Promise<void> {
        await AllureReportHelper.attachScreenShot(this.getDriver());
        await this.clickOnElementBySelector(this.radiobuttonallitems);
    }
    @step('Verify ALL radio Button Selected')
    async checkAllradio(): Promise<boolean> {
        await AllureReportHelper.attachScreenShot(this.getDriver());
        return await this.isElementPresentBySelector(this.radiobuttonallitems);
    }

    @step('Click on AVAILABle radio Button')
    async clickAvailableradio(): Promise<void> {
        await AllureReportHelper.attachScreenShot(this.getDriver());
        await this.clickOnElementBySelector(this.radiobuttonavailable);
    }
    @step('Verify Available radio Button Selected')
    async checkAvailableradio(): Promise<boolean> {
        await AllureReportHelper.attachScreenShot(this.getDriver());
        return await this.isElementPresentBySelector(this.radiobuttonavailable);
    }
    @step('Click on PURCHASED radio Button')
    async clickPurchasedradio(): Promise<void> {
        await AllureReportHelper.attachScreenShot(this.getDriver());
        await this.clickOnElementBySelector(this.radiobuttonpurchased);
    }

    @step('Verify purchased radio Button Selected')
    async checkpurchasedradio(): Promise<boolean> {
        await AllureReportHelper.attachScreenShot(this.getDriver());
        return await this.isElementSelectedBySelectorWithTimeout(this.radiobuttonpurchased,3000);
    }

}