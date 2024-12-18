import { test as setup } from "@playwright/test";
const { LoginPage } = require('../pages/login.page');
require('dotenv').config();

setup("Create Admin Auth", async ({ page }) => {
  console.log('Exécution du setup global...');

  await page.goto('/')
  const loginPage = new LoginPage(page);
  await loginPage.login(process.env.USER_LOGIN, process.env.USER_PASSWORD)
  await page.context().storageState({ path: 'state.json' });

  console.log('Setup global terminé.');
});
