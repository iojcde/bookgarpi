"use client";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Garpi } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { GarpiActions } from "./garpi-actions";
import { useRouter } from "next/navigation";

export const Bookmark = ({ garpi }: { garpi: Garpi }) => {
  const hostanme = new URL(garpi.url).hostname;
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <div className="item  border border-gray-5 items-start rounded-xl hover:shadow transition bg-white dark:bg-gray-2 w-full h-[280px] relative overflow-hidden group">
      {garpi.image ? (
        <img
          alt=""
          src={garpi.image}
          className={cn("w-full  object-cover h-40 transition-all")}
        />
      ) : (
        <Image
          alt=""
          width={300}
          height={160}
          src={`https://garpi-s3.s3.us-west-000.backblazeb2.com/${garpi.id}.png`}
          className={cn("w-full  object-cover h-40 transition-all object-top")}
        />
      )}

      <Link
        href={`/garpi/${garpi.id}`}
        className="block p-4 border-t pt-3 cursor-pointer h-full transition"
      >
        <h3 className="leading-6 font-bold  line-clamp-1 max-w-full">
          {garpi.title}
        </h3>{" "}
        <div className="text-gray-11 mt-2 text-xs line-clamp-2">
          {garpi.desc || "No description found..."}
        </div>
        {/* <GarpiActions/> */}
      </Link>
      <div
        className={cn(
          "absolute bottom-1 transition p-1 px-4 text-gray-10 text-xs"
        )}
      >
        <Link
          href={garpi.url}
          className="hover:underline hover:text-gray-11"
          target=""
        >
          {/* <Link2Icon size={12} className="inline" /> */}
          {hostanme}
        </Link>
      </div>

      <GarpiActions open={open} setOpen={setOpen} id={garpi.id} />
    </div>
  );
};
