class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.checkoutBtn = page.locator('[data-test="checkout"]');
    this.firstName = page.locator('[data-test="firstName"]');
    this.lastName = page.locator('[data-test="lastName"]');
    this.postalCode = page.locator('[data-test="postalCode"]');
    this.continueBtn = page.locator('[data-test="continue"]');
    this.finishBtn = page.locator('[data-test="finish"]');
    this.totalLabel = page.locator('.summary_total_label');
    this.taxLabel = page.locator('.summary_tax_label');
    this.itemPrices = page.locator('.inventory_item_price');
    this.confirmationHeader = page.locator('.complete-header');
  }

  async startCheckout() {
    await this.checkoutBtn.click();
  }

  async fillCustomerInfo(first, last, postal) {
    await this.firstName.fill(first);
    await this.lastName.fill(last);
    await this.postalCode.fill(postal);
    await this.continueBtn.click();
  }

  async getDisplayedTotal() {
    const text = await this.totalLabel.textContent();
    return parseFloat(text.replace('Total: $', ''));
  }

  async getDisplayedTax() {
    const text = await this.taxLabel.textContent();
    return parseFloat(text.replace('Tax: $', ''));
  }

  async getSumOfItemPrices() {
    const prices = await this.itemPrices.allTextContents();
    return prices
      .map(p => parseFloat(p.replace('$', '')))
      .reduce((acc, val) => acc + val, 0);
  }

  async finishOrder() {
    await this.finishBtn.click();
  }

  async isOrderComplete() {
    return await this.confirmationHeader.textContent();
  }
}

module.exports = { CheckoutPage };