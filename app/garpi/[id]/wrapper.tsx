"use client";
import { AnimationWrapper } from "@/components/animation-wrapper";
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
}) => {
  const [tab, setTab] = useState<"screenshot" | "article">("article");
  const [detailsOpen, setDetailsOpen] = useState(false);
  return (
    <div className="flex w-full ">
      <Sidebar
        data={{ detailsOpen, tab }}
        fns={{ setDetailsOpen, setTab }}
        id={garpi.id as string}
      />
      <div className="w-full relative flex gap-2">
        <div
          className={cn(
            detailsOpen ? " sm:max-w-[20%]" : " sm:max-w-0",
            "transition-all overflow-hidden relative w-full shadow-lg  z-30"
          )}
        >
          <Details
            className={cn(
              !detailsOpen && "-translate-x-full opacity-0",
              "transition-all"
            )}
            garpi={garpi}
          />
        </div>

        <div
          className={cn(
            "h-full w-full relative transition-all",
            detailsOpen && "p-2 "
          )}
        >
          <div
            className={cn(
              detailsOpen && "border rounded-sm overflow-hidden h-full"
            )}
          >
            <AnimationWrapper
              show={tab == "article"}
              className="h-full transition-all"
            >
              {children}
            </AnimationWrapper>
            <AnimationWrapper
              show={tab == "screenshot"}
              className="transition-all"
            >
              <ScrollArea className="h-full">
                <img
                  alt=""
                  className="mx-auto object-cover h-full w-full"
                  src={`https://garpi-s3.s3.us-west-000.backblazeb2.com/${garpi.id}.png`}
                />
              </ScrollArea>
            </AnimationWrapper>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Wrapper;
