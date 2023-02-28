export class LoginModal {
    constructor(page) {
        this.page = page;
        this.modal = '#logInModal';
        this.userName = '#loginusername'
        this.password = '#loginpassword'
    }

    async fillLoginModal(login, password) {
        await this.page.fill(this.userName, login)
        await this.page.fill(this.password, password)
    }

    async clickModalButtonByLabel(label) {
        await this.page.locator(this.modal).locator(`button:text-is("${label}")`).click();
    }

}