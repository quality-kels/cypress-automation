import LoginPage from "../pages/LoginPage";

describe("Inventory", () => {
  beforeEach(() => {
    LoginPage.visit();
    LoginPage.login(Cypress.env("USERNAME"), Cypress.env("PASSWORD"));
  });
  context("Page display", () => {
    it("should display the products page after login", () => {
      cy.location("pathname").should("eq", "/inventory.html");
      cy.get(".title").should("have.text", "Products");
    });

    it("should display at least one item", () => {
      // .inventory_item is a Sauce Demo specific class
      cy.get(".inventory_item").should("have.length.greaterThan", 0);
    });

    it("should have an add to cart button on each item", () => {
      // .btn_inventory is a Sauce Demo specific class
      cy.get(".btn_inventory").first().should("be.visible");
    });
  });
});
