/* eslint-disable @next/next/no-img-element */
"use client";

import { debounce } from "lodash";
import { getFavicon } from "./actions/get-favicon";
import { useState } from "react";

export const Bookmarker = () => {
  const debounced = debounce(async (url) => {
    try {
      const img = await getFavicon(url, true);

      if (img) {
        setFavicon(img);
      }
      new URL(url);
    } catch (e) {}
  }, 500);
  const [favicon, setFavicon] = useState<string | null>(null);

  return (
    <form
      action={(formData) => {
        console.log(formData.get("url"));
      }}
      className="flex mt-8 rounded-xl focus-within:ring-2 border border-gray-6 ring-offset-2 py-2 ring-gray-6 ring-offset-gray-1 px-3 items-center gap-3 bg-gray-2"
    >
      <div className="ring-gray-3 p-1 rounded-md ring-1 flex items-center justify-center aspect-square bg-gray-1 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      </div>

      <input
        type="url"
        name="url"
        onChange={async (e) => {
          debounced(e.target.value);
        }}
        className="w-full bg-gray-2 outline-none sm:text-lg"
      ></input>

      <div className="text-lg border px-4 text-gray-10 rounded-md">↵</div>
    </form>
  );
};
