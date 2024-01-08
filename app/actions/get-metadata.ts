import { JSDOM } from "jsdom";

export async function getMetadata(url: string) {
  const response = await fetch(url);
  const html = await response.text();
  const dom = new JSDOM(html);
  const metaTags = dom.window.document.getElementsByTagName("meta");
  const images = dom.window.document.getElementsByTagName("img");

  let ogImage,
    ogTitle,
    ogDescription,
    twitterImage,
    twitterTitle,
    twitterDescription;

  const title =
    dom.window.document.getElementsByTagName("title")[0]?.textContent;

  for (let i = 0; i < metaTags.length; i++) {
    if (
      metaTags[i].getAttribute("name") === "og:image" ||
      metaTags[i].getAttribute("property") === "og:image"
    ) {
      ogImage = metaTags[i].getAttribute("content");
    }
    if (
      metaTags[i].getAttribute("name") === "og:title" ||
      metaTags[i].getAttribute("property") === "og:title"
    ) {
      ogTitle = metaTags[i].getAttribute("content");
    }
    if (
      metaTags[i].getAttribute("name") === "og:description" ||
      metaTags[i].getAttribute("property") === "og:description"
    ) {
      ogDescription = metaTags[i].getAttribute("content");
    }
    if (metaTags[i].getAttribute("name") === "twitter:image") {
      twitterImage = metaTags[i].getAttribute("content");
    }
    if (metaTags[i].getAttribute("name") === "twitter:title") {
      twitterTitle = metaTags[i].getAttribute("content");
    }
    if (metaTags[i].getAttribute("name") === "twitter:description") {
      twitterDescription = metaTags[i].getAttribute("content");
    }
  }

  let firstImage = images.length > 0 ? images[0].getAttribute("src") : null;


  let data = {
    image: twitterImage ?? ogImage ?? firstImage,
    title: title ?? twitterTitle ?? ogTitle,
    description: twitterDescription ?? ogDescription,
  };

 
  if (data.image && data.image.startsWith("/")) {
    data.image = new URL(data.image, new URL(url).hostname).toString();
  } 

  return data

  
}
