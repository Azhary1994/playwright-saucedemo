class InventoryPage {
  constructor(page) {
    this.page = page;
    this.sortDropdown = page.locator('select.product_sort_container');
    this.inventoryItems = page.locator('.inventory_item');
    this.cartIcon = page.locator('.shopping_cart_link');
  }

  async sortByLowToHigh() {
  await this.sortDropdown.waitFor({ state: 'visible', timeout: 5000 });
    await this.sortDropdown.selectOption('lohi');
  }

  async getCheapestItems(count = 2) {
    const items = await this.inventoryItems.all();

    const cheapest = [];
    for (let i = 0; i < count; i++) {
      const item = items[i];
      const title = await item.locator('.inventory_item_name').textContent();
      const price = await item.locator('.inventory_item_price').textContent();
      const button = item.locator('button');
      cheapest.push({ title, price, button });
    }

    return cheapest;
  }

  async addItemsToCart(items) {
    for (const item of items) {
      await item.button.click();
    }
  }

  async goToCart() {
    await this.cartIcon.click();
  }
}

module.exports = { InventoryPage };