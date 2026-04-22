import LoginPage from "../pages/LoginPage";
import InventoryPage from "../pages/InventoryPage";

describe("Inventory", () => {
  beforeEach(() => {
    LoginPage.login(Cypress.env("USERNAME"), Cypress.env("PASSWORD"));
  });

  context("page load", () => {
    it("should display the products page after login", () => {
      cy.location("pathname").should("eq", "/inventory.html");
      InventoryPage.pageTitle.should("have.text", "Products");
    });

    it("should display at least one item", () => {
      InventoryPage.items.should("have.length.greaterThan", 0);
    });

    it("should have an add to cart button on each item", () => {
      InventoryPage.addToCartButtons.first().should("be.visible");
    });
  });

  context("sorting", () => {
    it("should sort products by name Z to A", () => {
      cy.sortBy("za");
      InventoryPage.itemNames
        .first()
        .should("have.text", "Test.allTheThings() T-Shirt (Red)");
    });

    it("should sort products by price low to high", () => {
      cy.sortBy("lohi");
      InventoryPage.itemPrices.first().should("have.text", "$7.99");
    });
  });

  context("product detail", () => {
    it("should navigate to product detail page", () => {
      cy.goToProductDetail("Sauce Labs Backpack");
      cy.get(".inventory_details_name").should("be.visible");
      cy.get(".inventory_details_price").should("be.visible");
    });

    it("should return to inventory from product detail page", () => {
      cy.goToProductDetail("Sauce Labs Backpack");
      cy.get('[data-test="back-to-products"]').click();
      cy.location("pathname").should("eq", "/inventory.html");
    });
  });
});
