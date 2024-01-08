"use server";
import { launch, Page } from "puppeteer-core";
import chromium from "@sparticuz/chromium-min";
let _page: Page | null;

// Optional: If you'd like to use the legacy headless mode. "new" is the default.
chromium.setHeadlessMode = true;

// Optional: If you'd like to disable webgl, true is the default.
chromium.setGraphicsMode = false;

async function getPage() {
  if (_page) return _page;
  const browser = await launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(
      "https://garpi.vercel.app/chromium-v112.0.2-pack.tar"
    ),
    headless: chromium.headless,
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
