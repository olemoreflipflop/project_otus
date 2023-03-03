export class LogInModal {
    constructor(page) {
        this.page = page;
        this.modal = '#logInModal';
        this.userName = '#loginusername';
        this.password = '#loginpassword';
    };

    async fillLogInModal(userName, password) {
        await this.page.fill(this.userName, userName)
        await this.page.fill(this.password, password)
    };

    async submitLogInForm() {
        await this.page.locator(this.modal).locator(`button:text-is("Log in")`).click();
    };

    async closeLogInForm() {
        await this.page.locator(this.modal).locator(`button:text-is("Close")`).click();
    };
}