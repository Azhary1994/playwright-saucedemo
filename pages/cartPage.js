class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
  }

  async getCartItemDetails() {
    const items = await this.cartItems.all();
    const details = [];

    for (const item of items) {
      const title = await item.locator('.inventory_item_name').textContent();
      const price = await item.locator('.inventory_item_price').textContent();
      details.push({ title, price });
    }

    return details;
  }
  async getCartItemCount() {
      return await this.cartItems.count();
    }
}

module.exports = { CartPage };