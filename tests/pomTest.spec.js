const { test, expect } = require('@playwright/test')
const { InventoryPage } = require('./pages/inventory.page')
const { LoginPage } = require('./pages/login.page');
const { CartPage } = require('./pages/cart.page');
const { CheckoutFormPage } = require('./pages/checkoutForm.page');
const { CheckoutOverviewPage } = require('./pages/checkoutOverview.page');
require('dotenv').config();



test.describe("pom tests", () => {
    
    test.beforeEach(async ({ page }) => {  
        await page.goto('/')
        const loginPage = new LoginPage(page);
        await loginPage.login(process.env.USER_LOGIN,process.env.USER_PASSWORD)
    })

    test("Remove a product from cart with POM", { tag: '@ret' }, async ({page}) => {
        const inventoryPage = new InventoryPage(page);
        let sauceLabTShirt = await inventoryPage.getProduct('Sauce Labs Bolt T-Shirt')
        await sauceLabTShirt.addToCart()
        await expect(await inventoryPage.numberOfProductSpan).toHaveText("1")
        await sauceLabTShirt.remove()
        await inventoryPage.numberOfProductSpan.waitFor({state: "detached"});
        await sauceLabTShirt.removeButton.waitFor({state: "detached"});
    })

    test("Remove a product from cart with POM (failed)", { tag: '@ret' }, async ({page}) => {
        const inventoryPage = new InventoryPage(page);
        let sauceLabTShirt = await inventoryPage.getProduct('Sauce Labs Bolt T-Shirt')
        await sauceLabTShirt.addToCart()
        await expect(await inventoryPage.numberOfProductSpan).toHaveText("8")
        await sauceLabTShirt.remove()
        await inventoryPage.numberOfProductSpan.waitFor({state: "detached"});
        await sauceLabTShirt.removeButton.waitFor({state: "detached"});
    })

    test("Assert product fields with POM", { tag: '@nightly' }, async ({page}) => {
        const inventoryPage = new InventoryPage(page);
        let allProducts = await inventoryPage.getAllProducts()
        let [sauceLabTShirt] = allProducts.filter(p => p.title === "Sauce Labs Bolt T-Shirt");
        
        expect(sauceLabTShirt).toMatchObject({
            "title": "Sauce Labs Bolt T-Shirt",
            "description": "Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.",
            "price" :"15.99"
        })  
    })

    test("Buy a product with POM", { tag: '@nightly' }, async ({page}) => {
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

    test.afterEach(async ({page}) => {
        await page.close()
    })
    
})

test("batch actions", { tag: "@batch"},  () => expect(["myArray"]).toHaveLength(1))
