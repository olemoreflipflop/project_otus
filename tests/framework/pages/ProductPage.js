import { config } from '../config';
const { baseUrl } = config;

export class ProductPage {
  constructor(page) {
    this.page = page;
    this.addToCartButton = 'a:has-text("Add to cart")';
  }

  async navigate(productId) {
    await this.page.goto(`${baseUrl}/prod.html?idp_=${productId}`);
    return this.page;
  }

  async addProductToCart() {
    await this.page.locator(this.addToCartButton).click();
    return this.page;
  }
}
