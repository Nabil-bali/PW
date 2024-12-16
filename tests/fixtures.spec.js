const { chromium } = require('playwright');
const { test, expect } = require('@playwright/test')
require('dotenv').config();

test("POM with multiuser", async () => {

    const browser = await chromium.launch(); 

    const simpleUserContext = await browser.newContext(); 
    const simpleUserPage = await simpleUserContext.newPage();  
    await simpleUserPage.goto('/')

    const lockedUserContext = await browser.newContext()
    const lockedUserPage = await lockedUserContext.newPage();
    //await lockedUserPage.goto('/')
    
    
    await expect(simpleUserPage).toHaveTitle(/Swag Labs/);
    await simpleUserPage.locator('[data-test="username"]').fill(process.env.USER_LOGIN);
    await simpleUserPage.locator('[data-test="password"]').fill(process.env.USER_PASSWORD);

    
    await expect(lockedUserPage).toHaveTitle(/Swag Labs/);
    await lockedUserPage.locator('[data-test="username"]').fill(process.env.USER_LOCKED_NAME);
    await lockedUserPage.locator('[data-test="password"]').fill(process.env.USER_PASSWORD);
})