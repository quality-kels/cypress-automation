class CartPage {
  get badge() {
    return cy.get(".shopping_cart_badge");
  }

  get items() {
    return cy.get(".cart_item");
  }

  get checkoutButton() {
    return cy.get('[data-test="checkout"]');
  }
}

export default new CartPage();
