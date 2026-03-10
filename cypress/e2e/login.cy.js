import LoginPage from '../pages/LoginPage'

describe('Login', () => {
  beforeEach(() => {
    LoginPage.visit()
  })

  it('should login with valid credentials', () => {
    LoginPage.login('standard_user', 'secret_sauce')
    cy.url().should('include', '/inventory')
  })

  it('should show error with invalid password', () => {
    LoginPage.login('standard_user', 'wrong_password')
    LoginPage.errorMessage.should('be.visible')
  })

  it('should show error with invalid username', () => {
    LoginPage.login('wrong_user', 'secret_sauce')
    LoginPage.errorMessage.should('be.visible')
  })

  it('should show error with no credentials', () => {
    LoginPage.loginButton.click()
    LoginPage.errorMessage.should('be.visible')
  })

  it('should show error with locked account', () => {
    LoginPage.login('locked_out_user', 'secret_sauce')
    LoginPage.errorMessage.should('be.visible')
  })

  it('should login  with valid credentials after error', () => {
    LoginPage.login('wrong_user', 'secret_sauce')
    LoginPage.errorMessage.should('be.visible')
    LoginPage.clearLogin()
    LoginPage.login('standard_user', 'secret_sauce')
    cy.url().should('include', '/inventory')
  }) 
})