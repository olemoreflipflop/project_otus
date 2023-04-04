import { expect } from '@playwright/test';
import { allure } from 'allure-playwright';
import { test as base } from '@playwright/test';
import { createUserData } from './framework/helpers/generators';
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

test.describe('User Sign Up', () => {
  const userData = createUserData().getData();

  test.beforeEach(async () => {
    allure.epic('User Sign Up');
  });

  // Service has no option to delete user, so test mocked.
  test('should allow me to sign up', async ({ commonPage }) => {
    allure.severity(Severity.Blocker);

    const { page } = commonPage;

    //delete for real sign up
    await commonPage.mockSuccessfullSignUp();

    await test.step('wait form submit and check alert text', async () => {
      page.on('dialog', async (dialog) => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('Sign up successful.');
        await dialog.dismiss();
      });
    });

    await test.step('fill the form and submit', async () => {
      await commonPage.signUp(userData.userName, userData.password);
      await page.waitForTimeout(100);
    });

    await test.step('check sign up form closed', async () => {
      expect(await page.locator(commonPage.signUpModal.modal)).toBeHidden();
    });
  });

  test('should not allow me to sign up if userName exists', async ({ commonPage }) => {
    allure.severity(Severity.Blocker);

    const { page } = commonPage;

    await test.step('wait form submit and check alert', async () => {
      page.on('dialog', async (dialog) => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('This user already exist.');
        await dialog.dismiss();
      });
    });

    await test.step('fill the form and submit', async () => {
      await commonPage.signUp(userName, userData.password);
    });
  });

  test('should not allow to sign up if login&pass are empty', async ({ commonPage }) => {
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
      await commonPage.signUp('', '');
    });
  });

  test('should not allow to sign up if login are empty', async ({ commonPage }) => {
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
      await commonPage.signUp('', userData.password);
    });
  });

  test('should not allow to sign up if password are empty', async ({ commonPage }) => {
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
      await commonPage.signUp(userData.userName, '');
    });
  });
});
