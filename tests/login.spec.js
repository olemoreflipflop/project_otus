const { test, expect } = require('@playwright/test');
const { BasePage } = require('./framework/pages/BasePage');
const { LoginModal } = require('./framework/elements/LoginModal');
import { allure } from "allure-playwright";

import config from "./framework/config";
import { Severity } from "./framework/helpers/enums";

const { login, password } = config;

test.describe('', () => {
  let basePage, loginModal;

  test.afterEach(async ({ page }, testInfo) => {
    await page.close();
  })

  test.beforeEach(async ({ page }) => {
    allure.epic("User Log in");

    basePage = new BasePage(page);
    loginModal = new LoginModal(page);

    await basePage.navigate();
    await basePage.openLoginModal();
  });

  test.only('should allow me to log in', async ({ page }) => {
    allure.severity(Severity.Blocker);

    // test.step('Fill the form and submit', async () => {
    await loginModal.fillLoginModal(login, password);
    await loginModal.clickModalButtonByLabel('Log in');
    await page.waitForSelector(basePage.userNavLink);
    // })
    // test.step('Check that user logged in', async () => {
    await expect(page.locator(basePage.userNavLink)).toHaveText(`Welcome ${login}`);
    await expect(page.locator(basePage.loginNavLink)).toBeHidden();
    // })
  });

  test('should not log in - form not submitted', async ({ page }) => {
    await loginModal.fillLoginModal(login, password);
    await loginModal.clickModalButtonByLabel('Close.');

    await expect(page.locator(loginModal.modal)).toBeHidden();
    await expect(page.locator(basePage.logoutNavLink)).toBeHidden();
    await expect(page.locator(basePage.loginNavLink)).toBeVisible();
  });

  test('should not allow to log in - Wrong password', async ({ page }) => {
    page.on('dialog', async dialog => {
      await page.waitForTimeout(1000); //added cause can't check alert - browser closes (?)
      expect(dialog.type()).toContain('alert');
      expect(dialog.message()).toContain('Wrong password.');
    });

    await loginModal.fillLoginModal(login, "password");
    await loginModal.clickModalButtonByLabel('Log in');

    await expect(page.locator(basePage.logoutNavLink)).toBeHidden();
  });

  test('should not allow to log in - Wrong login', async ({ page }) => {
    page.on('dialog', async dialog => {
      await page.waitForTimeout(1000); //added cause can't check alert - browser closes (?)
      expect(dialog.type()).toContain('alert');
      expect(dialog.message()).toContain('User does not exist.');
      await dialog.dismiss();
    });

    await loginModal.fillLoginModal("login", password);
    await loginModal.clickModalButtonByLabel('Log in');

    await expect(page.locator(basePage.logoutNavLink)).toBeHidden();
  });

  test('should not allow to log in - Empty modal', async ({ page }) => {
    page.on('dialog', async dialog => {
      await page.waitForTimeout(1000); //added cause can't check alert - browser closes (?)
      expect(dialog.type()).toContain('alert');
      expect(dialog.message()).toContain('Please fill out Username and Password.');
      await dialog.dismiss();
    });

    await loginModal.fillLoginModal("", "");
    await loginModal.clickModalButtonByLabel('Log in');

    await expect(page.locator(basePage.logoutNavLink)).toBeHidden();
  });
});
