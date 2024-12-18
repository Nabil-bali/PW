const { test, expect } = require('@playwright/test')
const { InventoryPage } = require('./pages/inventory.page')

test.describe('tests with setup', () => {
    test.use({ storageState: "state.json" });

    test.beforeEach(async ({ page }) => {  
        await page.goto('/inventory.html')
    })

    test("Remove a product (pom and setup)", { tag: '@setup' }, async ({ page }) => {
        await page.goto('/inventory.html')
        const inventoryPage = new InventoryPage(page);
        let sauceLabTShirt = await inventoryPage.getProduct('Sauce Labs Bolt T-Shirt')
        await sauceLabTShirt.addToCart()
        await expect(await inventoryPage.numberOfProductSpan).toHaveText("1")
        await sauceLabTShirt.remove()
        await inventoryPage.numberOfProductSpan.waitFor({ state: "detached" });
        await sauceLabTShirt.removeButton.waitFor({ state: "detached" });
    })
})
