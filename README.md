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
├── e2e/
│ ├── auth.cy.js # Login and logout tests
│ ├── cart.cy.js # Cart add/remove tests
│ ├── inventory.cy.js # Product page + network interception
│ └── posts.cy.js # API intercept and stub tests
├── fixtures/
│ └── products.json # Product test data
├── pages/
│ └── LoginPage.js # Page Object Model for login
└── support/
├── commands.js # Custom Cypress commands
└── e2e.js
```

## CI/CD

This project runs on GitHub Actions on every push and pull request to `main`.

The pipeline:

- Runs all 20 Cypress tests headless in Chrome on Ubuntu
- Uploads screenshots on failure as artifacts

**Note:** Credentials are stored in `cypress.config.js` env block (Sauce Demo uses publicly known fake credentials). Session state is cleared before each test via `e2e.js` global `beforeEach` (cookies, localStorage, sessionStorage, and IndexedDB).

## Key Concepts Demonstrated

- **Page Object Model** — selectors and actions abstracted into `LoginPage.js`
- **Custom Commands** — reusable commands for login, cart, and logout flows
- **Fixtures** — product data decoupled from test logic
- **Network Interception** — `cy.intercept()` for spying and stubbing API requests
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
