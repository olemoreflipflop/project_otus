import config from "../config";

const { baseUrl } = config;

console.log(baseUrl);

export class BasePage {
    constructor(page) {
        this.page = page;
        this.loginNavLink = '#login2';
        this.logoutNavLink = '#logout2';
        this.userNavLink = '#nameofuser'
    }

    async navigate() {
        await this.page.goto(`${baseUrl}`)
    }

    async openLoginModal() {
        await this.page.click(this.loginNavLink)
    }

}