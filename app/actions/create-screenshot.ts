"use server";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getServerSession } from "next-auth";

const s3 = new S3Client({
  endpoint: "s3.us-west-000.backblazeb2.com",
  region: "us-west-000",
  credentials: {
    accessKeyId: process.env.B2_KEY_ID as string,
    secretAccessKey: process.env.B2_KEY as string,
  },
});

export const createScreenshot = async (url: string, garpiID: string) => {
  console.log("im creating a screenshot");
  const session = await getServerSession();
  if (!session) {
    throw new Error("No session found");
  }

  const res = await fetch(
    `http://3.36.126.112:6942/screenshot?token=${process.env.SCREENSHOT_SECRET}&blockAds=true`,
    {
      method: "POST",
      body: JSON.stringify({
        url,
        optimizeForSpeed: true,
        options: {
          type: "png",
          quality: 100,
          fullPage: true, 
        },
      }),
    }
  );

  try {
    if (!res.ok || res.body === null) {
      throw new Error("Network response was not ok");
    }

    console.log("screenshotted!");
    await s3.send(
      new PutObjectCommand({
        Bucket: "garpi-s3",
        Key: encodeURIComponent(url) + ".png",
        Body: res.body,
      })
    );
  } catch (error) {
    console.error(error);
    return new Response(
      "The server encountered an error. You may have inputted an invalid query.",
      { status: 500 }
    );
  }
};
