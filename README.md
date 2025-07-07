
# 🎭 Playwright Automation Framework for SauceDemo

[![CI](https://github.com/Azhary1994/playwright-saucedemo/actions/workflows/playwright.yml/badge.svg)](https://github.com/Azhary1994/playwright-saucedemo/actions)
[![Allure Report](https://img.shields.io/badge/Allure-Report-blue.svg)](https://allure.report/)

An end-to-end testing framework using **Playwright** with **JavaScript**, built for testing critical workflows on [SauceDemo](https://www.saucedemo.com).  
This framework is modular, scalable, CI-ready, and supports rich reporting.

---

## 📦 Installation

1. Make sure [Node.js](https://nodejs.org/) (v16 or later) is installed.
2. Clone the repository:

   ```bash
   git clone https://github.com/Azhary1994/playwright-saucedemo.git
   cd playwright-saucedemo
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Install required browsers:

   ```bash
   npx playwright install
   ```

---

## 🚀 Running Tests

### ✅ All Tests

```bash
npx playwright test
```

### 🔍 Specific Test File

```bash
npx playwright test tests/login.test.js
```

### 🧪 With Tags

```bash
npx playwright test --grep "@smoke"
```

### 🖥️ Headed Mode (Visible browser)

```bash
npx playwright test --headed
```

### 🌍 With Environment (Staging/Production)

```bash
ENV=staging npx playwright test
```

---

## 📊 Test Report

### ▶️ Playwright HTML Report

```bash
npx playwright show-report
```


## 🗂 Folder Structure

```
playwright-saucedemo/
│
├── config/                # Environment configs
│   └── env.config.js
│
├── pages/                 # Page Object Model
│   ├── loginPage.js
│   ├── inventoryPage.js
│   ├── cartPage.js
│   └── checkoutPage.js
│
├── tests/                 # Test files
│   ├── login.test.js
│   ├── inventory.test.js
│   ├── cart.test.js
│   └── checkout.test.js
│
├── test-data/             # External data files
│   └── users.json
│
│
├── .github/workflows/     # GitHub Actions CI
│   └── playwright.yml
│
├── playwright.config.js   # Playwright configuration
├── package.json           # Dependencies
├── eslint.config.mjs      # Lint/formatting rules
└── README.md              # You are here 🙂
```

---

## 🧰 Tools & Tech Stack

| Tool               | Purpose                               |
|--------------------|----------------------------------------|
| **Playwright**     | Automation framework                   |
| **Playwright Test**| Built-in runner & assertions           |
| **ESLint/Prettier**| Code quality & formatting              |
| **GitHub Actions** | CI pipeline for auto test execution    |

---

## ✅ Features

- ✅ Modular page objects
- ✅ JSON-based test data
- ✅ Environment config (staging, production)
- ✅ Parallel cross-browser support (Chromium, Firefox, WebKit)
- ✅ Retry logic, video & screenshot on failure
- ✅ HTML reports
- ✅ Tags & grep filtering (e.g., `@smoke`, `@regression`)
- ✅ GitHub Actions CI/CD integration
- ✅ ESLint + Prettier setup

---

## ⚠️ Assumptions & Limitations

- Focused only on [https://www.saucedemo.com](https://www.saucedemo.com)
- The Order confirmation is already covered in the checkout test
- I Assumed that the requested scenarios are different tests so that is why I made it into different files/tests.
- I Added only 3 tests to the smoke and the rest 12 to the regression just to show the idea of grouping/tags


---

## 👨‍💻 Maintainer

Made with ❤️ by [@Azhary1994](https://github.com/Azhary1994)
