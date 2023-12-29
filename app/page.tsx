import { Bookmarker } from "./bookmarker";
import { Bookmark } from "./garpi";
import Link from "next/link";
import { db } from "@/lib/db";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { Garpi } from "@prisma/client";
import { Button, buttonVariants } from "@/components/ui/button";

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
    <main className="min-h-screen py-24 max-w-2xl container">
      <h1 className="text-3xl font-bold">Bookgarpi</h1>
      <div className="flex items-center justify-between">
        <span className="inline-block mt-2">나만의 책갈피 정리하기</span>
        <Link href="/hn" className="font-medium">
          HN Reader↗
        </Link>
      </div>

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
    </main>
  );
}
