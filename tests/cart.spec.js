import { expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { test as base } from '@playwright/test';
import { Severity } from './framework/helpers/enums';
import { CartPage } from './framework/pages/CartPage';
import { MainPage } from './framework/pages/MainPage';
import { ProductPage } from './framework/pages/ProductPage';
import { createOrderInfo } from './framework/helpers/generators';
import { CommonPage } from './framework/pages/CommonPage';
import { config } from './framework/config';

const { userName, password } = config;

const test = base.extend({
  mainPage: async ({ page, context }, use) => {
    const mainPage = new MainPage(page);
    await mainPage.navigate();
    await use(mainPage);
  },
  commonPage: async ({ page }, use) => {
    const commonPage = new CommonPage(page);
    await use(commonPage);
  },
});

test.describe('Product Cart', () => {
  const orderInfo = createOrderInfo().getData();

  test.beforeEach(async () => {
    allure.epic('Product Cart');
  });

  //flaky one - sometimes fails and do not add product. (site bug)
  test.fixme('should allow me to add product to cart', async ({ mainPage }) => {
    allure.severity(Severity.Critical);
    const { page } = mainPage;
    const productPage = new ProductPage(page);

    await test.step('find product and open product page', async () => {
      let productTitle = await mainPage.findProductByName('MacBook Air');
      await productTitle.locator('a').click();
    });

    await test.step('add product to cart', async () => {
      page.on('dialog', async (dialog) => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('Product added');
        await dialog.dismiss();
      });
      await expect(page.locator(productPage.addToCartButton)).toBeVisible();
      await productPage.addProductToCart();
    });

    await test.step('go to cart page', async () => {
      await page.locator('.nav-link:has-text("Cart")').click();
    });

    await test.step('check product is added to cart', async () => {
      await page.waitForSelector('#tbodyid');
      await expect(page.locator(`tr:has-text('MacBook Air')`)).toBeVisible();
    });
  });

  test('should allow me to add and delete product to/from cart', async ({ mainPage }) => {
    allure.severity(Severity.Critical);

    const { page } = mainPage;
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await test.step('preparation - add product to cart', async () => {
      await productPage.navigate(1);
      await productPage.addProductToCart();
    });

    await test.step('go to cart page and delete product', async () => {
      await cartPage.navigate();
      await page.waitForSelector('#tbodyid');
      await cartPage.deleteProductByIndex(0);
    });

    await test.step('Check product is deleted from cart', async () => {
      await expect(page.locator('#tbodyid').locator('tr.success')).toBeHidden();
    });
  });

  test('should show correct total price', async ({ mainPage }) => {
    allure.severity(Severity.Critical);

    const { page } = mainPage;
    const cartPage = new CartPage(page);
    const productPage = new ProductPage(page);
    let price;

    await test.step('preparation - add product to times to cart', async () => {
      await productPage.navigate(1);
      await productPage.addProductToCart();
      await productPage.addProductToCart();
    });

    await test.step('go to cart page', async () => {
      await cartPage.navigate();
      await page.waitForSelector('#tbodyid');
    });

    await test.step('Check products total price in cart', async () => {
      price = await page.evaluate(() => document.querySelector('tr.success > td:nth-child(3)').innerText);
      const total = await page.evaluate(() => document.querySelector('#totalp').innerText);
      expect(Number(total)).toEqual(Number(price) * 2);
    });
  });

  test('should allow to order with Name and Card (!logged in)', async ({ mainPage }) => {
    allure.severity(Severity.Critical);

    const { page } = mainPage;
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    let total;

    await test.step('preparation - add product to cart', async () => {
      await productPage.navigate(1);
      await page.waitForSelector('#myTabContent');
      await productPage.addProductToCart();
    });

    await test.step('go to cart page and click place order', async () => {
      await page.locator('.nav-link:has-text("Cart")').click();
      await page.waitForSelector('#tbodyid');
      total = await page.evaluate(() => document.querySelector('#totalp').innerText);
      await cartPage.openPlaceOrderModal();
    });

    await test.step('Fill required fields', async () => {
      await cartPage.placeOrderModal.fillOrderModal(orderInfo.name, orderInfo.creditCard);
      await cartPage.placeOrderModal.submitPlaceOrderModal();
    });

    await test.step('Check success order info', async () => {
      await expect(page.locator('div.sweet-alert')).toBeVisible();
      await expect(page.locator('div.sweet-alert').locator('h2')).toHaveText('Thank you for your purchase!');
      await expect(page.locator('div.sweet-alert > p.lead')).toContainText(`Amount: ${total} USD`);
    });
  });

  test('should allow to order with Name and Card (logged in)', async ({ mainPage, commonPage }) => {
    allure.severity(Severity.Critical);

    const { page } = mainPage;
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    let total;

    await test.step('log in', async () => {
      await commonPage.logIn(userName, password);
    });

    await test.step('preparation - add product to times to cart', async () => {
      await productPage.navigate(1);
      await page.waitForSelector('#myTabContent');
      await productPage.addProductToCart();
    });

    await test.step('go to cart page and click place order', async () => {
      await page.locator('.nav-link:has-text("Cart")').click();
      await page.waitForSelector('#tbodyid');
      total = await page.evaluate(() => document.querySelector('#totalp').innerText);
      await cartPage.openPlaceOrderModal();
    });

    await test.step('Fill required fields', async () => {
      await cartPage.placeOrderModal.fillOrderModal(orderInfo.name, orderInfo.creditCard);
      await cartPage.placeOrderModal.submitPlaceOrderModal();
    });

    await test.step('Fill required fields', async () => {
      await expect(page.locator('div.sweet-alert')).toBeVisible();
      await expect(page.locator('div.sweet-alert').locator('h2')).toHaveText('Thank you for your purchase!');
      await expect(page.locator('div.sweet-alert > p.lead')).toContainText(`Amount: ${total} USD`);
    });
  });
});
