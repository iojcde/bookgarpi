import { extractArticle } from "@/app/actions/extract-article";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HNGarpi } from "./hn-garpi";
import { ChevronLeft } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
    <div className="container py-20 max-w-[80ch]">
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

      <div
        className="prose prose-radix lg:prose-lg mt-16 max-w-[80ch]"
        dangerouslySetInnerHTML={{ __html: garpi.content || "" }}
      ></div>

      {garpi.type === "hn" ? <>{<HNGarpi id={garpi.hnId as number} />}</> : null}
    </div>
  );
};

export default GarpiPage;
