import { Browser } from 'webdriverio';
import AppObjsMap from '../../lib/appObjects/AppObjsMap';
import { step } from 'allure-decorators';
import ExecutionHelper from '../../lib/utils/ExecutionHelper';
import Webpage from '../../lib/pageFactory/Webpage';
import initPage from '../../lib/pageFactory/InitPage';
import ScreenShotUtility from '../../lib/utils/ScreenShotUtility';
import AllureReportHelper from '../../lib/utils/AllureReportHelper';

export class LoupeGlobalHomepage extends Webpage {
    constructor(driver: Browser<'async'>) {
        super(driver);
    }

    async isPageLoaded() {}

    
    //Locators for Loupe Home web page
    get home() { return AppObjsMap.appObjs.get('homebutton'); }
    get headerlogo() { return AppObjsMap.appObjs.get('loupeLogo'); }
    get newslink() { return AppObjsMap.appObjs.get('newslink'); }
    get storeLink() { return AppObjsMap.appObjs.get('storelink'); }
    get downloadLink() { return AppObjsMap.appObjs.get('downloadlink'); }
    get teamlink() { return AppObjsMap.appObjs.get('teamlink'); }
    get upComingStream() { return AppObjsMap.appObjs.get('upcomingStream'); }
    get loupetextBottpm() { return AppObjsMap.appObjs.get('loupetextbottpm'); }
    get iconYoutube() { return AppObjsMap.appObjs.get('iconyoutube'); }
    get iconFacebook() { return AppObjsMap.appObjs.get('iconfacebook'); }
    get iconTwitter() { return AppObjsMap.appObjs.get('icontwitter'); }
    get iconInstagram() { return AppObjsMap.appObjs.get('iconinstagram'); }
    get liveStream() { return AppObjsMap.appObjs.get('livestream'); }





  //  testlioGlobalHeader: TestlioGlobalHeader = new TestlioGlobalHeader(this.getDriver());


    @step('Full page image validation')
    async checkFullPage(): Promise<number> {
        return await ScreenShotUtility.compareImages(this.driver)
    }

    @step('Is Home Button Present on the loupe Home page')
    async ishomelinkpresent() : Promise<boolean>{
        return await this.isElementPresentBySelectorWithTimeout(this.home,5000);
    }

    @step('Is Logo Present on the aloupe Home page')
    async isheaderlogopresent(): Promise<boolean> {
        return await this.isElementPresentBySelector(this.headerlogo);
    }

    @step('Is News Button Present on the aloupe Home page')
    async isnewslinkpresent(): Promise<boolean> {
        return await this.isElementPresentBySelector(this.newslink);
    }

    @step('Is Store Button Present on the aloupe Home page')
    async isstorelinkpresent(): Promise<boolean> {
        return await this.isElementPresentBySelector(this.storeLink);
    }

    @step('Is Download Button Present on the aloupe Home page')
    async isdownloadLinkpresent(): Promise<boolean> {
        return await this.isElementPresentBySelector(this.downloadLink);
    }

    @step('Is Team Button Present on the aloupe Home page')
    async isteamlinkpresent(): Promise<boolean> {
        return await this.isElementPresentBySelector(this.teamlink);
    }

    @step('Is Live Stream Present on the aloupe Home page')
    async isliveStreamkpresent(): Promise<boolean> {
        return await this.isElementDisplayedBySelector(this.liveStream);
    }
    @step('Is Instagram Icon Present on the aloupe Home page')
    async isiconInstagrampresent(): Promise<boolean> {
        return await this.isElementDisplayedBySelector(this.iconInstagram);
    }
    @step('Is Twitter Icon Present on the aloupe Home page')
    async isiconTwitterpresent(): Promise<boolean> {
        return await this.isElementDisplayedBySelector(this.iconTwitter);
    }
    @step('Is Facebook Icon Present on the aloupe Home page')
    async isiconFacebookpresent(): Promise<boolean> {
        return await this.isElementDisplayedBySelector(this.iconFacebook);
    }
    @step('Is You Tube Icon Present on the aloupe Home page')
    async isiconYoutubepresent(): Promise<boolean> {
        return await this.isElementDisplayedBySelector(this.iconYoutube);
    }
    @step('Is Loupe Text at Bottom Present on the aloupe Home page')
    async isloupetextBottpmpresent() : Promise<boolean>{
        return await this.isElementDisplayedBySelector(this.loupetextBottpm);
    }
    @step('Is UpComing Stream Present on the aloupe Home page')
    async isupComingStreampresent(): Promise<boolean> {
        return await this.isElementDisplayedBySelector(this.upComingStream);
    }


}
