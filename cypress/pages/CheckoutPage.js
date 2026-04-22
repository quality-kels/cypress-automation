class CheckoutPage {
  get firstNameInput() {
    return cy.get('[data-test="firstName"]');
  }

  get lastNameInput() {
    return cy.get('[data-test="lastName"]');
  }

  get postalCodeInput() {
    return cy.get('[data-test="postalCode"]');
  }

  get continueButton() {
    return cy.get('[data-test="continue"]');
  }

  get finishButton() {
    return cy.get('[data-test="finish"]');
  }

  get errorMessage() {
    return cy.get('[data-test="error"]');
  }

  get confirmationHeader() {
    return cy.get(".complete-header");
  }
}

export default new CheckoutPage();
