// global-setup.ts
import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
    const browser = await chromium.launch({
        "headless": false,
        "executablePath": '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        "args": [
            "--no-sandbox",
            "--no-zygote"]
    });
    const page = await browser.newPage();
   // await page.goto('https://www.amazon.com');
    await page.context().storageState({ path: 'storage-state.json' });
    await browser.close();
}
export default globalSetup;
