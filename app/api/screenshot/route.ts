"use server"
import { getScreenshot } from "./lib/puppeteer";
import { NextRequest, NextResponse } from "next/server";

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

    return new Response(file, { status: 200 });
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
