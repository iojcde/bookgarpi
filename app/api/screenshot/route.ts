"use server";
import { getScreenshot } from "./lib/puppeteer";
import { NextRequest, NextResponse } from "next/server";
import {
  S3Client,
  CreateBucketCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { v4 as uuid } from "uuid";
// Create an S3 client
//
// You must copy the endpoint from your B2 bucket details
// and set the region to match.
const s3 = new S3Client({
  endpoint: "s3.us-west-000.backblazeb2.com",
  region: "us-west-000",
  credentials: {
    accessKeyId: process.env.B2_KEY_ID as string,
    secretAccessKey: process.env.B2_KEY as string,
  },
});
export const POST = async (req: NextRequest) => {
  const auth = req.headers.get("authorization");

  console.log("screenshotting....");

  if (auth !== process.env.SCREENSHOT_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await req.json();
  const { url } = body;

  if (!url) return new Response("No url specified.", { status: 400 });
  if (!checkUrl(url))
    return new Response("Invalid url specified.", { status: 400 });
  try {
    const file = await getScreenshot(url);

    await s3.send(
      new PutObjectCommand({
        Bucket: "3bcadaaa775de64c82c60a1e",
        Key: encodeURIComponent(url) + ".png",
        Body: file,
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

function checkUrl(string: string) {
  var url = null;
  try {
    url = new URL(string);
  } catch (error) {
    return false;
  }
  return true;
}
