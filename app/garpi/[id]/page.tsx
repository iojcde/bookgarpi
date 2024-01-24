import { extractArticle } from "@/app/actions/extract-article";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HNGarpi } from "./hn-garpi";
import { ChevronLeft } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Markdown from "react-markdown";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Details } from "../../../components/details";
import remarkGfm from "remark-gfm";
import { BackButton } from "@/components/back-button";
import Wrapper from "./wrapper";

const GarpiPage = async ({
  params: { id },
  ...props
}: {
  params: { id: string };
}) => {
  const session = await getServerSession();

  if (!session) {
    return null;
  }
  console.log(props);

  const garpi = await db.garpi.findFirst({
    where: { id, userId: session.user.id },
  });

  if (!garpi) {
    return notFound();
  }

  return (
    <Wrapper garpi={garpi}>
      {/* <Details garpi={garpi} /> */}

      <ScrollArea className="w-full h-full">
        <div className="container h-full mt-8 max-w-[80ch]">
          <BackButton
            className={cn(
              "flex items-center -ml-8",
              buttonVariants({ variant: "ghost" })
            )}
          >
            <ChevronLeft className="text-gray-11" size={20} /> Home
          </BackButton>
          <h1 className="text-2xl sm:text-3xl   w-full lg:text-4xl text-balance font-bold mt-4 ">
            {garpi.title}
          </h1>

          <img
            src={garpi.image as string}
            className="mt-8 h-80 w-full object-cover rounded-lg"
            alt=""
          />

          <Markdown
            remarkPlugins={[remarkGfm]}
            className="prose prose-sm sm:prose-base md:prose-lg   prose-radix mt-16 max-w-[80ch]"
          >
            {garpi.content}
          </Markdown>

          {garpi.type === "hn" ? (
            <>{<HNGarpi id={garpi.hnId as number} />}</>
          ) : null}
        </div>
      </ScrollArea>
    </Wrapper>
  );
};

export default GarpiPage;
