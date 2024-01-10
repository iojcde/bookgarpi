"use server";
import { connect, Page } from "puppeteer-core";
let _page: Page | null;

async function getPage() {
  if (_page) return _page;
  const browser = await connect({
    browserWSEndpoint: `wss://chrome.browserless.io?token=${process.env.BROWSERLESS_TOKEN}`,
  });
  _page = await browser.newPage();
  return _page;
}

export async function getScreenshot(url: string) {
  const page = await getPage();
  await page.goto(url, { waitUntil: "domcontentloaded" });

  const file = await page.screenshot({
    fullPage: true,
  });
  return file;
}
