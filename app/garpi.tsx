"use client";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Garpi } from "@prisma/client";
import { Link2Icon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { GarpiActions } from "./garpi-actions";
import { useRouter } from "next/navigation";

export const Bookmark = ({ garpi }: { garpi: Garpi }) => {
  const hostanme = new URL(garpi.url).hostname;
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <div className="item  border border-gray-5 items-start rounded-xl hover:shadow transition bg-white dark:bg-gray-2 w-full h-[355px] relative overflow-hidden group">
      {garpi.image ? (
        <img
          alt=""
          src={garpi.image}
          className={cn("w-full  object-cover h-[11.5rem] transition-all")}
        />
      ) : (
        <div className="bg-gradient-to-br from-gray-3 text-gray-11 flex items-center justify-center to-white h-48 w-full">
          No Preview Image found...
        </div>
      )}
      <Link
        href={`/garpi/${garpi.id}`}
        className="block p-4 border-t pt-3 cursor-pointer h-full transition"
      >
        <h3 className="text-lg leading-6 font-bold  line-clamp-2 max-w-full">
          {garpi.title}
        </h3>{" "}
        <div className="text-gray-11 mt-2 text-xs line-clamp-4">
          {garpi.desc || "No description found..."}
        </div>
        {/* <GarpiActions/> */}
      </Link>
      <div
        className={cn(
          "absolute bottom-1 transition p-1 px-4 text-gray-10 text-xs"
        )}
      >
        <span>
          {/* <Link2Icon size={12} className="inline" /> */}
          {hostanme}
        </span>
      </div>

      <GarpiActions open={open} setOpen={setOpen} id={garpi.id} />
    </div>
  );
};
