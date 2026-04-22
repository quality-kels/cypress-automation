import LoginPage from "../pages/LoginPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";

describe("Checkout", () => {
  beforeEach(() => {
    LoginPage.login(Cypress.env("USERNAME"), Cypress.env("PASSWORD"));
  });

  context("order validation", () => {
    it("should complete order checkout with single item", () => {
      cy.fixture("products").then((products) => {
        cy.addToCart(products.backpack.name);
        cy.goToCart();
        CartPage.checkoutButton.click();
        cy.fillCheckoutInfo("Jane", "Doe", "12345");
        CartPage.items.should("contain", products.backpack.name);
        CheckoutPage.finishButton.click();
        CheckoutPage.confirmationHeader.should(
          "have.text",
          "Thank you for your order!",
        );
        cy.location("pathname").should("include", "checkout-complete");
      });
    });

    it("should complete ordercheckout with multiple items", () => {
      cy.fixture("products").then((products) => {
        cy.addToCart(products.backpack.name);
        cy.addToCart(products.bikeLight.name);
        cy.goToCart();
        CartPage.checkoutButton.click();
        cy.fillCheckoutInfo("Jane", "Doe", "12345");
        CartPage.items.should("contain", products.backpack.name);
        CartPage.items.should("contain", products.bikeLight.name);
        CheckoutPage.finishButton.click();
        CheckoutPage.confirmationHeader.should(
          "have.text",
          "Thank you for your order!",
        );
        cy.location("pathname").should("include", "checkout-complete");
      });
    });
  });

  context("error field validation", () => {
    beforeEach(() => {
      cy.addToCart("Sauce Labs Backpack");
      cy.goToCart();
      CartPage.checkoutButton.click();
    });

    it("shows error when first name is missing", () => {
      CheckoutPage.lastNameInput.type("Doe");
      CheckoutPage.postalCodeInput.type("12345");
      CheckoutPage.continueButton.click();
      CheckoutPage.errorMessage
        .should("be.visible")
        .and("contain.text", "First Name is required");
    });

    it("shows error when last name is missing", () => {
      CheckoutPage.firstNameInput.type("Jane");
      CheckoutPage.postalCodeInput.type("12345");
      CheckoutPage.continueButton.click();
      CheckoutPage.errorMessage
        .should("be.visible")
        .and("contain.text", "Last Name is required");
    });

    it("shows error when postal code is missing", () => {
      CheckoutPage.firstNameInput.type("Jane");
      CheckoutPage.lastNameInput.type("Doe");
      CheckoutPage.continueButton.click();
      CheckoutPage.errorMessage
        .should("be.visible")
        .and("contain.text", "Postal Code is required");
    });
  });
});
