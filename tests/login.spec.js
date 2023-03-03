import { expect } from '@playwright/test';
import test from './framework/fixtures/baseFixture';
import { LogInModal } from './framework/elements/LogInModal';
import { allure } from "allure-playwright";
import config from "./framework/config";
import { Severity } from "./framework/helpers/enums";

const { userName, password } = config;
let logInModal;

test.describe('User Log in', () => {

  test.beforeEach(async ({ basePage }) => {
    allure.epic("User Log in");

    await basePage.openLogInForm();
    logInModal = new LogInModal(basePage.page);
  });

  test('should allow me to log in', async ({ basePage }) => {
    allure.severity(Severity.Blocker);

    const { page } = basePage;

    await test.step('fill the form and submit', async () => {
      await logInModal.fillLogInModal(userName, password);
      await logInModal.submitLogInForm();
      await page.waitForSelector(basePage.userNavLink);
    });

    await test.step('check succesfull login', async () => {
      await expect(page.locator(basePage.userNavLink)).toHaveText(`Welcome ${userName}`);
      await expect(page.locator(basePage.logInNavLink)).toBeHidden();
    });
  });

  test('should not log in if form is not submitted', async ({ basePage }) => {
    allure.severity(Severity.Normal);
    const { page } = basePage;

    await test.step('fill the form and close it', async () => {
      await logInModal.fillLogInModal(userName, password);
      await logInModal.closeLogInForm();
    });

    await test.step('check user is not logged in', async () => {
      await expect(page.locator(logInModal.modal)).toBeHidden();
      await expect(page.locator(basePage.logOutNavLink)).toBeHidden();
      await expect(page.locator(basePage.logInNavLink)).toBeVisible();
    });
  });

  test('should not allow to log in if password is incorrect', async ({ basePage }) => {
    allure.severity(Severity.Blocker);
    const { page } = basePage;
  
    await test.step('wait form submit and check alert', async () => {
      page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('Wrong password.');
        await dialog.dismiss();
      });
    });

    await test.step('fill the form and submit', async () => {
      await logInModal.fillLogInModal(userName, "password");
      await logInModal.submitLogInForm();
    });

    await test.step('check that user is not logged in', async () => {
      await expect(page.locator(basePage.logOutNavLink)).toBeHidden();
      await expect(page.locator(basePage.logInNavLink)).toBeVisible();
    });
  });

  test('should not allow to log in if login is incorrect', async ({ basePage }) => {
    allure.severity(Severity.Blocker);
    const { page } = basePage;
  
    await test.step('wait form submit and check alert', async () => {
      page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('User does not exist.');
        await dialog.dismiss();
      });
    });

    await test.step('fill the form and submit', async () => {
      await logInModal.fillLogInModal("login_NNN", password);
      await logInModal.submitLogInForm();
    });

    await test.step('check that user is not logged in', async () => {
      await expect(page.locator(basePage.logOutNavLink)).toBeHidden();
      await expect(page.locator(basePage.logInNavLink)).toBeVisible();
    });
  });

  test('should not allow to log in if login/pass are empty', async ({ basePage }) => {
    allure.severity(Severity.Blocker);
    const { page } = basePage;
  
    await test.step('wait form submit and check alert', async () => {
      page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('Please fill out Username and Password.');
        await dialog.dismiss();
      });
    });

    await test.step('fill the form and submit', async () => {
      await logInModal.fillLogInModal("", "");
      await logInModal.submitLogInForm();
    });

    await test.step('check that user is not logged in', async () => {
      await expect(page.locator(basePage.logOutNavLink)).toBeHidden();
      await expect(page.locator(basePage.logInNavLink)).toBeVisible();
    });
  });
});
