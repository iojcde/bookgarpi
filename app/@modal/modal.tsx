"use client";
import { Dialog, DialogContent } from "@/app/@modal/dialog-copy";
import { cn } from "@/lib/utils";
import GarpiPage from "@/app/garpi/[id]/page";
import { Drawer, DrawerContent } from "@/app/@modal/drawer-copy";
import { useWindowSize } from "@/lib/use-window-size";
import { ReactNode, Suspense, useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { Sidebar } from "@/components/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
const Loading = () => {
  return (
    <div className="text-xl text-gray-11 text-center justify-center flex items-center w-full h-full">
      <div className="flex items-center gap-2">
        <Loader2 className="spin inline-block" />
        Loading...
      </div>
    </div>
  );
};

const GarpiModal = ({
  children,
  enableDesktop,
  fullHeight,
  garpiId,
}: {
  children: ReactNode;
  fullHeight?: boolean;
  enableDesktop?: boolean;
  garpiId?: string;
}) => {
  const [tab, setTab] = useState<"screenshot" | "article">("article");
  const { width, height } = useWindowSize();
  const router = useRouter();
  if (!width) return null;

  if (width < 640) {
    return (
      <Drawer
        closeThreshold={0.1}
        open
        onClose={() => {
          // delay to allow drawer to close
          setTimeout(() => router.back(), 200);
        }}
      >
        <DrawerContent className="h-full">
          <Sidebar setTab={setTab} tab={tab} id={garpiId as string} />
          <Suspense fallback={<Loading />}>{children}</Suspense>
          <div
            className={cn(
              tab == "screenshot" ? "max-w-full" : "max-w-0",
              "transition-all"
            )}
          >
            <img
              alt=""
              src={`https://f000.backblazeb2.com/file/garpi-s3/${garpiId}.png`}
              className={cn(
                "w-full max-w-5xl mx-auto  object-cover h-full transition-all object-top"
              )}
            />
          </div>{" "}
        </DrawerContent>
      </Drawer>
    );
  }
  if (enableDesktop) {
    return (
      <Dialog defaultOpen>
        <DialogContent
          className={cn("overflow-hidden", fullHeight && "h-screen")}
        >
          <Sidebar setTab={setTab} tab={tab} id={garpiId as string} />
          <div
            className={cn(
              tab == "screenshot" ? "translate-x-0" : "-translate-x-full",
              "transition-all absolute z-30 w-full  h-full"
            )}
          >
            {" "}
            <ScrollArea className="h-full">
              <img
                alt=""
                className="mx-auto object-cover h-full"
                src={`https://garpi-s3.s3.us-west-000.backblazeb2.com/${garpiId}.png`}
              />
            </ScrollArea>
          </div>
          <Suspense fallback={<Loading />}>
            <div
              className={cn(
                tab == "article" ? "translate-x-0" : "translate-x-full",
                "transition-all w-full  duration-200 h-full"
              )}
            >
              {children}
            </div>
          </Suspense>
        </DialogContent>
      </Dialog>
    );
  }

  return children;
};

export default GarpiModal;
