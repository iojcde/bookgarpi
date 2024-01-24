"use client";
import { Details } from "@/components/details";
import { Sidebar } from "@/components/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Garpi } from "@prisma/client";
import { ReactNode, useState } from "react";

const Wrapper = ({
  children,
  garpi,
}: {
  children: ReactNode;
  garpi: Garpi;
  modal: boolean;
}) => {
  const [tab, setTab] = useState<"screenshot" | "article">("article");
  const [detailsOpen, setDetailsOpen] = useState(false);
  return (
    <div className="flex w-full">
      <Sidebar
        data={{ detailsOpen, tab }}
        fns={{ setDetailsOpen, setTab }}
        id={garpi.id as string}
      />
      <div className="w-full relative flex">
        <div
          className={cn(
            detailsOpen
              ? " max-w-full translate-x-0"
              : " max-w-0 -translate-x-full",
            "transition-all absolute overflow-hidden w-1/3 z-30"
          )}
        >
          <Details garpi={garpi} />
        </div>
        <div
          className={cn(
            tab == "screenshot" ? "translate-x-0" : "-translate-x-full",
            "transition-all absolute z-30 w-full   h-full"
          )}
        >
          {" "}
          <ScrollArea className="h-full">
            <img
              alt=""
              className="mx-auto object-cover h-full w-full"
              src={`https://garpi-s3.s3.us-west-000.backblazeb2.com/${garpi.id}.png`}
            />
          </ScrollArea>
        </div>

        <div className="h-full w-full"> {children}</div>
      </div>
    </div>
  );
};
export default Wrapper;
