export class PlaceOrderModal {
  modal = '#orderModal';
  name = '#name';
  country = '#country';
  city = '#city';
  creditCard = '#card';
  month = '#month';
  year = 'year';

  constructor(page) {
    this.page = page;
  }

  async fillOrderModal(name, creditCard, _country, _city, _month, _year) {
    await this.page.fill(this.name, name);
    await this.page.fill(this.creditCard, creditCard);
    if (_country) {
      await this.page.fill(this.country, country);
    }
    if (_city) {
      await this.page.fill(this.city, city);
    }
    if (_month) {
      await this.page.fill(this.month, month);
    }
    if (_year) {
      await this.page.fill(this.year, year);
    }
  }

  async submitPlaceOrderModal() {
    await this.page.locator(this.modal).locator(`button:text-is("Purchase")`).click();
  }

  async closePlaceOrderModal() {
    await this.page.locator(this.modal).locator(`button:text-is("Close")`).click();
  }
}
