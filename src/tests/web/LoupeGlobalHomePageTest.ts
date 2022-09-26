import { expect } from 'chai';
import DriverProvider from '../../com/testlio/lib/driver/DriverProvider';
import { Browser } from 'webdriverio';
import { LoupeGlobalHomepage } from '../../com/testlio/pages/LoupeGlobal/LoupeGlobalHomepage';
import ExecutionHelper from '../../com/testlio/lib/utils/ExecutionHelper';
import AppObjsMap from '../../com/testlio/lib/appObjects/AppObjsMap';
import { step } from 'allure-decorators';
import url from '../Url'

let loupeGlobalHomepage: LoupeGlobalHomepage;
let driver: Browser<'async'>;



    before(async () => {
        driver = await DriverProvider.createDriver();
    });

    it("Verify Elements on Loupe Home Page", async ()=>{
        loupeGlobalHomepage = new LoupeGlobalHomepage(driver);
        //await driver.maximizeWindow();
       await loupeGlobalHomepage.open(url.loupeHomePage, loupeGlobalHomepage);
       expect(await loupeGlobalHomepage.ishomelinkpresent()).to.be.true;
       expect(await loupeGlobalHomepage.isheaderlogopresent()).to.be.true;
       expect(await loupeGlobalHomepage.isnewslinkpresent()).to.be.true;
       expect(await loupeGlobalHomepage.isstorelinkpresent()).to.be.true;
       expect(await loupeGlobalHomepage.isdownloadLinkpresent()).to.be.true;
       expect(await loupeGlobalHomepage.isteamlinkpresent()).to.be.true;
       expect(await loupeGlobalHomepage.isliveStreamkpresent()).to.be.true;
       expect(await loupeGlobalHomepage.isiconInstagrampresent()).to.be.true;
       expect(await loupeGlobalHomepage.isiconTwitterpresent()).to.be.true;
       expect(await loupeGlobalHomepage.isiconFacebookpresent()).to.be.true;
       expect(await loupeGlobalHomepage.isiconYoutubepresent()).to.be.true;
       expect(await loupeGlobalHomepage.isloupetextBottpmpresent()).to.be.true;
       expect(await loupeGlobalHomepage.isupComingStreampresent()).to.be.true;

    });

    after(async () => {
        await driver.deleteSession();
    });

