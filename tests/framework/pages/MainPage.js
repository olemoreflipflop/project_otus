import { config } from '../config';
const { baseUrl } = config;
export class MainPage {
  productsCarousel = '#contcar';
  productsList = '#tbodyid';
  productsCategories = 'list-group:has-text("Categories")';
  previousButton = '#prev2';
  nextButton = '#next2';

  constructor(page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto(`${baseUrl}/index.html`);
  }

  async findProductByName(name) {
    await this.page.waitForSelector('#tbodyid');
    let product = await this.page.locator(`.card-title:has-text("${name}")`);
    let productCheck = await product.isVisible();
    while (!productCheck) {
      await this.page.locator(this.nextButton).click();
      await this.page.waitForTimeout(500); // TODO: find how to replace this timeout
      await this.page.waitForSelector('#tbodyid');
      product = await this.page.locator(`.card-title:has-text("${name}")`);
      productCheck = await product.isVisible();
    }
    return product;
  }
}
