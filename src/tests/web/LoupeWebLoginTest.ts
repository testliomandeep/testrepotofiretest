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
type ElementSync = import('webdriverio/build/types').Element<'async'>
type $$ = import('webdriverio/build/types').ElementArray;

let driver: Browser<'async'>;

let loupeGlobalHomepage: LoupeGlobalHomepage;
let loupeloginwebpage:LoupeLoginWebPage;
const group = '#Web2';


before(async () => {
    driver = await DriverProvider.createDriver();
});

it('Loupe Global Home Page Login Test', async () => {
    
    loupeGlobalHomepage = new LoupeGlobalHomepage(driver);
    loupeloginwebpage = new LoupeLoginWebPage(driver);
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

after(async () => {
    await driver.deleteSession();
});