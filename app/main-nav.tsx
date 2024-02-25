/* eslint-disable @next/next/no-img-element */
"use client";

import { debounce } from "lodash";
import { useState } from "react";
import { db } from "@/lib/db";
import { createGarpi } from "./actions/create-garpi";
import { Bookmark } from "./garpi";
import { useRouter } from "next/navigation";
import { RemoveScroll } from "react-remove-scroll";
import { toast } from "sonner";
import Link from "next/link";
import { LinkIcon, Search } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { searchGarpi } from "./actions/search";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const MainNav = ({ initialgarpis }: { initialgarpis: any[] }) => {
  const [inputValue, setInputValue] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <nav className="w-full flex shadow-sm flex-wrap gap-2 border-b items-center sticky px-6 bg-gray-1 z-30 top-0 inset-x-0 py-2 ">
        <Link href="/" className=" font-display font-bold whitespace-nowrap">
          Garpi <span className="text-gray-10 font-medium"> / Bookmarks</span>
        </Link>

        <Link
          href="/hn"
          className="text-sm order-none sm:order-last ml-auto text-gray-11"
        >
          HN Reader
        </Link>
        <div className="mx-auto flex items-center gap-2 relative">
          <form
            action={async (formData) => {
              const query = formData.get("query") as string;
              router.push(`/?q=${query}`);
            }}
          >
            <div className=" transition  px-4 rounded-sm text-sm  relative group mx-auto sm:w-[30rem] bg-gray-3 text-gray-11 outline-none py-1 focus-within:bg-gray-5 gap-2 flex items-center">
              <Search size={16} className="text-gray-10" />
              <input
                autoComplete="off"
                placeholder="Search..."
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);

                  if (e.target.value.trim().length == 0) {
                    router.push(`/`);
                  }
                }}
                onKeyUp={(e) => {
                  //esc
                  if (e.key === "Escape") {
                    setInputValue("");
                  }
                }}
                name="query"
                className="bg-transparent py-1 placeholder:text-gray-10  peer outline-none w-full"
              ></input>{" "}
              <div
                className={cn(
                  "peer-focus:opacity-100 transition opacity-0 absolute left-0 w-full top-10 p-4 rounded-b-xl bg-gray-3 ",
                  inputValue.trim().length > 0 && "!opacity-0"
                )}
              >
                Filter
              </div>
            </div>
          </form>

          <Dialog>
            <DialogTrigger
              className={cn(
                "shadow rounded-md ",
                buttonVariants({ size: "sm" })
              )}
            >
              + New
            </DialogTrigger>

            <DialogContent>
              <form
                action={async (formData) => {
                  const original = formData.get("content") as string;
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

                      router.refresh();
                      return `Created new Garpi: ${data?.title}`;
                    },
                    error: (err) => {
                      return `Error: ${err.message}`;
                    },
                  });
                }}
              >
                <DialogHeader>
                  <DialogTitle>New Garpi</DialogTitle>
                </DialogHeader>
                <div className="py-6">
                  <Textarea name="content" placeholder="Enter a URL or note" />
                </div>
                <DialogFooter>
                  <DialogTrigger
                    className={buttonVariants({ variant: "ghost" })}
                  >
                    Close
                  </DialogTrigger>
                  <Button type="submit">Save</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </nav>
    </>
  );
};
