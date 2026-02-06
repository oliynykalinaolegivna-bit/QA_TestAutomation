import { test } from '@playwright/test';
import { API_BASE_URL, VALID_USER } from '../config/test-data';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

test('Perform API login and save auth state', { tag: ['@smoke', '@regression'] }, async ({ page, request }) => {
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

    await page.context().storageState({ path: authFile });
});


