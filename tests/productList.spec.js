import { expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { test as base } from '@playwright/test';
import { Severity } from './framework/helpers/enums';
import { CartPage } from './framework/pages/CartPage';
import { MainPage } from './framework/pages/MainPage';
import { ProductPage } from './framework/pages/ProductPage';
import { config } from './framework/config';

const test = base.extend({
  mainPage: async ({ page, context }, use) => {
    const mainPage = new MainPage(page);

    await mainPage.navigate();
    await use(mainPage);
  },
});

test.describe('Product List', () => {
  test.beforeEach(async () => {
    allure.epic('Product List');
  });

  // better use mocked data for stable results
  test('should correctly filter products in the list', async ({ mainPage }) => {
    allure.severity(Severity.Minor);

    const { page } = mainPage;
    await page.waitForLoadState('networkidle');

    await test.step('Check monitors number', async () => {
      await mainPage.applyProductsFilter('Monitors');
      await mainPage.checkProductsNumberOnPage(2);
    });

    await test.step('Check laptops number', async () => {
      await mainPage.applyProductsFilter('Laptops');
      await mainPage.checkProductsNumberOnPage(6);
    });

    await test.step('Check phones number', async () => {
      await mainPage.applyProductsFilter('Phones');
      await mainPage.checkProductsNumberOnPage(7);
    });
  });
});
