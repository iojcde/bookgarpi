"use server";
import { JSDOM } from "jsdom";

export const getMetadata = async (url: string) => {
  let data: { favicon?: string; title?: string; desc?: string } = {};
  const html = await fetch(url);

  const dom = new JSDOM(await html.text());

  const document = dom.window.document;
  const faviconEl = document.querySelector("link[rel=icon]") as HTMLLinkElement;
  if (faviconEl) {
    if (faviconEl.href.startsWith("/")) {
      data.favicon = new URL(faviconEl.href, url).toString();
    } else {
      data.favicon = faviconEl.href;
    }
  } else {
    const favicon = await fetch(new URL("/favicon.ico", url).toString());
    if (favicon.ok) {
      if (favicon.url.startsWith("/")) {
        data.favicon = new URL(favicon.url, url).toString();
      } else {
        data.favicon = favicon.url;
      }
    }
  }

  const title = document.querySelector("title");
  if (title && title.textContent) {
    data.title = title.textContent;
  } else {
    const metaTitle = document.querySelector('meta[name="title"]');
    data.title = metaTitle?.getAttribute("content") ?? undefined;
  }

  const metaDescription = document.querySelector('meta[name="description"]');

  data.desc = metaDescription?.getAttribute("content") ?? undefined;

  return data;
};
