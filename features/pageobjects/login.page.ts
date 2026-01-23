import { $ } from '@wdio/globals'
import Page from './page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    public linK: string = '';
    public get inputUsername () {
        return $('#username');
    }

    public get inputPassword () {
        return $('#password');
    }

    public get btnSubmit () {
        return $('button[type="submit"]');
    }

        public get loginMenuSection () {
        return $('//span[text()="Login"]');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    public async login (username: string, password: string) {
        await this.inputUsername.setValue(username);
        console.log("Username entered");
        await this.inputPassword.setValue(password);
        console.log("Password entered");
        await this.btnSubmit.click();
    }

    public async getPrice () {
        const handles = await browser.getWindowHandles();
        await browser.switchToWindow(handles[handles.length - 1]); // Switch to the last tab
        let buyButton = $('//*[text()="Buy Now"]');
        await buyButton.waitForExist({ timeout: 5000 });
        let price = $('(//*[contains(text(),"₹")])[2]');
        let priceText = await price.getText();
        console.log("Price of the product is: " + priceText);
        this.linK = await browser.getUrl(); 
    }

    public async comparePrice () {
        console.log("Comparing price on Price History App for the product link: " + this.linK);
        this.inputProduct(this.linK);
        let pricerecommendation = $('//span[text()="₹"]/following::div[3]/p[2]');
        await pricerecommendation.waitForDisplayed({ timeout: 15000 });
        console.log("Price recommendation from Price History App: " + await pricerecommendation.getText());

    }

    public async inputProduct (linK: string) {
        let productInput = $('(//*[contains(@placeholder,"Enter name or")])[1]');
        await productInput.click();
        await productInput.setValue(linK);
        let button = $('(//button[text()="Search"])[1]');
        await button.waitForDisplayed({ timeout: 5000 });
        await button.click();

    }

    public async searchNSelect (searchItem: string) {
        await this.loginMenuSection.waitForExist({ timeout: 5000 });
        await this.loginMenuSection.moveTo();
        console.log("hovered on login menu");
        for (let i=2; i<8; i++) {
            let loginPopup = await($('//*/a['+i+']/li')).getText();
        console.log("Content of login popup "+i+": "+loginPopup);
        }
        let searchbox = $('//*[@placeholder="Search for Products, Brands and More"]');
        await searchbox.waitForExist({ timeout: 5000 });
        await searchbox.click();
        console.log("searching for the item");
        await searchbox.setValue(searchItem);
        console.log("entered the item");
        await browser.keys("Enter");
        console.log("pressed enter");
        let searchResults = $('//*[contains(text(),"Showing 1")]');
        await searchResults.waitForExist({ timeout: 5000 });
        console.log("Search page displayed");
        let iPhone = $('//div[text()="'+searchItem+'"]');
        let iphoneList = $$('//div[contains(text(),"iPhone")]');
        console.log("Total items found: "+await iphoneList.length);
        console.log("Listing all the items:");
        for (let i=0; i<await iphoneList.length; i++) {
            let itemText = await iphoneList[i].getText();
            console.log("Item "+i+": "+itemText);
        }
        await iPhone.scrollIntoView();
        console.log("scrolled to item");
        await iPhone.click();
        console.log("clicked on the item");  
    }

    public async performActionSet1 () {
        console.log("Performing action set 1");
        
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    public open () {
        return super.open();
    }
    public openFlip () {
        return super.openFlip('login');
    }
}

export default new LoginPage();
