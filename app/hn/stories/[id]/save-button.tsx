"use client";

import { createGarpi } from "@/app/actions/create-garpi";
import { toast } from "sonner";

export const SaveButton = ({ url }: { url: string }) => {
  return (
    <button
      onClick={async () => {
        toast.promise(createGarpi(url, "hn"), {
          loading: "Saving...",
          success: (data) => {
            return `Saved ${data?.title}`;
          },
        });
      }}
      className=""
    >
      save
    </button>
  );
};
