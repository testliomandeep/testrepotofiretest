import { expect } from 'chai';
import DriverProvider from '../../com/testlio/lib/driver/DriverProvider';
import { Browser } from 'webdriverio';
import { LoupeGlobalHomepage } from '../../com/testlio/pages/LoupeGlobal/LoupeGlobalHomepage';
import ExecutionHelper from '../../com/testlio/lib/utils/ExecutionHelper';
import AppObjsMap from '../../com/testlio/lib/appObjects/AppObjsMap';
import { step } from 'allure-decorators';
import url from '../Url'
import { LoupeLiveStreamPage } from '../../com/testlio/pages/LoupeLiveStreamPage';

let loupeLiveStreamPage: LoupeLiveStreamPage;
let driver: Browser<'async'>;


    before(async () => {
        driver = await DriverProvider.createDriver();
    });

    it("Validate Live Stream on Live Stream Page", async ()=>{
        loupeLiveStreamPage = new LoupeLiveStreamPage(driver);
        //await driver.maximizeWindow();
       await loupeLiveStreamPage.open(url.loupeHomePage, loupeLiveStreamPage);
       expect(await loupeLiveStreamPage.islivestreampresent()).to.be.true;
       await loupeLiveStreamPage.clickonlivestream();
       expect(await loupeLiveStreamPage.verifylivestreamvideo()).to.be.true;
       await loupeLiveStreamPage.clicksalesitembutton();
       await loupeLiveStreamPage.clickonchatbutton();
       expect(await loupeLiveStreamPage.checkSigninTextDispalay()).to.be.true;
       await loupeLiveStreamPage.clicksalesitembutton();
       await loupeLiveStreamPage.clickAllradio();
       expect(await loupeLiveStreamPage.checkAllradio()).to.be.true;
       await loupeLiveStreamPage.clickAvailableradio();
       await loupeLiveStreamPage.clickAvailableradio();
       await loupeLiveStreamPage.clickPurchasedradio();
       expect(await loupeLiveStreamPage.checkpurchasedradio()).to.be.true;
       
   

    });

    after(async () => {
        await driver.deleteSession();
    });
