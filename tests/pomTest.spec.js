const { test, expect } = require('@playwright/test')
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

test.describe("pom tests", () => {

    test("Remove a product from cart with POM", async ({page}) => {
        const inventoryPage = new InventoryPage(page);
        let sauceLabTShirt = await inventoryPage.getProduct('Sauce Labs Bolt T-Shirt')
        await sauceLabTShirt.addToCart()
        await expect(await inventoryPage.numberOfProductSpan.innerText()).toHaveText("1")
        await sauceLabTShirt.remove()
        await inventoryPage.numberOfProductSpan.waitFor({state: "detached"});
        await sauceLabTShirt.removeButton.waitFor({state: "detached"});
    })

    test("Assert product fields with POM", async ({page}) => {
        const inventoryPage = new InventoryPage(page);
        let allProducts = await inventoryPage.getAllProducts()
        // assert
        
    })

    test("Buy a product with POM", async ({page}) => {
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        const checkoutFormPage = new CheckoutFormPage(page)
        const checkoutOverviewPage = new CheckoutOverviewPage(page)

        let sauceLabTShirt = await inventoryPage.getProduct('Sauce Labs Bolt T-Shirt')
        await sauceLabTShirt.addToCart()
        await inventoryPage.goToCartPage()
        await cartPage.checkout()
        await checkoutFormPage.fillCheckoutForm("nabil", "bali", "75000")
        let subtotalPrice = await checkoutOverviewPage.parsePriceFromElement(checkoutOverviewPage.subtotalPrice);
        expect(subtotalPrice).toStrictEqual('15.99');
        await checkoutOverviewPage.finishButton.click()

    })
})