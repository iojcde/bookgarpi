"use server";
import { JSDOM } from "jsdom";

export const getMetadata = async (url: string) => {
  let data: { favicon?: string; title?: string; desc?: string } = {};
  const html = await fetch(url);

  const dom = new JSDOM(await html.text());

  const document = dom.window.document;
  const faviconEl = document.querySelector("link[rel=icon]") as HTMLLinkElement;
  if (faviconEl) {
    data.favicon = faviconEl.href;
  } else {
    const favicon = await fetch(new URL("/favicon.ico", url).toString());
    if (favicon.ok) {
      data.favicon = favicon.url;
    }
  }

  const metaTitle = document.querySelector('meta[name="title"]');
  const metaDescription = document.querySelector('meta[name="description"]');

  data.title = metaTitle?.getAttribute("content") ?? undefined;
  data.desc = metaDescription?.getAttribute("content") ?? undefined;

  return data;
};
