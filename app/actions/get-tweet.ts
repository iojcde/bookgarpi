"use server";
import { getServerSession } from "next-auth";
import { getTweet as getTweetData } from "react-tweet/api";

export const getTweet = async (tweetId: string) => {
  const session = await getServerSession();

  if (!session) {
    throw new Error("No session found");
  }

  return getTweetData(tweetId);
};
