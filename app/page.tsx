import { debounce } from "lodash";
import { getFavicon } from "./actions/get-favicon";
import { Bookmarker } from "./bookmarker";
import { Bookmark } from "./bookmark";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen py-24 container">
      <h1 className="text-3xl font-bold">Bookgarpi</h1>
      <div className="flex items-center justify-between">
        <span className="inline-block mt-2">나만의 책갈피 정리하기</span>
        <Link href="/hn" className="font-medium">
          HN Reader↗
        </Link>
      </div>

      <Bookmarker />
      <hr className="my-2" />

      <div className="space-y-2">
        <Bookmark
          url="https://github.com"
          title="Github"
          desc="wow it's github"
          img="https://github.com/favicon.ico"
        />
      </div>
    </main>
  );
}
