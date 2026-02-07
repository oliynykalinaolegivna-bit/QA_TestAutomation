import { test } from '../fixtures/fixtures';
import { HomePage } from '../pages/home.page';
import { SortOrder } from '../enums';

const sortingTestCases = [
    { sortOption: 'Name (A - Z)', order: SortOrder.Asc, testName: 'ascending' },
    { sortOption: 'Name (Z - A)', order: SortOrder.Desc, testName: 'descending' },
];

sortingTestCases.forEach(({ sortOption, order, testName }) => {
    test(`Verify user can sort products by name ${testName}`, { tag: '@regression' }, async ({ page }) => {
        const homePage = new HomePage(page);

        // Step 1: Open homepage
        await homePage.open();
        await homePage.waitForProductsToLoad();

        // Step 2: Select sorting option
        await homePage.selectSortOption(sortOption);

        // Assert: Verify all displayed products are sorted by name
        await homePage.expectProductsSortedByName(order);
    });
});

// Test 4 & 5: Verify user can perform sorting by price (asc & desc)
const priceSortingTestCases = [
    { sortOption: 'Price (Low - High)', order: SortOrder.Asc, testName: 'ascending' },
    { sortOption: 'Price (High - Low)', order: SortOrder.Desc, testName: 'descending' },
];

priceSortingTestCases.forEach(({ sortOption, order, testName }) => {
    test(`Verify user can sort products by price ${testName}`, { tag: '@regression' }, async ({ page }) => {
        const homePage = new HomePage(page);

        // Step 1: Open homepage
        await homePage.open();
        await homePage.waitForProductsToLoad();

        // Step 2: Select sorting option
        await homePage.selectSortOption(sortOption);

        // Assert: Verify all displayed products are sorted by price
        await homePage.expectProductsSortedByPrice(order);
    });
});

// Test 6: Verify user can filter products by category
test('Verify user can filter products by category', { tag: '@regression' }, async ({ page }) => {
    const homePage = new HomePage(page);

    // Step 1: Open homepage
    await homePage.open();
    await homePage.waitForProductsToLoad();

    // Step 2: Select Sander in the category list
    await homePage.selectCategory('Sander');

    // Assert: Verify the displayed products contain Sander in their names
    await homePage.expectAllProductsContain('Sander');
});
