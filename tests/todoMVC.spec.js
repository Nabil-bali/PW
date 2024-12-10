const { test, expect } = require('@playwright/test');
const { before, beforeEach, describe } = require('node:test');
require('dotenv').config();

/**
 * gestion des credentials
 * page object model (avant faire des action "customCommands")
 * ci/cd
 * attacher à un repository github
 */

test.beforeEach(async ({ page }) => {
    await page.goto('/')
})

test.describe.skip("Connection test suite", () => {

    test("I connect successfully to saucedemo", async ({ page }) => {

        // log in
        await expect(page).toHaveTitle(/Swag Labs/);
        await page.locator('[data-test="username"]').fill(process.env.USER_LOGIN);
        await page.locator('[data-test="password"]').fill(process.env.USER_PASSWORD);
        await page.locator('[data-test="login-button"]').click();
        //await expect(page.locator('#inventory_container')).toBeVisible();
        await expect(page).toHaveTitle(/Swag Labs/);
        await expect(page.locator('[data-test="title"]')).toBeVisible();
        await expect(page.locator('[data-test="inventory-list"]')).toBeVisible();
        let articles = await page.locator('[data-test="inventory-item"]').all();
        await articles[0].locator('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText("1")
    })

    test("I connect to saucedemo with a locked_out user", async ({ page }) => {

        // log in
        await expect(page).toHaveTitle(/Swag Labs/);
        await page.locator('[data-test="username"]').fill('locked_out_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();

        await expect(page.locator('[data-test="error"]')).toBeVisible();
        await expect(page.locator('[data-test="error"]')).toContainText(/Epic sadface: Sorry, this user has been locked out./)

    })

    test("I cannot acced to the shop without connection", async ({ page }) => {

        await page.goto('/inventory.html')
        await expect(page.locator('[data-test="title"]')).toBeVisible({ visible: false });
        await expect(page.locator('[data-test="login-button"]')).toBeVisible();
        await expect(page.locator('[data-test="error"]')).toBeVisible();
        await expect(page.locator('[data-test="error"]')).toContainText(/Epic sadface: You can only access '\/inventory.html' when you are logged in./)
    })

    test("I should be redirected on login page after log out", async ({ page }) => {

        // log in
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();

        //await page.locator('[data-test="open-menu"]').click()
        await page.locator('[data-test="primary-header"] #react-burger-menu-btn').click()
        await page.getByText('Logout').click();
        await expect(page.locator('[data-test="title"]')).toBeVisible({ visible: false });
        await expect(page.locator('[data-test="login-button"]')).toBeVisible();
    })

})