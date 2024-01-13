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
import { LinkIcon, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

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
        className="w-full flex flex-wrap gap-2 items-center fixed px-8 backdrop-blur-sm z-30 top-0 inset-x-0 py-4"
      >
        <Link href="/" className="text-lg font-bold whitespace-nowrap">
          Garpi <span className="text-gray-10 font-medium"> / Bookmarks</span>
        </Link>

        <Link
          href="/hn"
          className="text-sm order-none sm:order-last ml-auto text-gray-11"
        >
          HN Reader
        </Link>
        <div className="mx-auto flex gap-2">
          <div className=" px-4 rounded-lg group mx-auto sm:w-[48rem] bg-gray-3 text-gray-11 hover:border-gray-8 border-transparent transition border  outline-none py-1 sm:py-2 gap-2 flex items-center">
            <Search size={16} className="text-gray-10" />
            <span className="mx-2 group-hover:opacity-100 opacity-0 transition-all h-[80%] border-r border-gray-8 w-0"></span>
            <input
              autoComplete="off"
              placeholder="Search anything..."
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
              className="bg-transparent outline-none w-full"
            ></input>
          </div>

          <Button type="submit" className="shadow rounded-md">
            + New
          </Button>
        </div>
      </form>
    </>
  );
};
