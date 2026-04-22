import "./commands";
import "cypress-mochawesome-reporter/register";

beforeEach(() => {
  // Sauce Demo persists session in cookies, localStorage, and IndexedDB.
  // Clear all three to prevent session leaking between tests.
  cy.clearAllCookies();
  cy.clearAllLocalStorage();
  cy.clearAllSessionStorage();
  indexedDB.deleteDatabase("keyval-store");
});
