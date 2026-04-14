import LoginPage from "../pages/LoginPage";

describe("Authentication", () => {
  context("Login", () => {
    it("should login with valid credentials", () => {
      LoginPage.login(Cypress.env("USERNAME"), Cypress.env("PASSWORD"));
      cy.location("pathname", { timeout: 15000 }).should("include", "inventory");
      cy.get(".title").should("have.text", "Products");
    });

    it("should login with valid credentials after an error", () => {
      LoginPage.login("wrong_user", Cypress.env("PASSWORD"));
      LoginPage.errorMessage.should("be.visible");
      LoginPage.login(Cypress.env("USERNAME"), Cypress.env("PASSWORD"));
      cy.location("pathname").should("eq", "/inventory.html");
    });
  });

  context("Login error states", () => {
    const errorCases = [
      {
        name: "invalid password shows error message",
        action: () =>
          LoginPage.login(Cypress.env("USERNAME"), "wrong_password"),
        expectedError: "Username and password do not match",
      },
      {
        name: "invalid username shows error message",
        action: () => LoginPage.login("wrong_user", Cypress.env("PASSWORD")),
        expectedError: "Username and password do not match",
      },
      {
        name: "empty submission shows username required",
        action: () => {
          LoginPage.visit();
          LoginPage.loginButton.click();
        },
        expectedError: "Username is required",
      },
      {
        name: "locked account shows error message",
        action: () =>
          LoginPage.login(
            Cypress.env("LOCKED_USERNAME"),
            Cypress.env("PASSWORD"),
          ),
        expectedError: "Sorry, this user has been locked out",
      },
    ];

    errorCases.forEach(({ name, action, expectedError }) => {
      it(name, () => {
        action();
        LoginPage.errorMessage
          .should("be.visible")
          .and("contain.text", expectedError);
      });
    });
  });

  context("Logout", () => {
    it("should logout successfully", () => {
      LoginPage.login(Cypress.env("USERNAME"), Cypress.env("PASSWORD"));
      cy.location("pathname", { timeout: 15000 }).should("include", "inventory");
      cy.logout();
      cy.location("pathname").should("eq", "/");
    });
  });
});
