import { expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { test as base } from '@playwright/test';
import { config } from './framework/config';
import { Severity } from './framework/helpers/enums';
import { CommonPage } from './framework/pages/CommonPage';

const { userName, password } = config;

const test = base.extend({
  commonPage: async ({ page, context }, use) => {
    const commonPage = new CommonPage(page);
    await commonPage.navigate();
    await use(commonPage);
  },
});

test.describe('User Log in', () => {
  test.beforeEach(async () => {
    allure.epic('User Log in');
  });

  test('should allow me to log in', async ({ commonPage }) => {
    allure.severity(Severity.Blocker);

    const { page } = commonPage;

    await test.step('fill the form and submit', async () => {
      await commonPage.logIn(userName, password);
    });

    await test.step('check succesfull login', async () => {
      await expect(page.locator(commonPage.userNavLink)).toHaveText(`Welcome ${userName}`);
      await expect(page.locator(commonPage.logInNavLink)).toBeHidden();
    });
  });

  test('should not log in if form is not submitted', async ({ commonPage }) => {
    allure.severity(Severity.Normal);

    const { page } = commonPage;

    await test.step('fill the form and close it', async () => {
      await commonPage.openLogInModal();
      await commonPage.logInModal.fillLogInModal(userName, password);
      await commonPage.logInModal.closeLogInModal();
    });

    await test.step('check user is not logged in', async () => {
      await expect(page.locator(commonPage.logInModal.modal)).toBeHidden();
      await expect(page.locator(commonPage.logOutNavLink)).toBeHidden();
      await expect(page.locator(commonPage.logInNavLink)).toBeVisible();
    });
  });

  test('should not allow to log in if password is incorrect', async ({ commonPage }) => {
    allure.severity(Severity.Blocker);

    const { page } = commonPage;

    await test.step('wait form submit and check alert', async () => {
      page.on('dialog', async (dialog) => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('Wrong password.');
        await dialog.dismiss();
      });
    });

    await test.step('fill the form and submit', async () => {
      await commonPage.logIn(userName, 'password');
    });

    await test.step('check that user is not logged in', async () => {
      await expect(page.locator(commonPage.logOutNavLink)).toBeHidden();
      await expect(page.locator(commonPage.logInNavLink)).toBeVisible();
    });
  });

  test('should not allow to log in if login is incorrect', async ({ commonPage }) => {
    allure.severity(Severity.Blocker);

    const { page } = commonPage;

    await test.step('wait form submit and check alert', async () => {
      page.on('dialog', async (dialog) => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('User does not exist.');
        await dialog.dismiss();
      });
    });

    await test.step('fill the form and submit', async () => {
      await commonPage.logIn('iuytrdfgh123', password);
    });

    await test.step('check that user is not logged in', async () => {
      await expect(page.locator(commonPage.logOutNavLink)).toBeHidden();
      await expect(page.locator(commonPage.logInNavLink)).toBeVisible();
    });
  });

  test('should not allow to log in if login/pass are empty', async ({ commonPage }) => {
    allure.severity(Severity.Blocker);

    const { page } = commonPage;

    await test.step('wait form submit and check alert', async () => {
      page.on('dialog', async (dialog) => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('Please fill out Username and Password.');
        await dialog.dismiss();
      });
    });

    await test.step('fill the form and submit', async () => {
      await commonPage.logIn('', '');
    });

    await test.step('check that user is not logged in', async () => {
      await expect(page.locator(commonPage.logOutNavLink)).toBeHidden();
      await expect(page.locator(commonPage.logInNavLink)).toBeVisible();
    });
  });
});
