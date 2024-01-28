"use client";
import { DialogTrigger } from "@/app/@modal/dialog-copy";
import { useInModal } from "@/app/@modal/modal";
import { cn } from "@/lib/utils";
import {
  Image as ImageIcon,
  NewspaperIcon,
  SidebarIcon,
  X,
} from "lucide-react";
import Link from "next/link";

export const Sidebar = ({
  id,
  data: { tab, detailsOpen },
  fns: { setTab, setDetailsOpen },
}: {
  id: string;
  data: {
    tab: string;
    detailsOpen: boolean;
  };
  fns: {
    setTab: (a: "screenshot" | "article") => void;
    setDetailsOpen: (a: boolean) => void;
  };
}) => {
  const modal = useInModal();
  return (
    <aside className="absolute sm:relative inset-x-0 text-gray-10 bg-background z-50 top-0">
      <div className="sm:h-full  py-2 sm:relative sm:py-6 px-3 items-center justify-between sm:flex-col flex-row flex border-r w-18">
        {modal ? (
          <DialogTrigger
            className={cn(
              "hidden sm:block rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-foreground"
            )}
          >
            <X className="h-6 w-6" />
            <span className="sr-only">Close</span>
          </DialogTrigger>
        ) : (
          <Link
            className={cn(
              "hidden sm:block rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-foreground"
            )}
            href={`/`}
          >
            {" "}
            <X className="h-6 w-6" />
            <span className="sr-only">Close</span>
          </Link>
        )}{" "}
        <div className="flex sm:flex-col gap-2">
          <button
            onClick={() => {
              setTab("article");
            }}
            className="w-8 h-8 inline-flex items-center justify-center  ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-sm"
          >
            <NewspaperIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => {
              setTab("screenshot");
            }}
            className="w-8 h-8 inline-flex items-center justify-center  ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-sm"
          >
            <ImageIcon className="w-5 h-5" />
          </button>
        </div>
        <button
          onClick={() => {
            setDetailsOpen(!detailsOpen);
          }}
          className=" w-8 h-8  inline-flex items-center justify-center  ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-sm"
        >
          <SidebarIcon className="w-5 h-5 " />
        </button>
      </div>
    </aside>
  );
};
