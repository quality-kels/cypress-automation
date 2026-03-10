class LoginPage {
    // Selectors
    get usernameInput() {
      return cy.get('[data-test="username"]')
    }
  
    get passwordInput() {
      return cy.get('[data-test="password"]')
    }
  
    get loginButton() {
      return cy.get('[data-test="login-button"]')
    }
  
    get errorMessage() {
      return cy.get('[data-test="error"]')
    }
  
    // Actions
    visit() {
      cy.visit('/')
    }
  
    login(username, password) {
      this.usernameInput.type(username)
      this.passwordInput.type(password)
      this.loginButton.click()
    }

    clearLogin() {
        this.usernameInput.clear()
        this.passwordInput.clear()
    }
  }
  
  export default new LoginPage()