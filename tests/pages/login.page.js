exports.LoginPage = class LoginPage {
    constructor(page) {
      this.page = page;
      this.username = page.locator('[data-test="username"]')
      this.password = page.locator('[data-test="password"]')
      this.loginButton = page.locator('[data-test="login-button"]')
    }
   
    async login(username,password) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }
  }