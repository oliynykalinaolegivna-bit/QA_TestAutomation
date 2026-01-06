import { Page, expect } from "@playwright/test";
import { BasePage } from './base.page';

export enum Category {
    HandTools = 'Hand Tools',
    PowerTools = 'Power Tools',
    Other = 'Other'
}

export enum SortOrder {
    Asc = 'asc',
    Desc = 'desc'
}

export class HomePage extends BasePage {
    readonly sortDropdown = this.page.getByTestId('sort');
    readonly productCards = this.page.locator('.card');
    readonly productNames = this.page.getByTestId('product-name');
    readonly productPrices = this.page.getByTestId('product-price');
    readonly categoryCheckboxes = this.page.locator('.checkbox');

    constructor (page: Page) {
        super(page, '/');
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
            response => response.url().includes('/products') && response.status() === 200
        );
        await this.sortDropdown.selectOption({ label: option });
        await responsePromise;
        await this.waitForProductsToLoad();
    }

    async waitForProductsToLoad() {
        await this.productCards.first().waitFor({ state: 'visible' });
        await this.page.waitForLoadState('networkidle');
    }

    async getAllProductNames(): Promise<string[]> {
        await this.waitForProductsToLoad();
        const names = await this.productNames.allTextContents();
        return names.map(name => name.trim());
    }

    async expectProductsSortedByName(order: SortOrder) {
        const productNames = await this.getAllProductNames();
        const sortedNames = [...productNames].sort((a, b) => {
            return order === SortOrder.Asc
                ? a.localeCompare(b)
                : b.localeCompare(a);
        });
        expect(productNames).toEqual(sortedNames);
    }

    async getAllProductPrices(): Promise<number[]> {
        await this.waitForProductsToLoad();
        const priceTexts = await this.productPrices.allTextContents();
        return priceTexts.map(price => parseFloat(price.replace('$', '').trim()));
    }

    async expectProductsSortedByPrice(order: SortOrder) {
        const productPrices = await this.getAllProductPrices();
        const sortedPrices = [...productPrices].sort((a, b) => {
            return order === SortOrder.Asc ? a - b : b - a;
        });
        expect(productPrices).toEqual(sortedPrices);
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
        const productNames = await this.getAllProductNames();
        for (const name of productNames) {
            expect(name.toLowerCase()).toContain(text.toLowerCase());
        }
    }
}