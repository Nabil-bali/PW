const { test, expect } = require('@playwright/test');
const { LoginPage } = require('./pages/login.page');
const { InventoryPage } = require('./pages/inventory.page')

require('dotenv').config();


// test.describe('clock function', () => {
//   test.beforeEach(async ({ page }) => {  
//       await page.clock.install();
//       await page.goto('/')
//       const loginPage = new LoginPage(page);
//       await loginPage.login(process.env.USER_LOGIN,process.env.USER_PASSWORD)
//   })

//   test('get started link', async ({ page }) => {
    
//     await page.clock.fastForward('30:00')
//     await page.goto('/inventory.html')
//     const inventoryPage = new InventoryPage(page);
//     await inventoryPage.goToCartPage()
//     let loginPage = new LoginPage(page);
//     await loginPage.username.isVisible()
//   });
// })


// test.describe('clock function orange app', () => {
//   test.beforeEach(async ({ page }) => {  
//     await page.clock.install();
//     await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
//     await page.getByPlaceholder('Username').fill('Admin');
//     await page.getByPlaceholder('Password').fill('admin123');
//     await page.getByRole('button', { name: 'Login' }).click();
//   })

//   test('clock 2', async ({ page }) => {
    
//     await page.clock.fastForward("30:00")
//     await page.goto('https://opensource-demo.orangehrmlive.com/')
//     await page.getByPlaceholder('Username').isVisible()
//   });
// })


test('clock 3 ok', async ({ page }) => {
  await page.clock.install();
  
  await page.goto('https://www.timeanddate.com/timer/')
  await page.locator('button[title="Start timer"]').nth(0).click()
  await page.clock.fastForward("01:00")
  await page.getByPlaceholder('Username').isVisible()
});

  
