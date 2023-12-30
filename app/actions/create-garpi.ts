"use server";

import { db } from "@/lib/db";
import { getSession } from "next-auth/react";
import { getMetadata } from "./get-metadata";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { extract } from "@extractus/article-extractor";
import { extractArticle } from "./extract-article";
import { revalidatePath } from "next/cache";

export const createGarpi = async (url: string, type: string) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    console.error("No session found");
    return null;
  }

  switch (type) {
    case "url":
      try {
        new URL(url as string);
      } catch (e) {
        return null;
      }

      const metadata = await getMetadata(url);
      const article = await extractArticle(url);
      console.log(metadata)

      return await db.garpi.create({
        data: {
          userId: session?.user.id,
          url,
          title: metadata.title || url,
          origin: "Created from Bookgarpi web UI",
          image: metadata.image,
          desc: metadata.description,
          content: article?.content,
          author: article?.author,
          type,
        },
      });

    case "hn":
      const hnId = url.split("/").pop();

      if (!hnId) {
        return null;
      }

      const story = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${hnId}.json`
      ).then((res) => res.json());

      if (!story) {
        return null;
      }

      revalidatePath(`/`);

      return await db.garpi.create({
        data: {
          userId: session?.user.id,
          url: `https://garpi.vercel.app/hn/stories/${hnId}`,
          title: story.title,
          origin: "Created from Bookgarpi web UI",
          type,
        },
      });
  }
};
