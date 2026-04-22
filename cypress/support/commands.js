// Custom Commands for Sauce Demo

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

// Remove item from cart or inventory page
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

// Fill checkout info form and proceed to order overview
Cypress.Commands.add("fillCheckoutInfo", (firstName, lastName, postalCode) => {
  cy.get('[data-test="firstName"]').type(firstName);
  cy.get('[data-test="lastName"]').type(lastName);
  cy.get('[data-test="postalCode"]').type(postalCode);
  cy.get('[data-test="continue"]').click();
});

// Sort inventory by option value (e.g. "za", "lohi", "hilo", "az")
Cypress.Commands.add("sortBy", (option) => {
  cy.get(".product_sort_container").select(option);
});

// Navigate to a product detail page by item name
Cypress.Commands.add("goToProductDetail", (itemName) => {
  cy.contains(".inventory_item_name", itemName).click();
  cy.location("pathname").should("include", "inventory-item");
});

// Logout command
Cypress.Commands.add("logout", () => {
  cy.get("#react-burger-menu-btn").click();
  cy.get("#logout_sidebar_link").click();
});
