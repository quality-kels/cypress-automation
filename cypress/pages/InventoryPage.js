class InventoryPage {
  get pageTitle() {
    return cy.get(".title");
  }

  // .inventory_item is a Sauce Demo specific class
  get items() {
    return cy.get(".inventory_item");
  }

  get itemNames() {
    return cy.get(".inventory_item_name");
  }

  get itemPrices() {
    return cy.get(".inventory_item_price");
  }

  get addToCartButtons() {
    return cy.get(".btn_inventory");
  }
}

export default new InventoryPage();
