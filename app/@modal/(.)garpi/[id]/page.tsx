import { extractArticle } from "@/app/actions/extract-article";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { HNGarpi } from "./hn-garpi";
import { ChevronLeft } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { Dialog, DialogContent } from "../../dialog-copy";
import { ScrollArea } from "@/components/ui/scroll-area";

import Markdown from "react-markdown";
import { Suspense } from "react";

const GarpiPage = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getServerSession();

  if (!session) {
    return null;
  }

  const garpi = await db.garpi.findFirst({
    where: { id, userId: session.user.id },
  });

  if (!garpi) {
    return notFound();
  }

  return (
    <Dialog defaultOpen>
      <DialogContent>
        <ScrollArea className="h-full">
          <Suspense>
            <div className="container mt-8 max-w-[80ch] p-6">
              <Link
                href="/"
                className={cn(
                  "flex items-center -ml-8",
                  buttonVariants({ variant: "ghost" })
                )}
              >
                <ChevronLeft className="text-gray-11" size={20} /> Home
              </Link>
              <h1 className="text-2xl sm:text-4xl text-balance font-bold mt-4 ">
                {garpi.title}
              </h1>
              <hr className="my-3" />
              <div className="flex items-center justify-between">
                {garpi.author}

                <Link href={garpi.url} className="text-gray-11">
                  Open
                </Link>
              </div>
              <Markdown className="prose prose-radix lg:prose-lg mt-16 max-w-[80ch]">{garpi.content}</Markdown>
              {garpi.type === "hn" ? (
                <>{<HNGarpi id={garpi.hnId as number} />}</>
              ) : null}
            </div>
          </Suspense>{" "}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default GarpiPage;
