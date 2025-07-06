const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');
const { InventoryPage } = require('../pages/inventoryPage');
const { CartPage } = require('../pages/cartPage');
const users = require('../test-data/users.json');
const environments = require('../config/env.config');
const env = process.env.ENV || 'staging';

test('Cart shows correct items and prices', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  // Step 1: Login
  await loginPage.goto();
    await loginPage.login(users.validUser.username, users.validUser.password);
  await expect(page).toHaveURL('/inventory.html');

  // Step 2: Sort and add cheapest 2 items
  await inventoryPage.sortByLowToHigh();
  const cheapestItems = await inventoryPage.getCheapestItems(2);
  await inventoryPage.addItemsToCart(cheapestItems);

  // Step 3: Go to cart
  await inventoryPage.goToCart();
  await expect(page).toHaveURL('/cart.html');

  // Step 4: Validate cart item count
  const itemCount = await cartPage.getCartItemCount();
  expect(itemCount).toBe(2);

  // Step 5: Validate cart items details (name + price)
  const cartItems = await cartPage.getCartItemDetails();
  expect(cartItems).toEqual([
    { title: cheapestItems[0].title.trim(), price: cheapestItems[0].price.trim() },
    { title: cheapestItems[1].title.trim(), price: cheapestItems[1].price.trim() },
  ]);
});