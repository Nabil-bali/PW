exports.InventoryPage = class InventoryPage {
    constructor(page) {
      this.page = page;
      this.firstNameField = page.locator('id=input-firstname');
      this.numberOfProductSpan = page.locator('[data-test="shopping-cart-badge"]')
      this.sortingDropdown = page.locator('.product_sort_container')
    }

    // handle dynamic content
    // get one product by name
    // get all products

    async goToCartPage() {
      await this.numberOfProductSpan.click()
    }

    async getAllProducts() {
      return await Promise.all((await this.page.locator('[data-test="inventory-item"]').all()).map(async (product, index) => {
        return {
          title: await product.locator('[data-test="inventory-item-description"] a').innerText(),
          description : await product.locator('[data-test="inventory-item-desc"]').innerText(),
          price : (await product.locator('[data-test="inventory-item-price"]').innerText()).slice(1),
          addButton : product.getByText("Add to cart"),
          removeButton : product.getByText("Remove"),
          addToCart : async () => await product.getByText("Add to cart").click(),
          remove :async () => await product.getByText("Remove").click(),
          position: index+1,
          locator: product,
        }
      }))
    }
   
    
    async getProduct(name) {
      let filteredProduct = await this.page.locator(`[data-test="inventory-item"]:has-text("${name}")`)
      return {
        title: await filteredProduct.locator('[data-test="inventory-item-description"] a').innerText(),
        description : await filteredProduct.locator('[data-test="inventory-item-desc"]').innerText(),
        price : (await filteredProduct.locator('[data-test="inventory-item-price"]').innerText()).slice(1),
        addButton : filteredProduct.getByText("Add to cart"),
        removeButton : filteredProduct.getByText("Remove"),
        addToCart : async () => await filteredProduct.getByText("Add to cart").click(),
        remove :async () => await filteredProduct.getByText("Remove").click(),
      }
    }
  }