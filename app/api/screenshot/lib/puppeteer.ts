"use server";
import { launch, Page } from "puppeteer-core";
import chromium from "@sparticuz/chromium-min";
let _page: Page | null;

async function getPage() {
  if (_page) return _page;
  const browser = await launch({
    args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
    defaultViewport: chromium.defaultViewport,

    executablePath: await chromium.executablePath(
      "https://github.com/Sparticuz/chromium/releases/download/v112.0.2/chromium-v112.0.2-pack.tar"
    ),
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
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
