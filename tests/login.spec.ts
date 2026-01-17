import { test } from '../fixtures/fixtures';
import { VALID_USER } from '../config/test-data';

test('Verify login with valid credentials', async ({ app }) => {
    const { loginPage, accountPage } = app;

    await loginPage.open();
    await loginPage.performLogin(VALID_USER.email, VALID_USER.password);

    await accountPage.expectUrl(/\/account/);
    await accountPage.expectPageTitle();
});