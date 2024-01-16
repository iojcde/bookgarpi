"use server";

import { db } from "@/lib/db";
import { getSession } from "next-auth/react";
import { getMetadata } from "./get-metadata";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; 
import { extractArticle } from "./extract-article";
import { revalidatePath } from "next/cache";
import { summarizeArticle } from "./summarize-article";
import { getTweet } from "./get-tweet";
import { createScreenshot } from "./create-screenshot";

export const createGarpi = async (url: string, type: string) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Error("No session found");
  }

  if (session.user.email !== "io@jcde.xyz") {
    return new Error("Not authorized");
  }
  if (
    (url.startsWith("https://twitter.com") && url.includes("/status/")) ||
    (url.startsWith("https://x.com") && url.includes("/status/"))
  ) {
    type = "tweet";
  }
  switch (type) {
    case "url": {
      try {
        new URL(url as string);
      } catch (e) {
        return null;
      }

      const metadata = await getMetadata(url);
      const article = await extractArticle(url);

      let summarized: string = "";

      if (!metadata.description) {
        try {
          summarized = await summarizeArticle(
            article?.content ?? (await fetch(url).then((res) => res.text()))
          );
        } catch (e) {
          console.error(e);
        }
      }
      const newGarpi = await db.garpi.create({
        data: {
          userId: session?.user.id,
          url,
          title: metadata.title || url,
          image: metadata.image,
          desc: metadata.description ?? summarized,
          content: article?.content,
          author: article?.author,
          type,
        },
      });

      await createScreenshot(url, newGarpi.id);

      return newGarpi;
    }
    case "hn": {
      const id = url.split("/").pop();

      const story = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`
      ).then((res) => res.json());

      if (!story) {
        return new Error("No such HN story found");
      }

      const metadata = await getMetadata(story.url);
      const article = await extractArticle(story.url);

      let summarized: string = "";
      if (!metadata.description) {
        try {
          summarized = await summarizeArticle(
            article?.content ?? (await fetch(url).then((res) => res.text()))
          );
        } catch (e) {
          console.error(e);
        }
      }

      const newGarpi = await db.garpi.create({
        data: {
          userId: session?.user.id,
          url: story.url,
          title: story.title,
          image: metadata.image,
          desc: metadata.description ?? summarized,
          content: article?.content,
          hnId: story.id,
          type,
        },
      });

      await createScreenshot(url, newGarpi.id);

      return newGarpi;
    }

    case "tweet": {
      const tweetId = url.split("/").pop();

      if (!tweetId) {
        return new Error("No tweet id found");
      }

      const data = await getTweet(tweetId);

      return await db.garpi.create({
        data: {
          userId: session?.user.id,
          url: url,
          title: `${data?.user.name} on Twitter`,
          image: data?.mediaDetails?.filter((m) => m.type === "photo")[0]?.url,
          desc: data?.text,
          content: data?.text,
          type,
        },
      });
    }
  }
};
