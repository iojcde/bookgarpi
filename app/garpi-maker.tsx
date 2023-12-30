/* eslint-disable @next/next/no-img-element */
"use client";

import { debounce } from "lodash";
import { useState } from "react";
import { db } from "@/lib/db";
import { createGarpi } from "./actions/create-garpi";
import { Bookmark } from "./garpi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
            success: (data) => {
              setInputValue("");
              return `Created new Garpi: ${data?.title}`;
            },
            error: (err) => {
              return `Error: ${err.message}`;
            },
          });

          router.refresh();
        }}
        className="flex mt-8 -mx-2 rounded-xl shadow-inner border border-gray-5 ring-offset-2 py-2 ring-gray-6 ring-offset-gray-1 px-3 items-center gap-3 bg-gray-2"
      >
        <div className="ring-gray-3 shadow p-1 rounded-md ring-1 flex items-center justify-center aspect-square bg-gray-1 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        </div>

        <input
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          name="url"
          className="w-full bg-gray-2 outline-none sm:text-lg"
        ></input>

        <div className="text-lg border px-4 text-gray-10 shadow rounded-md">
          ↵
        </div>
      </form>

      <hr className="my-3" />
    </>
  );
};
