export class SignUpModal {
  modal = '#signInModal';
  userName = '#sign-username';
  password = '#sign-password';

  constructor(page) {
    this.page = page;
  }

  async fillSignUpModal(userName, password) {
    await this.page.fill(this.userName, userName);
    await this.page.fill(this.password, password);
  }

  async submitSignUpModal() {
    await this.page.locator(this.modal).locator(`button:text-is("Sign up")`).click();
  }

  async closeSignUpModal() {
    await this.page.locator(this.modal).locator(`button:text-is("Close")`).click();
  }
}
