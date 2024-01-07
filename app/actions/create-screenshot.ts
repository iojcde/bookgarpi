"use server";

import { getServerSession } from "next-auth";

export const createScreenshot = async (url: string, garpiID: string) => {
  console.log("im creating a screenshot");
  const session = await getServerSession();
  if (!session) {
    throw new Error("No session found");
  }
 
  fetch(`https://garpi.vercel.app/api/screenshot`, {
    method: "POST",
    headers: { authorization: process.env.SCREENSHOT_SECRET as string },
    body: JSON.stringify({ url }),
  });
};
