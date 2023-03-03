export class SignUpModal {
    constructor(page) {
        this.page = page;
        this.modal = '#signInModal';
        this.userName = '#sign-username';
        this.password = '#sign-password';
    };

    async fillSignUpModal(userName, password) {
        await this.page.fill(this.userName, userName)
        await this.page.fill(this.password, password)
    };

    async submitSignUpForm() {
        await this.page.locator(this.modal).locator(`button:text-is("Sign up")`).click();
    };

    async closeSignUpForm() {
        await this.page.locator(this.modal).locator(`button:text-is("Close")`).click();
    };
}