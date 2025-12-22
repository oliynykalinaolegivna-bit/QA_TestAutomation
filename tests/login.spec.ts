import { test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { AccountPage } from '../pages/account.page';


  test('Verify login with valid credentials', async({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.performLogin('customer@practicesoftwaretesting.com', 'welcome01');
    // await page.locator('[data-test="email"]').fill('customer@practicesoftwaretesting.com');
    // await page.locator('[data-test="password"]').fill('welcome01');
    // await page.locator('[data-test="login-submit"]').click();

    const accountPage = new AccountPage(page);

    await accountPage.expectUrl();
    await accountPage.waitForPageLoad();
    await accountPage.expectPageTitle();
});


