import config from "../config";
const { baseUrl } = config;

export class BasePage {
    constructor(page) {
        this.page = page;
        this.logInNavLink = '#login2';
        this.signUpNavLink = '#signin2';
        this.logOutNavLink = '#logout2';
        this.userNavLink = '#nameofuser';
        this.aboutUsNavLink = '[data-target="#videoModal"]';
        this.contactNavLink = '[data-target="#exampleModal"]';
        this.logoNavLink = '#nava';
    }

    async navigate() {
        await this.page.goto(`${baseUrl}`);
    };

    async openLogInForm() {
        await this.page.click(this.logInNavLink);
    };

    async openSignUpModal() {
        await this.page.click(this.signUpNavLink);
    };

    async openAboutUsModal() {
        await this.page.click(this.aboutUsNavLink);
    };

    async openContactModal() {
        await this.page.click(this.contactNavLink);
    };

    async clickOnLogo() {
        await this.page.click(this.logoNavLink);
    };

}