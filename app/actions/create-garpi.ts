"use server";

import { db } from "@/lib/db";
import { getSession } from "next-auth/react";
import { getMetadata } from "./get-metadata";

export const createGarpi = async (url: string) => {
  const session = await getSession();

  try {
    new URL(url as string);
  } catch (e) {
    return null;
  }
  const metadata = await getMetadata(url);

  return await db.garpi.create({
    data: {
      userId: session?.user.id,
      url,
      title: metadata.title || url,
      desc: metadata.desc,
      origin: "Created from Bookgarpi web UI",
    },
  });
};
