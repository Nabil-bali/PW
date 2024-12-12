exports.InventoryPage = class InventoryPage {
    constructor(page) {
      this.page = page;
      this.firstNameField = page.locator('id=input-firstname');
      this.numberOfProductSpan = page.locator('[data-test="shopping-cart-badge"]')
      this.sortingDropdown = page.locator('.product_sort_container')
    }
   
    // handle dynamic content
    async getProduct(name) {
      let filteredProduct = await page.locator(`[data-test="inventory-item"]:has-text("${name}")`)
      return {
        title: await filteredProduct.locator('[data-test="inventory-item-description"] a').innerText(),
        description : await filteredProduct.locator('[data-test="inventory-item-desc"]').innerText(),
        price : (await filteredProduct.locator('[data-test="inventory-item-price"]').innerText()).split('\n')[1],
        addButton : filteredProduct.getByText("Add to cart"),
        removeButton : filteredProduct.getByText("Remove"),
        addToCart : async () => await filteredProduct.getByText("Add to cart").click(),
        remove :async () => await filteredProduct.getByText("Remove").click(),
      }
    }
  }