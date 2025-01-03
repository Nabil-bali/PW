const { test, expect } = require('@playwright/test');
const { InventoryPage } = require('./pages/inventory.page')
const { LoginPage } = require('./pages/login.page');
const { CartPage } = require('./pages/cart.page');
const { CheckoutFormPage } = require('./pages/checkoutForm.page');
const { CheckoutOverviewPage } = require('./pages/checkoutOverview.page');
require('dotenv').config();

test.beforeEach(async ({ page }) => {  
    await page.goto('/')
    const loginPage = new LoginPage(page);
    await loginPage.login(process.env.USER_LOGIN,process.env.USER_PASSWORD)
})

test.describe("inventory list test suite", () =>  {

    test("Add to cart a product", async ({page}) => {
        const selectedItem = page.locator('[data-test="inventory-item"]:has-text("Sauce Labs Backpack")')
        const o = await selectedItem.isVisible()
        const u = await selectedItem.innerText()
        // await selectedItem.getByRole("button").click()
        await selectedItem.getByText("Add to cart").click()
        await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText("1")
    })

    test("Remove a product from cart", async ({page}) => {
        const selectedItem = page.locator('[data-test="inventory-item"]:has-text("Sauce Labs Backpack")')
        const o = await selectedItem.isVisible()
        const u = await selectedItem.innerText()
        // await selectedItem.getByRole("button").click()
        await selectedItem.getByText("Add to cart").click()
        await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText("1")
        await selectedItem.getByText("Remove").click()
        await page.locator('[data-test="shopping-cart-badge"]').waitFor({state: "detached"})
        await selectedItem.getByText("Remove").waitFor({state: "detached"})
    })

    

    test("assert card are well displayed", async ({page}) => {
        expect(await page.locator('[data-test="inventory-item"]').locator('[data-test="inventory-item-name"]').all()).toHaveLength(6)
        const currentAvailableProducts = await page.locator('[data-test="inventory-item"]').locator('[data-test="inventory-item-name"]').allTextContents()
        expect(currentAvailableProducts).toStrictEqual([
            "Sauce Labs Backpack",
            "Sauce Labs Bike Light",
            "Sauce Labs Bolt T-Shirt",
            "Sauce Labs Fleece Jacket",
            "Sauce Labs Onesie",
            "Test.allTheThings() T-Shirt (Red)"
        ]);
    })

    test("Order by unalphabetic order", async ({page}) => {
        const inventoryPage = new InventoryPage(page)
        await inventoryPage.sortingDropdown.selectOption('za');

        const firstProductTtitle = await page.locator('[data-test="inventory-item"]').locator('[data-test="inventory-item-name"]').nth(0).innerText()
        expect(firstProductTtitle).toStrictEqual("Sauce Labs Backpack");
        // expect(firstProductTtitle).toBe("Test.allTheThings() T-Shirt (Red)");
    })
    

})