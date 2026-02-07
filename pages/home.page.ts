import { Page, expect } from "@playwright/test";
import { BasePage } from './base.page';
import { SortOrder } from '../enums';

export class HomePage extends BasePage {
    readonly sortDropdown = this.page.getByTestId('sort');
    readonly productCards = this.page.locator('.card');
    readonly productNames = this.page.getByTestId('product-name');
    readonly productPrices = this.page.getByTestId('product-price');
    readonly categoryCheckboxes = this.page.locator('.checkbox');

    constructor (page: Page) {
        super(page, '/');
    }

    async open() {
        const responsePromise = this.page.waitForResponse(
            response => response.url().includes('/products') && response.status() === 200
        );
        await this.page.goto(this.path);
        await responsePromise;
        await this.waitForProductsToLoad();
    }

    async clickProductByName(productName: string) {
        await this.page
            .locator('a.card')
            .filter({ hasText: productName })
            .first()
            .click();
    }

    async selectSortOption(option: string) {
        const responsePromise = this.page.waitForResponse(
            response => response.url().includes('/products') && response.url().includes('sort=') && response.status() === 200
        );
        await this.sortDropdown.selectOption({ label: option });
        await responsePromise;
        await this.waitForProductsToLoad();
    }

    async waitForProductsToLoad() {
        await this.productCards.first().waitFor({ state: 'visible' });
    }

    async getAllProductNames(): Promise<string[]> {
        await this.waitForProductsToLoad();
        const names = await this.productNames.allTextContents();
        return names.map(name => name.trim());
    }

    async expectProductsSortedByName(order: SortOrder) {
        await expect(async () => {
            const productNames = await this.getAllProductNames();
            const sortedNames = [...productNames].sort((a, b) => {
                return order === SortOrder.Asc
                    ? a.localeCompare(b)
                    : b.localeCompare(a);
            });
            expect(productNames).toEqual(sortedNames);
        }).toPass();
    }

    async getAllProductPrices(): Promise<number[]> {
        await this.waitForProductsToLoad();
        const priceTexts = await this.productPrices.allTextContents();
        return priceTexts.map(price => parseFloat(price.replace('$', '').trim()));
    }

    async expectProductsSortedByPrice(order: SortOrder) {
        await expect(async () => {
            const productPrices = await this.getAllProductPrices();
            const sortedPrices = [...productPrices].sort((a, b) => {
                return order === SortOrder.Asc ? a - b : b - a;
            });
            expect(productPrices).toEqual(sortedPrices);
        }).toPass();
    }

    async selectCategory(categoryName: string) {
        const responsePromise = this.page.waitForResponse(
            response => response.url().includes('/products') && response.status() === 200
        );
        await this.page.getByLabel(categoryName).check();
        await responsePromise;
        await this.waitForProductsToLoad();
    }

    async expectAllProductsContain(text: string) {
        await expect(async () => {
            const productNames = await this.getAllProductNames();
            for (const name of productNames) {
                expect(name.toLowerCase()).toContain(text.toLowerCase());
            }
        }).toPass();
    }

    async getFirstProductInfo(): Promise<{ name: string; price: string }> {
        await this.waitForProductsToLoad();
        const name = await this.productNames.first().textContent() || '';
        const priceText = await this.productPrices.first().textContent() || '';
        return {
            name: name.trim(),
            price: priceText.trim()
        };
    }

    async addFirstProductToCart() {
        await this.waitForProductsToLoad();
        await this.productCards.first().click();
    }
}