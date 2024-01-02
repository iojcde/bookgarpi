/* eslint-disable @next/next/no-img-element */
"use client";

import { debounce } from "lodash";
import { useState } from "react";
import { db } from "@/lib/db";
import { createGarpi } from "./actions/create-garpi";
import { Bookmark } from "./garpi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { LinkIcon } from "lucide-react";

export const Bookmarker = ({ initialgarpis }: { initialgarpis: any[] }) => {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  return (
    <>
      <form
        action={async (formData) => {
          const original = formData.get("url") as string;
          let newURL = original;
          try {
            new URL(newURL);
          } catch (e) {
            newURL = "https://" + original;
          }

          toast.promise(createGarpi(newURL, "url"), {
            loading: "Saving...",
            success: (data: any) => {
              setInputValue("");
              return `Created new Garpi: ${data?.title}`;
            },
            error: (err) => {
              return `Error: ${err.message}`;
            },
          });

          router.refresh();
        }}
        className="w-full flex flex-wrap gap-2 items-center fixed px-6 bg-white dark:bg-gray-2 z-30 top-0 inset-x-0 py-2 border-b"
      >
        <Link href="/" className="text-lg font-bold whitespace-nowrap">
          Garpi <span className="text-gray-10 font-medium"> / Bookmarks</span>
        </Link>
        <div className="mx-auto flex gap-2">
          <input
            placeholder="Search or paste a URL..."
            value={inputValue}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            name="url"
            className="border px-4 rounded-lg mx-auto sm:w-[32rem] bg-gray-2 outline-none py-1"
          ></input>

          <button
            type="submit"
            className="text-lg border px-4 text-gray-10 shadow rounded-md"
          >
            ↵
          </button>
        </div>
      </form>
    </>
  );
};
