const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');
const { InventoryPage } = require('../pages/inventoryPage');
const { CartPage } = require('../pages/cartPage');
const { CheckoutPage } = require('../pages/checkoutPage');
const users = require('../test-data/users.json');
const environments = require('../config/env.config');
const env = process.env.ENV || 'staging';


test('Complete checkout with tax and total verification @regression', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // Login
  await loginPage.goto();
  await loginPage.login(users.validUser.username, users.validUser.password);
  await expect(page).toHaveURL('/inventory.html');

  // Add 2 cheapest items
  await inventoryPage.sortByLowToHigh();
  const cheapestItems = await inventoryPage.getCheapestItems(2);
  await inventoryPage.addItemsToCart(cheapestItems);

  // Go to cart
  await inventoryPage.goToCart();
  await expect(page).toHaveURL('/cart.html');

  // Start checkout
  await checkoutPage.startCheckout();
  await checkoutPage.fillCustomerInfo(users.customerInfo.firstName,users.customerInfo.lastName,users.customerInfo.postalCode);

  // Validate total
  const itemTotal = await checkoutPage.getSumOfItemPrices();
  const tax = await checkoutPage.getDisplayedTax();
  const displayedTotal = await checkoutPage.getDisplayedTotal();

  const expectedTotal = parseFloat((itemTotal + tax).toFixed(2));
  expect(displayedTotal).toBeCloseTo(expectedTotal, 2);

  // Complete order
  await checkoutPage.finishOrder();
  const confirmation = await checkoutPage.isOrderComplete();
  expect(confirmation).toContain('Thank you');
});