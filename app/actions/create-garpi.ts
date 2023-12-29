"use server";

import { db } from "@/lib/db";
import { getSession } from "next-auth/react";
import { getMetadata } from "./get-metadata";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const createGarpi = async (url: string) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    console.error("No session found");
    return null;
  }

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
      favicon: metadata.favicon,
    },
  });
};
