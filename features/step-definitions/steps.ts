import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect, $ } from '@wdio/globals'

import LoginPage from '../pageobjects/login.page';
import SecurePage from '../pageobjects/secure.page';

const pages = {
    login: LoginPage
}

Given(/^I am on the (\w+) page$/, async (page: keyof typeof pages) => {
    await pages[page].open()
});

Given(/^I login Flipkart$/, async (page: keyof typeof pages) => {
    await pages[page].openFlip()
});

When(/^I login with (\w+) and (.+)$/, async (username, password) => {
    await LoginPage.login(username, password)
});

When(/^I search for product (.+)$/, async (Item) => {
    await LoginPage.searchNSelect(Item);
});

When(/^get the price of the product$/, async () => {
    await LoginPage.getPrice();
});

Given(/^compare price to price History app$/, async () => {
    await browser.url(`https://pricehistoryapp.com/product/apple-iphone-16-pink-128-gb`);
    await LoginPage.comparePrice();

});

Then(/^I should see a flash message saying (.*)$/, async (message) => {
    await expect(SecurePage.flashAlert).toBeExisting();
    await expect(SecurePage.flashAlert).toHaveText(expect.stringContaining(message));
});

