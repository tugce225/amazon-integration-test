import { test, expect, Page } from '@playwright/test';

test.describe.configure({ mode: 'serial' });
let page: Page;

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
});

test.afterAll(async () => {
    await page.close();
});

test.describe('Product list integration test on amazon.com', () => {
    test('Hamburger menu should contains some menu items', async () => {
        await page.goto('https://www.amazon.com');
        await page.locator('#nav-hamburger-menu').click();

        const menuContainer = await page.locator('#hmenu-content');
        await expect(menuContainer).toBeVisible();

        const liItemCount: number = await menuContainer.locator('ul[data-menu-id="1"] li').count();
        expect(liItemCount).toBeGreaterThan(0);

        const navItem = await menuContainer.locator('a', { hasText: 'Electronics'}).first();
        await expect(navItem).toBeVisible();

        const menuId:string = await navItem.getAttribute('data-menu-id');
        await navItem.click();

        const subMenu = await menuContainer.locator('ul[data-menu-id="' + menuId + '"]');
        await expect(subMenu).toBeVisible();
        await subMenu.locator('a', {hasText: 'Accessories & Supplies'}).click();
    });

    test('Product list should contains some product card items', async () =>{
        const productSlot = await page.locator('.s-main-slot');
        await productSlot.waitFor();
        await expect(productSlot).toBeVisible();

        const products = await productSlot.locator('div[data-index]');
        const productsCount: number = await products.count();
        expect(productsCount).toBeGreaterThan(1);

        const selectedProduct = await products.nth(1);
        await expect(selectedProduct).toBeVisible();
        await expect(await selectedProduct.locator('h2').count()).toBeGreaterThan(0);
        await expect(await selectedProduct.locator('img').count()).toBeGreaterThan(0);
        await selectedProduct.locator('a').first().click();
    });

    test('Product detail page should have title and image elements', async () =>{
        const productTitle = await page.locator('#productTitle');
        await expect(productTitle).toBeVisible();
        const titleText: string = await productTitle.innerText();
        expect(titleText.length).toBeGreaterThan(0);
        const productImage = await page.locator('#imgTagWrapperId');
        await expect(productImage).toBeVisible();
    });
});


