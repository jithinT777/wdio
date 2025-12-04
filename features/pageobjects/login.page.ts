import { $ } from '@wdio/globals'
import Page from './page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    public get inputUsername () {
        return $('#username');
    }

    public get inputPassword () {
        return $('#password');
    }

    public get btnSubmit () {
        return $('button[type="submit"]');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    public async login (username: string, password: string) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    public async getPrice () {
        const handles = await browser.getWindowHandles();
        await browser.switchToWindow(handles[handles.length - 1]); // Switch to the last tab
        let buyButton = $('//*[text()="Buy Now"]');
        await buyButton.waitForExist({ timeout: 5000 });
        let price = $('(//*[contains(text(),"₹")])[1]');
        let priceText = await price.getText();
        console.log("Price of the product is: " + priceText);
    }

    public async comparePrice () {
        let pricerecommendation = $('//p[text()="Is this a good time to buy this product?"]/following::div[5]/following::p[1]');
        console.log("Price recommendation from Price History App: " + await pricerecommendation.getText());
    }


    public async searchNSelect (searchItem: string) {
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
        let iPhone = $('//*[text()="Apple iPhone 16 (Pink, 128 GB)"] ');
        await iPhone.scrollIntoView();
        console.log("scrolled to item");
        await iPhone.click();
        console.log("clicked on the item");   
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
