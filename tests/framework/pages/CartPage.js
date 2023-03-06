import { config } from '../config';
import { PlaceOrderModal } from '../elements/PlaceOrderModal';
const { baseUrl } = config;

export class CartPage {
  constructor(page) {
    this.page = page;
    this.placeOrderModal = new PlaceOrderModal(page);
  }

  async navigate() {
    await this.page.goto(`${baseUrl}/cart.html`);
  }

  async deleteProductByName(productName) {
    await this.page.locator(`tr:has-text("${productName}")`).locator(`a:text-is("Delete")`).click();
  }

  async deleteProductByIndex(index) {
    await this.page.locator('tr.success').nth(index).locator(`a:text-is("Delete")`).click();
  }

  async openPlaceOrderModal() {
    await this.page.locator('button:text-is("Place Order")').click();
  }
}
