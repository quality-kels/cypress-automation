import LoginPage from "../pages/LoginPage";

describe("Login", () => {
  beforeEach(() => {
    LoginPage.visit();
  });

  context("Happy path", () => {
    it("should login with valid credentials", () => {
      LoginPage.login(Cypress.env("USERNAME"), Cypress.env("PASSWORD"));
      cy.location("pathname").should("eq", "/inventory.html");
    });

    it("should login with valid credentials after an error", () => {
      LoginPage.login("wrong_user", Cypress.env("PASSWORD"));
      LoginPage.errorMessage.should("be.visible");
      LoginPage.clearLogin();
      LoginPage.login("standard_user", "secret_sauce");
      cy.location("pathname").should("eq", "/inventory.html");
    });
  });

  context("Error states", () => {
    it("should show error message for invalid password", () => {
      LoginPage.login(Cypress.env("USERNAME"), "wrong_password");
      LoginPage.errorMessage
        .should("be.visible")
        .and("contain.text", "Username and password do not match");
    });

    it("should show error message for invalid username", () => {
      LoginPage.login("wrong_user", Cypress.env("PASSWORD"));
      LoginPage.errorMessage
        .should("be.visible")
        .and("contain.text", "Username and password do not match");
    });

    it("should show error message when no credentials are entered", () => {
      LoginPage.loginButton.click();
      LoginPage.errorMessage
        .should("be.visible")
        .and("contain.text", "Username is required");
    });

    it("should show error message for locked account", () => {
      LoginPage.login(Cypress.env("LOCKED_USERNAME"), Cypress.env("PASSWORD"));
      LoginPage.errorMessage
        .should("be.visible")
        .and("contain.text", "Sorry, this user has been locked out");
    });
  });
});
