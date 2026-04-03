describe("Cart", () => {
  beforeEach(() => {
    cy.login(Cypress.env("USERNAME"), Cypress.env("PASSWORD"));
  });

  context("adding items", () => {
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

  context("removing items", () => {
    const removalCases = [
      { label: "from the cart page", page: "cart" },
      { label: "from the inventory page", page: "inventory" },
    ];

    removalCases.forEach(({ label, page }) => {
      it(`should remove an item ${label}`, () => {
        cy.fixture("products").then((products) => {
          cy.addToCart(products.backpack.name);
          cy.addToCart(products.bikeLight.name);
          cy.get(".shopping_cart_badge").should("have.text", "2");
          cy.removeItem(products.backpack.name, page);
          cy.get(".shopping_cart_badge").should("have.text", "1");
          if (page === "inventory") cy.goToCart();
          cy.verifyItemNotInCart(products.backpack.name);
          cy.verifyItemInCart(products.bikeLight.name);
        });
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
});
