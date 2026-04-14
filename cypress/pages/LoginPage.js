class LoginPage {
  get usernameInput() {
    return cy.get('[data-test="username"]');
  }
  get passwordInput() {
    return cy.get('[data-test="password"]');
  }
  get loginButton() {
    return cy.get('[data-test="login-button"]');
  }
  get errorMessage() {
    return cy.get('[data-test="error"]');
  }

  visit() {
    cy.visit("/");
    cy.get('[data-test="login-button"]', { timeout: 15000 }).should(
      "be.visible",
    );
  }

  login(username, password) {
    this.visit();
    this.usernameInput.type(username);
    this.passwordInput.type(password);
    this.loginButton.click();
  }

  clearLogin() {
    this.usernameInput.clear();
    this.passwordInput.clear();
  }
}

export default new LoginPage();
