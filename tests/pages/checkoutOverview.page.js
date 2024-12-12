exports.CheckoutOverviewPage = class CheckoutOverviewPage {
    constructor(page) {
      this.page = page;
      this.subtotalPrice = page.locator('[data-test="subtotal-label"]')
      this.taxPrice = page.locator('[data-test="tax-label"]')
      this.totalPrice = page.locator('[data-test="total-label"]')
      this.finishButton = page.getByText('Finish');
    }

    async parsePriceFromElement(locator) {
        return(await locator.innerText()).split("$")[1]
    }
  }