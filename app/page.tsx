import { MainNav } from "./main-nav";
import { Bookmark } from "./garpi";
import Link from "next/link";
import { db } from "@/lib/db";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { Garpi } from "@prisma/client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Suspense } from "react";
import { GarpiTweet } from "./garpi-tweet";

import { TweetSkeleton } from "react-tweet";
import { Grid } from "./grid";
import TagInputDemo from "@/components/tag/tag-maker";
import { searchGarpi } from "./actions/search";

export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const session = await getServerSession();

  let garpis: Garpi[];
  if (!session) {
    garpis = [];
  } else {
    if (searchParams?.q) {
      garpis = await searchGarpi(searchParams.q as string);
    } else {
      garpis = await db.garpi.findMany({
        where: {
          userId: session?.user.id,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }
  }

  return (
    <main className="min-h-screen dark:bg-black mx-auto  pb-12 ">
      <Suspense>
        {session ? (
          <>
            <MainNav initialgarpis={garpis} />
            <div className="flex items-center py-8 gap-2  px-6 sm:px-8 text-sm font-medium ">
              <button className="bg-gray-3 rounded-sm px-4 py-1.5 ">
                Bookmarks
              </button>{" "}
              <button className="text-gray-11 px-4 py-1.5 ">Notes</button>
            </div>
          </>
        ) : (
          <div className="h-full flex items-center flex-col gap-8">
            로그인이 필요합니다.
            <Link href={"/login"} className={buttonVariants()}>
              로그인
            </Link>
          </div>
        )}
      </Suspense>
      <div className=" sm:px-8 px-6 mx-auto ">
        {garpis.length > 0 ? (
          <Grid>
            {garpis.map((garpi) => {
              if (garpi.type == "tweet") {
                return (
                  <Suspense key={garpi.id} fallback={<TweetSkeleton />}>
                    <GarpiTweet id={garpi.url.split("/").pop() as string} />
                  </Suspense>
                );
              } else {
                return <Bookmark garpi={garpi} key={garpi.id} />;
              }
            })}
          </Grid>
        ) : (
          <div className="w-full text-center mt-16">
            <div className="font-bold text-3xl">No Garpis found...</div>

            <p className="mt-4">Try searching for something else? </p>
          </div>
        )}
      </div>
    </main>
  );
}

export const metadata = {
  title: "Garpi",
  description: "Garpi is a bookmarking service for thinkers.",
};
