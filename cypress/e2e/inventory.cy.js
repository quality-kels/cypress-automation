import LoginPage from "../pages/LoginPage";

describe("Inventory", () => {
  beforeEach(() => {
    LoginPage.visit();
    LoginPage.login("standard_user", "secret_sauce");
  });

  it("should display the products page after login", () => {
    cy.url().should("include", "/inventory");
    cy.get(".title").should("have.text", "Products");
  });

  it("should display at least one product", () => {
    cy.get(".inventory_item").should("have.length.greaterThan", 0);
  });

  it("should have an add to cart button on each product", () => {
    cy.get(".btn_inventory").first().should("be.visible");
  });
});
