import { Bookmarker } from "./garpi-maker";
import { Bookmark } from "./garpi";
import Link from "next/link";
import { db } from "@/lib/db";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { Garpi } from "@prisma/client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Suspense } from "react";
import { GarpiTweet } from "./garpi-tweet";


import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"; 
import { TweetSkeleton } from "react-tweet";

export default async function Home() {
  const session = await getServerSession();

  let garpis: Garpi[];
  if (!session) {
    garpis = [];
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

  return (
    <main className="min-h-screen px-6 mt-16 bg-gray-1 max-w-[90rem] mx-auto">
      <Suspense>
        {session ? (
          <Bookmarker initialgarpis={garpis} />
        ) : (
          <div>
            로그인이 필요합니다.
            <Link href={"/login"} className={buttonVariants()}>
              로그인
            </Link>
          </div>
        )}
      </Suspense>
      <div className="py-4 flex gap-2 px-6 items-center font-medium"></div>
      <div className=" mt-8 grid sm:grid-cols-2 mb-16 lg:grid-cols-4 gap-6">
        {garpis.map((garpi) => {
          if (garpi.type == "tweet") {
            return (
              <Suspense key={garpi.id} fallback={<TweetSkeleton />}>
                <GarpiTweet id={garpi.url.split('/').pop() as string} />
              </Suspense>
            );
          } else {
            return <Bookmark garpi={garpi} key={garpi.id} />;
          }
        })}
      </div>
    </main>
  );
}
