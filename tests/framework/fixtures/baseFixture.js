import { test as base } from '@playwright/test'
import { BasePage } from '../pages/BasePage';

const test = base.extend({
    basePage: async ({ browser }, use) => {
        const context = await browser.newContext();
		const page = await context.newPage();
        const basePage = new BasePage(page);
        await basePage.navigate();
        await page.waitForLoadState();
        await use(basePage);
        await context.close();
    },
});

export default test
