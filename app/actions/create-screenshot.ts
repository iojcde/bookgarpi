"use server";

import { Upload } from "@aws-sdk/lib-storage";
import {
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getServerSession } from "next-auth";

const s3 = new S3Client({
  endpoint: "https://s3.us-west-000.backblazeb2.com",
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

  try {
    const existsData = await s3.send(
      new HeadObjectCommand({ Bucket: "garpi-s3", Key: garpiID + ".png" })
    );

    if (existsData.$metadata.httpStatusCode === 200) {
      console.log("already exists");
      return;
    }
  } catch (e) {}

  const res = await fetch(
    `${process.env.SCREENSHOT_URL}/screenshot?token=${process.env.SCREENSHOT_SECRET}`,
    {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        url,
        options: {
          type: "png",
          fullPage: true,
        },
      }),
    }
  );

  try {
    if (!res.ok || res.body === null) {
      console.error(await res.text(), res.status);
      throw new Error("Network response was not ok");
    }

    console.log("screenshotted!");
    try {
      const parallelUploads3 = new Upload({
        client: s3,
        params: {
          Bucket: "garpi-s3",
          Key: garpiID + ".png",
          Body: res.body,
        },
 
        leavePartsOnError: false, // optional manually handle dropped parts
      });

      parallelUploads3.on("httpUploadProgress", (progress) => {
        console.log(progress);
      });

      await parallelUploads3.done();
      console.log("uploaded to s3");
    } catch (e) {
      console.error(e);
    }
  } catch (error) {
    console.error(error);
    return new Response(
      "The server encountered an error. You may have inputed an invalid query.",
      { status: 500 }
    );
  }
};
