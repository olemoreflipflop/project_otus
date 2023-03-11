import { config } from '../config';
import { LogInModal } from '../elements/LogInModal';
import { SignUpModal } from '../elements/SignUpModal';
const { baseUrl } = config;

export class CommonPage {
  logInNavLink = '#login2';
  signUpNavLink = '#signin2';
  logOutNavLink = '#logout2';
  userNavLink = '#nameofuser';
  aboutUsNavLink = '[data-target="#videoModal"]';
  contactNavLink = '[data-target="#exampleModal"]';
  logoNavLink = '#nava';
  footer = '#footc';

  constructor(page) {
    this.page = page;
    this.logInModal = new LogInModal(page);
    this.signUpModal = new SignUpModal(page);
  }

  async navigate() {
    await this.page.goto(`${baseUrl}`);
  }

  async openLogInModal() {
    await this.page.click(this.logInNavLink);
  }

  async openSignUpModal() {
    await this.page.click(this.signUpNavLink);
  }

  async openAboutUsModal() {
    await this.page.click(this.aboutUsNavLink);
  }

  async openContactModal() {
    await this.page.click(this.contactNavLink);
  }

  async clickOnLogo() {
    await this.page.click(this.logoNavLink);
  }

  async logIn(userName, password) {
    await this.openLogInModal();
    await this.logInModal.fillLogInModal(userName, password);
    await this.logInModal.submitLogInModal();
  }

  async signUp(userName, password) {
    await this.openSignUpModal();
    await this.signUpModal.fillSignUpModal(userName, password);
    await this.signUpModal.submitSignUpModal();
  }

  async mockSuccessfullSignUp() {
    await this.page.route(/\/signup/, async (route) => {
      await route.fulfill({
        status: 200,
        body: '',
      });
    });
  }
}
