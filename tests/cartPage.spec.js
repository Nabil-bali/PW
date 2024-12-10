const { test, expect } = require('@playwright/test');
require('dotenv').config();

test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.locator('[data-test="username"]').fill(process.env.USER_LOGIN);
    await page.locator('[data-test="password"]').fill(process.env.USER_PASSWORD);
    await page.locator('[data-test="login-button"]').click();
})

test.describe("inventory list test suite", () =>  {

    test('Complete paiment process', async ({ page }) => {
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
        await page.locator('[data-test="shopping-cart-link"]').click();
        await page.locator('[data-test="checkout"]').click();
        await page.locator('[data-test="firstName"]').fill('Nabil');
        await page.locator('[data-test="lastName"]').fill('Nabil');
        await page.locator('[data-test="postalCode"]').fill('75000');
        await page.locator('[data-test="continue"]').click();
        await page.locator('[data-test="finish"]').click();
        await page.locator('[data-test="back-to-products"]').click();
        expect(await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').isVisible()).toStrictEqual(true)
    });

    test('Assert total price of products', async ({ page }) => {

        await test.step("add 2 products to cart", async () => {
            await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
            await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
        })
        
        await test.step("checkout", async () => {
            await page.locator('[data-test="shopping-cart-link"]').click();
            await page.locator('[data-test="checkout"]').click();
        })

        await test.step("fill user form and continue", async () => {
            await page.locator('[data-test="firstName"]').fill('Nabil');
            await page.locator('[data-test="lastName"]').fill('Nabil');
            await page.locator('[data-test="postalCode"]').fill('75000');
            await page.locator('[data-test="continue"]').click();
        })

        let parsePriceFromElement = async (locator) => {
            return(await locator.innerText()).split("$")[1]
        }

        await test.step("assert prices", async () => {
            let subtotalPrice = await parsePriceFromElement(page.locator('[data-test="subtotal-label"]'))
            let taxPrice = await parsePriceFromElement(page.locator('[data-test="tax-label"]'))
            let totalPrice = await parsePriceFromElement(page.locator('[data-test="total-label"]'))

            expect(subtotalPrice).toStrictEqual("39.98")
            expect(taxPrice).toStrictEqual("3.20")
            expect(totalPrice).toStrictEqual("43.18")
        })
        
        await test.step("remove bike light product", async () => {
            await page.locator('[data-test="cancel"]').click();
            await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();
        })
        
        await test.step("checkout", async () => {
            await page.locator('[data-test="shopping-cart-link"]').click();
            await page.locator('[data-test="checkout"]').click();
        })

        await test.step("fill user form and continue", async () => {
            await page.locator('[data-test="firstName"]').fill('Nabil');
            await page.locator('[data-test="lastName"]').fill('Nabil');
            await page.locator('[data-test="postalCode"]').fill('75000');
            await page.locator('[data-test="continue"]').click();
        })

        await test.step("assert prices", async () => {
            let subtotalPrice = await parsePriceFromElement(page.locator('[data-test="subtotal-label"]'))
            let taxPrice = await parsePriceFromElement(page.locator('[data-test="tax-label"]'))
            let totalPrice = await parsePriceFromElement(page.locator('[data-test="total-label"]'))

            expect(subtotalPrice).toStrictEqual("29.99")
            expect(taxPrice).toStrictEqual("2.40")
            expect(totalPrice).toStrictEqual("32.39")
        })
      });
})