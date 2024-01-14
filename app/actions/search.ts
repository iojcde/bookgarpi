"use server";

import { db } from "@/lib/db";

export const searchGarpi = async (query: string) => {
  const garpis = await db.garpi.findMany({
    where: {
      OR: [
        {
          title: {
            search: query + ":*",
          },
        },
        {
          desc: {
            search: query + ":*",
          },
        },
        {
          content: {
            search: query + ":*",
          },
        },
        {
          url: {
            search: query + ":*",
          },
        },
      ],
    },
  });
  return garpis;
};
