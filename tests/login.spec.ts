import { test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { AccountPage } from '../pages/account.page';
import { VALID_USER } from '../config/test-data';


  test('Verify login with valid credentials', async({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.performLogin(VALID_USER.email, VALID_USER.password);
    
    const accountPage = new AccountPage(page);

    await accountPage.expectUrl(/\/account/);
    await accountPage.expectPageTitle();
});


