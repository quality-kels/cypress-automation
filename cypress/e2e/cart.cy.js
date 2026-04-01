import LoginPage from "../pages/LoginPage";

describe("Cart", () => {
  beforeEach(() => {
    cy.login(Cypress.env("USERNAME"), Cypress.env("PASSWORD"));
  });

  context("Adding items", () => {
    it("should add an item to the cart", () => {
      cy.fixture("products").then((products) => {
        cy.addToCart(products.backpack.name);
        cy.get(".shopping_cart_badge").should("have.text", "1");
        cy.goToCart();
        cy.verifyItemInCart(products.backpack.name);
        cy.verifyCartCount(1);
      });
    });

    it("should add two different items to the cart", () => {
      cy.fixture("products").then((products) => {
        cy.addToCart(products.backpack.name);
        cy.addToCart(products.bikeLight.name);
        cy.get(".shopping_cart_badge").should("have.text", "2");
        cy.goToCart();
        cy.verifyItemInCart(products.backpack.name);
        cy.verifyItemInCart(products.bikeLight.name);
        cy.verifyCartCount(2);
      });
    });
  });

  context("Removing items", () => {
    it("should remove an item from the cart page", () => {
      cy.fixture("products").then((products) => {
        cy.addToCart(products.backpack.name);
        cy.addToCart(products.bikeLight.name);
        cy.get(".shopping_cart_badge").should("have.text", "2");
        cy.removeItem(products.backpack.name, "cart");
        cy.get(".shopping_cart_badge").should("have.text", "1");
        cy.verifyItemNotInCart(products.backpack.name);
        cy.verifyItemInCart(products.bikeLight.name);
      });
    });

    it("should remove an item from the inventory page", () => {
      cy.fixture("products").then((products) => {
        cy.addToCart(products.backpack.name);
        cy.addToCart(products.bikeLight.name);
        cy.get(".shopping_cart_badge").should("have.text", "2");
        cy.removeItem(products.backpack.name, "inventory");
        cy.get(".shopping_cart_badge").should("have.text", "1");
        cy.goToCart();
        cy.verifyItemNotInCart(products.backpack.name);
        cy.verifyItemInCart(products.bikeLight.name);
      });
    });

    it("should remove all items from the cart page", () => {
      cy.fixture("products").then((products) => {
        cy.addToCart(products.backpack.name);
        cy.get(".shopping_cart_badge").should("have.text", "1");
        cy.removeItem(products.backpack.name, "cart");
        cy.get(".cart_item").should("not.exist");
      });
    });
  });

  context("Navigation", () => {
    it("should logout successfully", () => {
      cy.logout();
      cy.location("pathname").should("eq", "/");
      cy.get('[data-test="login-button"]').should("be.visible");
    });
  });
});
