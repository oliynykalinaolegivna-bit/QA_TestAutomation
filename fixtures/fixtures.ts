import { test as base } from '@playwright/test';
import { App } from '../pages/app';
import { VALID_USER } from '../config/test-data';

type AppFixtures = {
    app: App;
    loggedInApp: App;
};

export const test = base.extend<AppFixtures>({
    app: async ({ page }, use) => {
        const app = new App(page);
        await use(app);
    },

    loggedInApp: async ({ app }, use) => {
        await app.loginPage.open();
        await app.loginPage.performLogin(VALID_USER.email, VALID_USER.password);
        await app.accountPage.expectUrl(/\/account/);
        await use(app);
    },
});

export { expect } from '@playwright/test';