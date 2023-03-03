import { expect } from '@playwright/test';
import { allure } from "allure-playwright";
import config from "./framework/config";
import Severity from "./framework/helpers/enums";
import test from './framework/fixtures/baseFixture';
import SignUpModal from './framework/elements/SignUpModal';
import { createUserData } from "./framework/helpers/generators"

const { userName, password } = config;

test.describe('User Sign Up', () => {

  let logInModal, signUpModal, userData;

  test.beforeEach(async ({ basePage }) => {
    allure.epic("User Sign Up");
    userData = createUserData().getData();

    await basePage.openSignUpModal();
    signUpModal = new SignUpModal(basePage.page);
  });

  // Service has no option to delete user, so test skipped. 
  test.skip('should allow me to sign up', async ({ basePage }) => {
    allure.severity(Severity.Blocker);

    const { page } = basePage;

    await test.step('fill the form and submit', async () => {
      await signUpModal.fillSignUpModal(userData.userName, userData.password);
      await signUpModal.submitSignUpForm();
    });

    await test.step('check succesfull sign up by logging in', async () => {
      await logInModal.fillLogInModal(userData.userName, userData.password);
      await logInModal.submitLogInForm();
      await expect(page.locator(basePage.userNavLink)).toHaveText(`Welcome ${userData.userName}`);
      await expect(page.locator(basePage.logInNavLink)).toBeHidden();
    });
  });

  test('should not allow me to sign up if userName exists', async ({ basePage }) => {
    allure.severity(Severity.Blocker);

    const { page } = basePage;

    await test.step('wait form submit and check alert', async () => {
      page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('This user already exist.')
        await dialog.dismiss();
      });
    });

    await test.step('fill the form and submit', async () => {
      await signUpModal.fillSignUpModal(userName, userData.password);
      await signUpModal.submitSignUpForm();
    });
  });
});
