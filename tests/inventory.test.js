const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');
const { InventoryPage } = require('../pages/inventoryPage');
const { CartPage } = require('../pages/cartPage');
const users = require('../test-data/users.json');
const environments = require('../config/env.config');
const env = process.env.ENV || 'staging';

test('Sort by price, add cheapest 2 items, and validate in cart @regression', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  // Login
  await loginPage.goto();
  await loginPage.login(users.validUser.username, users.validUser.password);
 //debugging
  await expect(page).toHaveURL('/inventory.html');
  // Sort products by price
  await inventoryPage.sortByLowToHigh();

  // Get and add 2 cheapest items
  const cheapestItems = await inventoryPage.getCheapestItems(2);
  await inventoryPage.addItemsToCart(cheapestItems);

  // Go to cart
  await inventoryPage.goToCart();

  // Validate items in cart
  const cartItems = await cartPage.getCartItemDetails();
  expect(cartItems).toEqual([
    { title: cheapestItems[0].title, price: cheapestItems[0].price },
    { title: cheapestItems[1].title, price: cheapestItems[1].price }
  ]);
});