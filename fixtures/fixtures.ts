import { test as base } from '@playwright/test';
import { App } from '../pages/app';
import { VALID_USER } from '../config/test-data';

// Визначаємо типи для наших фікстур з використанням дженериків
type AppFixtures = {
    app: App;
    loggedInApp: App;
};

// Розширюємо базовий test об'єкт нашими фікстурами
export const test = base.extend<AppFixtures>({
    // Фікстура app - створює App з page фікстурою
    app: async ({ page }, use) => {
        const app = new App(page);
        await use(app);
    },

    // Фікстура loggedInApp - використовує app фікстуру та виконує логін
    loggedInApp: async ({ app }, use) => {
        // Відкриваємо сторінку логіну
        await app.loginPage.open();

        // Виконуємо логін
        await app.loginPage.performLogin(VALID_USER.email, VALID_USER.password);

        // Чекаємо на перехід до account сторінки
        await app.accountPage.expectUrl(/\/account/);

        // Передаємо app далі - він вже залогінений
        await use(app);
    },
});

// Експортуємо expect для зручності
export { expect } from '@playwright/test';