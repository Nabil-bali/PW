exports.CheckoutFormPage = class CheckoutFormPage {
    constructor(page) {
      this.page = page;
      this.firstName = page.locator('[data-test="firstName"]')
      this.lastName = page.locator('[data-test="lastName"]')
      this.postalCode = page.locator('[data-test="postalCode"]')
      this.submitButton = page.locator('[data-test="continue"]');
    }

    async fillCheckoutForm(first,last,code) {
        await this.firstName.fill(first);
        await this.lastName.fill(last);
        await this.postalCode.fill(code);
        await this.submitButton.click();
    }
  }