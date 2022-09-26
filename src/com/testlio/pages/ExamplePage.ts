import { page } from './page';
import AppObjsMap from '../lib/appObjects/AppObjsMap';
import { step } from 'allure-decorators';
import { Browser } from 'webdriverio';
import AllureReportHelper from '../lib/utils/AllureReportHelper';
type ElementSync = import('webdriverio/build/types').Element<'async'>
type $$ = import('webdriverio/build/types').ElementArray;

export default class ExamplePage extends page {
    constructor(driver: Browser<'async'>) {
        super(driver);
    }

    @step('take screenshot')
    public async clickSubmitButton() {
        await AllureReportHelper.attachScreenShot(this.getDriver());
        const submitBtn: ElementSync  = await this.getDriver().$(AppObjsMap.appObjs.get('searchButton'));
        await submitBtn.click();
        const df: ElementSync = await this.getDriver().$$(".result__body")[0].$('.result__a');
    }
}

