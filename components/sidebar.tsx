import { DialogTrigger } from "@/app/@modal/dialog-copy";
import { cn } from "@/lib/utils";
import {
  Image as ImageIcon,
  NewspaperIcon,
  SidebarIcon,
  X,
} from "lucide-react";
import Link from "next/link";

export const Sidebar = ({ id }: { id: string }) => {
  return (
    <aside className="absolute inset-x-0 text-gray-10 z-30 top-0">
      <div className="sm:h-full  py-2 sm:relative sm:p-6 px-3 items-center justify-between sm:flex-col flex-row flex border-r w-18">
        <DialogTrigger
          className={cn(
            "hidden rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-foreground"
          )}
        >
          <X className="h-6 w-6" />
          <span className="sr-only">Close</span>
        </DialogTrigger>
        <div className="flex sm:flex-col gap-2">
          <Link
            href={`/garpi/${id}`}
            className="w-8 h-8 inline-flex items-center justify-center  ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-sm"
          >
            <NewspaperIcon className="w-5 h-5" />
          </Link>
          <Link
            href={`/garpi/${id}/screenshot`}
            className="w-8 h-8 inline-flex items-center justify-center  ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-sm"
          >
            <ImageIcon className="w-5 h-5" />
          </Link>
        </div>
        <button className=" w-8 h-8  inline-flex items-center justify-center  ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-sm">
          <SidebarIcon className="w-5 h-5 " />
        </button>
      </div>
    </aside>
  );
};
