"use server";
import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { getServerSession } from "next-auth";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export const summarizeArticle = async (body: string) => {
  const session = await getServerSession();

  if (!session) {
    return 'Failed to crate a create a description';
  }

  const regexForStripHTML = /(<([^>]+)>)/gi;
  const stripContent = body.replaceAll(regexForStripHTML, "");

  console.log(stripContent);

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [
      {
        role: "user",
        content:
          "Create a short description (< 200 chars) for the following content :\n" +
          stripContent.replaceAll("\n\n", "\n").slice(0, 1500),
      },
    ],
  });

  const stream = OpenAIStream(response);

  const decoder = new TextDecoderStream();
  stream.pipeThrough(decoder);

  const reader = decoder.readable.getReader();

  let result = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    result += value;
  }

  console.log(result);
  return result;
};
