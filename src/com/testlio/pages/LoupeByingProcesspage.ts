import { page } from './page';
import { Browser } from 'webdriverio';
import AppObjsMap from '../lib/appObjects/AppObjsMap';
import { step } from 'allure-decorators';
import AllureReportHelper from '../lib/utils/AllureReportHelper';
import ExecutionHelper from '../lib/utils/ExecutionHelper';
import browser from 'webdriverio/build/commands/browser';
import Webpage from '../lib/pageFactory/Webpage';
import Url from '../../../tests/Url';
//import { Webpage } from '../lib/pageFactory/Webpage';



let driver: Browser<'async'>;
export class LoupeByingProcesspage extends Webpage {
    Browser: any;
    constructor(driver: Browser<'async'>) {
        super(driver);
    }
    

    //Locators for Live Stream page
    get buynowbutton(): string { return AppObjsMap.appObjs.get('buynow'); }
    get txtshippingaddress(): string { return AppObjsMap.appObjs.get('textshippingaddress'); }
    get txtemailrecipt(): string { return AppObjsMap.appObjs.get('textemailrecipt'); }
    get Buttonthisiscorrect(): string { return AppObjsMap.appObjs.get('buttonthisiscorrect'); }
    get Buttonfixit(): string { return AppObjsMap.appObjs.get('buttonfixit'); }
    get shippingname(): string { return AppObjsMap.appObjs.get('shippingname'); }
    get donebutton(): string { return AppObjsMap.appObjs.get('Donebutton'); }
    get confirmtextonbuy(): string { return AppObjsMap.appObjs.get('confirmtext'); }
    get textTotal(): string { return AppObjsMap.appObjs.get('texttotal'); }
    get Buttonbuynow(): string { return AppObjsMap.appObjs.get('buynowtobuy'); }
    get textCheckout(): string { return AppObjsMap.appObjs.get('textcheckout'); }
    get creditcardfield(): string { return AppObjsMap.appObjs.get('fieldccadd'); }
    get expirydateField(): string { return AppObjsMap.appObjs.get('expirydatefield'); }
    get Selectcountry(): string { return AppObjsMap.appObjs.get('SelectCountry'); }
    get fieldpostalcode(): string { return AppObjsMap.appObjs.get('postal_code'); }
    get Buttonpaynow(): string { return AppObjsMap.appObjs.get('paynow'); }
    get Buttonsave():string {return AppObjsMap.appObjs.get('savebutton')}
    get Fieldcvc():string {return AppObjsMap.appObjs.get('fieldcvc')}
    get label():string {return AppObjsMap.appObjs.get('labeltest')}

    get iframename():string {return AppObjsMap.appObjs.get('iframename')}
    get checkouttestonccform():string {return AppObjsMap.appObjs.get('checkoutonccform')}
    get paynowbuttononform():string {return AppObjsMap.appObjs.get('SubmitButtontopay')}
    get okayButton():string {return AppObjsMap.appObjs.get('OkayButton')}
    

    

    

    
    
    

    
     
    @step('Click on Buy Now Button')
    async clickonbuynowbutton(): Promise<void> {
        await AllureReportHelper.attachScreenShot(this.getDriver());
         await this.clickOnElementBySelector(this.buynowbutton);
    }


    @step('Verify shipping address text display')
    async istxtshippingaddresspresent(): Promise<boolean> {
        await AllureReportHelper.attachScreenShot(this.getDriver());
        return await this.isElementPresentBySelectorWithTimeout(this.txtshippingaddress,1000);
    }

    @step('Verify Email Receipt test display')
    async istxtemailreciptpresent(): Promise<boolean> {
        await AllureReportHelper.attachScreenShot(this.getDriver());
        return await this.isElementPresentBySelectorWithTimeout(this.txtemailrecipt,10000);
    }


    @step('Click on Button This iS Correct')
    async clickButtonthisiscorrect(): Promise<void> {
        await AllureReportHelper.attachScreenShot(this.getDriver());
         await this.clickOnElementBySelector(this.Buttonthisiscorrect);
    }

    @step('Click on Button no Fix it')
    async clickButtonfixit(): Promise<void> {
        await AllureReportHelper.attachScreenShot(this.getDriver());
         await this.clickOnElementBySelector(this.Buttonfixit);
    }
    @step('Click on Save after edit address')
    async clickButtonsave(): Promise<void> {
        await AllureReportHelper.attachScreenShot(this.getDriver());
         await this.clickOnElementBySelector(this.Buttonsave);
    }

    @step('Clear the name fiels in shipping address')
    async CleartheField(): Promise<void> {
        await AllureReportHelper.attachScreenShot(this.getDriver());
        await this.clearfield(this.shippingname);
    }

    @step('Enter name for shipping address')
    async entershippingname(): Promise<void> {
        await AllureReportHelper.attachScreenShot(this.getDriver());
        await this.setValuewithrandomnumberToElementBySelector(this.shippingname,Url.shippingname);
    }

    @step('Click Done Button no Fix it screen')
    async clickdonebutton(): Promise<void> {
        await AllureReportHelper.attachScreenShot(this.getDriver());
         await this.clickOnElementBySelector(this.donebutton);
    }

    @step('Verify Confirm text display')
    async isconfirmtextonbuydisplay(): Promise<boolean> {
        await AllureReportHelper.attachScreenShot(this.getDriver());
        return await this.isElementPresentBySelectorWithTimeout(this.confirmtextonbuy,4000);
    }
    @step('Click Done Button no Fix it screen')
    async clickbuynow(): Promise<void> {
        await AllureReportHelper.attachScreenShot(this.getDriver());
         await this.clickOnElementBySelector(this.Buttonbuynow);


    }
    @step('Verify checkout test  display on form')
    async istextCheckoutdisplay(): Promise<boolean> {
        await AllureReportHelper.attachScreenShot(this.getDriver());
        return await this.isElementPresentBySelectorWithTimeout(this.checkouttestonccform,4000);
    }

    @step('Verify credit card field display')
    async isccfielddisplay(): Promise<boolean> {
        await AllureReportHelper.attachScreenShot(this.getDriver());
        return await this.isElementPresentBySelectorWithTimeout(this.creditcardfield,3000);
    }

    @step('Switch to frame')
    async switchtoframeforcc(): Promise<boolean> {
        await AllureReportHelper.attachScreenShot(this.getDriver());
        return await this.switchtoframe(this.iframename);
    }


    @step('Enter the credit card Information')
    async enterccnumber(): Promise<void> {
        await AllureReportHelper.attachScreenShot(this.getDriver());
      //  await this.switchtoframe()
       // await this.jsSendTextToElement(await this.driver.$(this.creditcardfield),Url.ccnumber);
        await this.setValueToElementBySelector(this.creditcardfield,Url.ccnumber);
        await this.setValueToElementBySelector(this.expirydateField,Url.expdate);
        await this.setValueToElementBySelector(this.Fieldcvc,Url.cvc);
        await this.dropdownSelectByVisibleText(this.Selectcountry, Url.country);
        await this.setValueToElementBySelector(this.fieldpostalcode,Url.postal);
    }

    @step('Click pay now to pay')
    async paynowbutton(): Promise<void> {
        await AllureReportHelper.attachScreenShot(this.getDriver());
         await this.clickOnElementBySelector(this.paynowbuttononform);
    }

    @step('Click OKAY to complete the buying process')
    async okaybutton(): Promise<void> {
        await AllureReportHelper.attachScreenShot(this.getDriver());
         await this.clickOnElementBySelector(this.okayButton);
    }
    @step('Switch back to parent frame')
    async switchtoparentrame(): Promise<boolean> {
        await AllureReportHelper.attachScreenShot(this.getDriver());
        return await this.switchtofparentrame(this.iframename);
    }

    

    


}