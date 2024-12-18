import { test as teardown } from "@playwright/test";
require('dotenv').config();
const fs = require('fs').promises;

// https://playwright.dev/docs/test-global-setup-teardown#setup
// https://playwrightsolutions.com/handling-multiple-login-states-between-different-tests-in-playwright/
teardown("delete storage files", async () => {
  console.log('Exécution du teardown global...');

  try {
    await fs.unlink("state.json");
    console.log('File deleted!');
  } catch (err) {
    console.error(err.message);
  }

  console.log('teardown global terminé.');
});
