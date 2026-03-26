// Custom Commands for Sauce Demo

// Login command - reusable across all test files
Cypress.Commands.add("login", (username, password) => {
  cy.visit("/");
  cy.get('[data-test="username"]').type(username);
  cy.get('[data-test="password"]').type(password);
  cy.get('[data-test="login-button"]').click();
});

// Add item to cart by name
Cypress.Commands.add("addToCart", (itemName) => {
  cy.contains(itemName)
    .parents(".inventory_item")
    .find(".btn_inventory")
    .click();
});

// Navigate to cart
Cypress.Commands.add("goToCart", () => {
  cy.get(".shopping_cart_link").click();
  cy.url().should("include", "/cart");
});

// Verify item is in cart
Cypress.Commands.add("verifyItemInCart", (itemName) => {
  cy.get(".cart_item").should("contain", itemName);
});

// Verify item is not in cart
Cypress.Commands.add("verifyItemNotInCart", (itemName) => {
  cy.get(".cart_item").should("not.contain", itemName);
});

Cypress.Commands.add("removeItem", (itemName, location) => {
  if (location === "inventory") {
    cy.contains(itemName)
      .parents(".inventory_item")
      .find(".btn_inventory")
      .click();
  } else if (location === "cart") {
    cy.get(".shopping_cart_link").click();
    cy.url().should("include", "/cart");
    cy.contains(itemName).parents(".cart_item").find(".btn_secondary").click();
  }
});

// Navigate to cart and verify item count
Cypress.Commands.add("verifyCartCount", (expectedCount) => {
  cy.get(".cart_item").should("have.length", expectedCount);
  cy.url().should("include", "/cart");
});

// Logout command
Cypress.Commands.add("logout", () => {
  cy.get("#react-burger-menu-btn").click();
  cy.get("#logout_sidebar_link").click();
});
