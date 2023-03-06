export class LogInModal {
  modal = '#logInModal';
  userName = '#loginusername';
  password = '#loginpassword';
  page;

  constructor(page) {
    this.page = page;
  }

  async fillLogInModal(userName, password) {
    await this.page.fill(this.userName, userName);
    await this.page.fill(this.password, password);
  }

  async submitLogInModal() {
    await this.page.locator(this.modal).locator(`button:text-is("Log in")`).click();
  }

  async closeLogInModal() {
    await this.page.locator(this.modal).locator(`button:text-is("Close")`).click();
  }
}
