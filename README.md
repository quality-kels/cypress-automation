# Cypress Automation

![Cypress Tests](https://github.com/quality-kels/cypress-automation/actions/workflows/cypress.yml/badge.svg)

Cypress test automation suite targeting [Sauce Demo](https://www.saucedemo.com). Built as part of a structured QA skill-build to practice automation patterns I'd use on the job featuring POM, custom commands, fixtures, and network interception.

## Tech Stack

- Cypress 15
- JavaScript (ES6+)
- Node.js

## Project Structure

```
cypress/
├── api/
│ └── posts.cy.js         # API request and network interception tests
├── e2e/
│ ├── auth.cy.js          # Login and logout tests
│ ├── cart.cy.js          # Cart add/remove tests
│ ├── checkout.cy.js      # End-to-end checkout workflow and form validation
│ └── inventory.cy.js     # Product listing, sorting, and detail navigation
├── fixtures/
│ ├── post.json           # Fixture data for mocked API responses
│ └── products.json       # Product test data for cart and inventory tests
├── pages/
│ ├── CartPage.js         # Cart interactions and selectors
│ ├── CheckoutPage.js     # Checkout form and confirmation selectors
│ ├── InventoryPage.js    # Product listing, sorting, and detail selectors
│ └── LoginPage.js        # Login form selectors and actions
└── support/
    ├── commands.js        # Custom Cypress commands
    └── e2e.js             # Global beforeEach setup
```

The `api/` folder is intentionally separate from `e2e/`. The Sauce Demo UI tests live in `e2e/` while `api/` holds a standalone API testing demo using [JSONPlaceholder](https://jsonplaceholder.typicode.com) — a free public REST API. This separation reflects a real-world distinction between UI end-to-end testing and API-level testing.

## CI/CD

This project runs on GitHub Actions on every push and pull request to `main`.

The pipeline:

- Runs all Cypress tests headless in Chrome on Ubuntu
- Uploads Mochawesome HTML report as artifact on every run
- Uploads screenshots as artifact on failure

**Note:** Credentials are stored in `cypress.config.js` env block (Sauce Demo uses publicly known fake credentials). Session state is cleared before each test via `e2e.js` global `beforeEach` (cookies, localStorage, sessionStorage, and IndexedDB).

## Key Concepts Demonstrated

- **Page Object Model** — selectors and actions abstracted into `LoginPage.js`, `InventoryPage.js`, `CartPage.js`, and `CheckoutPage.js`
- **Custom Commands** — reusable commands for login, cart, sorting, and navigation flows
- **Fixtures** — test data decoupled from test logic
- **Network Interception** — `cy.intercept()` for both live pass-through and stubbed responses covering 200, 201, 404, and 500 status codes
- **Direct API Testing** — `cy.request()` for clean HTTP assertions without browser context
- **Data-driven Tests** — `forEach` loops to cover multiple cases without redundant `it` blocks
- **Environment Variables** — credentials stored in `cypress.config.js` env block, never hardcoded

## Running Tests

Run the full suite headlessly:

```bash
npx cypress run
```

Open the Cypress UI:

```bash
npx cypress open
```

Run a single spec:

```bash
npx cypress run --spec "cypress/e2e/auth.cy.js"
```
