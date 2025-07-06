const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');
const users = require('../test-data/users.json');
const environments = require('../config/env.config');
const env = process.env.ENV || 'staging';

test('Login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(users.validUser.username, users.validUser.password);

  await expect(page).toHaveURL('/inventory.html');
});

test('Login with invalid credentials should show error', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
    await loginPage.login(users.invalidUser.username, users.invalidUser.password);

  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
});