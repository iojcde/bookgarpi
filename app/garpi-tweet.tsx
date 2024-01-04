import { Tweet } from "react-tweet/api";
import { getTweet } from "./actions/get-tweet";
import { Suspense } from "react";

import { TweetSkeleton, EmbeddedTweet, TweetNotFound } from "react-tweet";

export const GarpiTweet = async ({ id }:{id:string}) => {
  try {
    const tweet = await getTweet(id);
    return tweet ? <EmbeddedTweet tweet={tweet} /> : <TweetNotFound />;
  } catch (error) {
    console.error(error);
    return <TweetNotFound error={error} />;
  }
};
