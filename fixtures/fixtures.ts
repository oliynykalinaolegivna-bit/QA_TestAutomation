import { test as base } from '@playwright/test';
import { App } from '../pages/app';
import { API_BASE_URL, VALID_USER } from '../config/test-data';

type AppFixtures = {
    app: App;
    loggedInApp: App;
};

export const test = base.extend<AppFixtures>({
    app: async ({ page }, use) => {
        const app = new App(page);
        await use(app);
    },

    loggedInApp: async ({ page, request }, use) => {
        const response = await request.post(`${API_BASE_URL}/users/login`, {
            data: {
                email: VALID_USER.email,
                password: VALID_USER.password
            }
        });

        const jsonData = await response.json();
        const token = jsonData.access_token;

        await page.goto('/');
        await page.evaluate((token) => {
            localStorage.setItem('auth-token', token);
        }, token);

        await page.reload();

        const app = new App(page);
        await use(app);
    },
});

export { expect } from '@playwright/test';