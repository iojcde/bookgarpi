import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const createPrismaClient = () => {
  return new PrismaClient().$extends(withAccelerate());
};

type ExtendedPrismaClient = ReturnType<typeof createPrismaClient>;

declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: ExtendedPrismaClient | undefined;
}

export const db = global.cachedPrisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.cachedPrisma = db;
}
