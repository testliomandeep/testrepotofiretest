import { expect } from 'chai';
import DriverProvider from '../../com/testlio/lib/driver/DriverProvider';
import { Browser } from 'webdriverio';
import { LoupeGlobalHomepage } from '../../com/testlio/pages/LoupeGlobal/LoupeGlobalHomepage';
import ExecutionHelper from '../../com/testlio/lib/utils/ExecutionHelper';
import {LoupeLoginWebPage}   from '../../com/testlio/pages/LoupeLoginWebPage';
import AppObjsMap from '../../com/testlio/lib/appObjects/AppObjsMap';
import { step } from 'allure-decorators';
import url from '../Url'
import browser from 'webdriverio/build/commands/browser';
import { LoupeLiveStreamPage } from '../../com/testlio/pages/LoupeLiveStreamPage';
import { LoupeByingProcesspage } from '../../com/testlio/pages/LoupeByingProcesspage';

type ElementSync = import('webdriverio/build/types').Element<'async'>
type $$ = import('webdriverio/build/types').ElementArray;

let driver: Browser<'async'>;

let loupeGlobalHomepage: LoupeGlobalHomepage;
let loupeloginwebpage:LoupeLoginWebPage;
let loupeLiveStreamPage: LoupeLiveStreamPage;
let loupebyingprocesspage:LoupeByingProcesspage;

const group = '#Web2';


before(async () => {
    driver = await DriverProvider.createDriver();
});

it('Loupe Login', async () => {
    
    loupeGlobalHomepage = new LoupeGlobalHomepage(driver);
    loupeloginwebpage = new LoupeLoginWebPage(driver);
    loupebyingprocesspage = new LoupeByingProcesspage(driver);
    loupeLiveStreamPage = new LoupeLiveStreamPage(driver);
    await loupeGlobalHomepage.open(url.loupeHomePage, loupeGlobalHomepage);
    await ExecutionHelper.sleepInSeconds(4);
    expect (await loupeloginwebpage.isLoginButtonPresent()).to.be.true;
    await loupeloginwebpage.getwinhandles();
    await loupeloginwebpage.clickonloginbutton();
    await loupeloginwebpage.clickongooglebutton();
    await ExecutionHelper.sleepInSeconds(4);
    await loupeloginwebpage.switchtogoglewin();
    await loupeloginwebpage.checksigninfielddisplay();
    await loupeloginwebpage.enteremailforsignin();
    await loupeloginwebpage.clicknext();
    await ExecutionHelper.sleepInSeconds(3);
    await loupeloginwebpage.enterpassword();
    await loupeloginwebpage.clicknextforpass();
    await loupeloginwebpage.switchbacktoloupwindow();
    await ExecutionHelper.sleepInSeconds(4);
    await loupeloginwebpage.clickcontinue();
});
it('Loupe Buy an item', async () => {
    expect(await loupeLiveStreamPage.islivestreampresent()).to.be.true;
    await loupeLiveStreamPage.clickonlivestream();
    await loupeLiveStreamPage.clicksalesitembutton();
    await loupebyingprocesspage.clickonbuynowbutton();
    expect (await loupebyingprocesspage.istxtshippingaddresspresent()).to.be.true;
    expect (await loupebyingprocesspage.istxtemailreciptpresent()).to.be.true;
    await loupebyingprocesspage.clickButtonfixit();
    await loupebyingprocesspage.CleartheField();
    await loupebyingprocesspage.entershippingname();
    await loupebyingprocesspage.clickButtonsave();
    await loupebyingprocesspage.clickdonebutton();
    await loupebyingprocesspage.clickButtonthisiscorrect();
    expect (await loupebyingprocesspage.isconfirmtextonbuydisplay()).to.be.true;
    await loupebyingprocesspage.clickbuynow();
    expect (await loupebyingprocesspage.istextCheckoutdisplay()).to.be.true;
    await loupebyingprocesspage.switchtoframeforcc();
    expect (await loupebyingprocesspage.isccfielddisplay()).to.be.true;
    await loupebyingprocesspage.enterccnumber();
    await loupebyingprocesspage.switchtoparentrame();
    await loupebyingprocesspage.paynowbutton();
    await loupebyingprocesspage.okaybutton();

});


after(async () => {
    await driver.deleteSession();
});