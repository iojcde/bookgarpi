import { Garpi } from "@prisma/client";
import { Label } from "./ui/label";
import TagMaker from "./tag/tag-maker";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export const Details = ({
  garpi,
  className,
}: {
  garpi: Garpi;
  className?: string;
}) => {
  return (
    <div className={cn("w-full  h-screen p-6", className)}>
      <h1 className=" text-xl font-bold">{garpi.title}</h1>
      <Link href={garpi.url} className="text-gray-11">
        <ExternalLink className="inline-block" size={16} />{" "}
        {new URL(garpi.url).hostname}
      </Link>

      <div className="space-y-2 mt-16 text-sm">
        <div>
          <Label className="text-gray-11">Author</Label>
          <div>{garpi.author}</div>
        </div>
        <div>
          <Label className="text-gray-11">Created At</Label>
          <div>{garpi.createdAt.toLocaleString()}</div>
        </div>
        <div>
          <TagMaker />
        </div>
      </div>
    </div>
  );
};
