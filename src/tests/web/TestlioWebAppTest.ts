import DriverProvider from '../../com/testlio/lib/driver/DriverProvider';
import { Browser } from 'webdriverio';
import { LoupeLoginWebPage } from '../../com/testlio/pages/LoupeLoginWebPage';
import ExecutionHelper from '../../com/testlio/lib/utils/ExecutionHelper';
import TestCaseDataReader from '../../com/testlio/lib/excelReader/TestCaseDataReader';

const logger = require('../../com/testlio/lib/utils/Logger');
const log = logger(module);

let driver: Browser<'async'>;
let testlioLoginWebPage: LoupeLoginWebPage;

let userName: string;
let password: string;

const group = '#Web2';

before(async () => {
    driver = await DriverProvider.createDriver();
    const testCaseName: string = __filename.slice(__dirname.length + 1);

    userName = TestCaseDataReader.readUserName(testCaseName).get('Username');
    password = TestCaseDataReader.readPassword(testCaseName).get('Password');
    log.info("USER NAME: " + userName);
    log.info("PASSWORD: " + password);

});

it(`Testlio Web app Test ${group}`, async () => {

    testlioLoginWebPage = new LoupeLoginWebPage(driver);
    await driver.maximizeWindow();
   // await testlioLoginWebPage.open.Url('https://platform.testlio.qa/');
    // await testlioLoginWebPage.performLogin(userName, password);
    await ExecutionHelper.sleepInSeconds(5);
});

after(async () => {
    await driver.deleteSession();
});