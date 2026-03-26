describe("Cart", () => {
  beforeEach(() => {
    cy.login("standard_user", "secret_sauce");
  });

  it("should add an item to the cart", () => {
    cy.addToCart("Sauce Labs Backpack");
    cy.get(".shopping_cart_badge").should("have.text", "1");
    cy.goToCart();
    cy.verifyItemInCart("Sauce Labs Backpack");
    cy.verifyCartCount(1);
  });

  it("should add two different items to the cart", () => {
    cy.addToCart("Sauce Labs Backpack");
    cy.addToCart("Sauce Labs Bike Light");
    cy.get(".shopping_cart_badge").should("have.text", "2");
    cy.goToCart();
    cy.verifyItemInCart("Sauce Labs Backpack");
    cy.verifyItemInCart("Sauce Labs Bike Light");
    cy.verifyCartCount(2);
  });

  it("should remove an item from the cart page", () => {
    cy.addToCart("Sauce Labs Backpack");
    cy.addToCart("Sauce Labs Bike Light");
    cy.get(".shopping_cart_badge").should("have.text", "2");
    cy.removeItem("Sauce Labs Backpack", "cart");
    cy.get(".shopping_cart_badge").should("have.text", "1");
    cy.verifyItemNotInCart("Sauce Labs Backpack");
    cy.verifyItemInCart("Sauce Labs Bike Light");
  });

  it("should remove an item from the inventory page", () => {
    cy.addToCart("Sauce Labs Backpack");
    cy.addToCart("Sauce Labs Bike Light");
    cy.get(".shopping_cart_badge").should("have.text", "2");
    cy.removeItem("Sauce Labs Backpack", "inventory");
    cy.get(".shopping_cart_badge").should("have.text", "1");
    // navigate to cart and verify correct item remains
    cy.goToCart();
    cy.verifyItemNotInCart("Sauce Labs Backpack");
    cy.verifyItemInCart("Sauce Labs Bike Light");
  });

  it("should remove all items from the cart page", () => {
    cy.addToCart("Sauce Labs Backpack");
    cy.get(".shopping_cart_badge").should("have.text", "1");
    cy.removeItem("Sauce Labs Backpack", "cart");
    cy.get(".cart_item").should("not.exist");
  });

  it("should logout successfully", () => {
    cy.logout();
    cy.url().should("include", "/");
    cy.get('[data-test="login-button"]').should("be.visible");
  });
});
