"use server";

import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const deleteGarpi = async (id: string) => {
  const session = await getServerSession();

  if (!session) {
    return null;
  }

  revalidatePath("/");
  return await db.garpi.delete({
    where: {
      id,
      userId: session.user.id,
    },
  });
};
