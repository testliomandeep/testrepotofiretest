import { expect } from 'chai';
import DriverProvider from '../../com/testlio/lib/driver/DriverProvider';
import { Browser } from 'webdriverio';
import { LoupeGlobalHomepage } from '../../com/testlio/pages/LoupeGlobal/LoupeGlobalHomepage';
import ExecutionHelper from '../../com/testlio/lib/utils/ExecutionHelper';

let driver: Browser<'async'>;

let testlioGlobalHomePage: LoupeGlobalHomepage;
const group = '#Web2';
before(async () => {
    driver = await DriverProvider.createDriver();
});


it(`Testlio Global Home Page Test ${group}`, async () => {
    testlioGlobalHomePage = new LoupeGlobalHomepage(driver);
    await driver.maximizeWindow();
    await testlioGlobalHomePage.open('https://www.testlio.com', testlioGlobalHomePage);
    await ExecutionHelper.sleepInSeconds(5);
 //   expect(await testlioGlobalHomePage.isRequestADemoButtonPresent()).to.be.true;
  //  expect(await testlioGlobalHomePage.isApplyToFreelanceButtonPresent()).to.be.true;
});

after(async () => {
    await driver.deleteSession();
});