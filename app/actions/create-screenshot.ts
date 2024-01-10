"use server";

import { Upload } from "@aws-sdk/lib-storage";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
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
          Key: encodeURIComponent(url) + ".png",
          Body: res.body,
        },

        tags: [
          /*...*/
        ], // optional tags
        queueSize: 4, // optional concurrency configuration
        partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 5MB
        leavePartsOnError: false, // optional manually handle dropped parts
      });

      parallelUploads3.on("httpUploadProgress", (progress) => {
        console.log(progress);
      });

      await parallelUploads3.done();
    } catch (e) {
      console.log(e);
    }
  } catch (error) {
    console.error(error);
    return new Response(
      "The server encountered an error. You may have inputted an invalid query.",
      { status: 500 }
    );
  }
};
