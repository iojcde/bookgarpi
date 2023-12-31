import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Garpi } from "@prisma/client";
import { Link2Icon } from "lucide-react";
import Link from "next/link";
import { GarpiActions } from "./garpi-actions";

export const Bookmark = ({ garpi }: { garpi: Garpi }) => {
  const hostanme =
    garpi.type == "hn" ? "Garpi HN" : new URL(garpi.url).hostname;
  return (
    <div className="border items-start rounded-xl w-full p-1.5 h-[320px] relative overflow-hidden group">
      {garpi.image ? (
        <img
          src={garpi.image}
          className="w-full border border-gray-3 max-h-[11.5rem] object-cover rounded-md h-full  group-hover:max-h-[164px] transition-all"
        />
      ) : (
        <div className="bg-gradient-to-br from-gray-3 text-gray-11 flex items-center justify-center to-white h-48 w-full">
          No Preview Image found...
        </div>
      )}
      <div className="p-4  transition">
        <Link
          href={`/garpi/${garpi.id}`}
          className="text-lg font-bold leading-none pb-0.5 line-clamp-2 max-w-full"
        >
          {garpi.title}
        </Link>{" "}
        <div className="text-gray-11 mt-2 text-xs line-clamp-4">
          {garpi.desc || "No description found..."}
        </div>
        {/* <GarpiActions/> */}
      </div>
      <div className="absolute   -bottom-5 group-hover:-translate-y-5  transition p-1 px-4 text-gray-11 text-xs">
        <span>
          <Link2Icon size={12} className="inline" /> {hostanme}
        </span>
      </div>

      <GarpiActions id={garpi.id} />
    </div>
  );
};
