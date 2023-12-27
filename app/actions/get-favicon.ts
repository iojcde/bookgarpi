"use server";
import { JSDOM } from "jsdom";

export const getFavicon = async (url: string, dark: boolean) => {
  const html = await fetch(url);

  const dom = new JSDOM(await html.text());

  const document = dom.window.document;
  const el = document.querySelector("link[rel=icon]") as HTMLLinkElement;
  if (el) {
    return el.href;
  } else {
    const favicon = await fetch(new URL("/favicon.ico", url).toString());
    if (favicon.ok) {
      return favicon.url;
    } else {
      return null;
    }
  }
};
