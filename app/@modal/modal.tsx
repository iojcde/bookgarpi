"use client";
import { Dialog, DialogContent } from "@/app/@modal/dialog-copy";
import { cn } from "@/lib/utils"
import GarpiPage from "@/app/garpi/[id]/page";
import { Drawer, DrawerContent } from "@/app/@modal/drawer-copy";
import { useWindowSize } from "@/lib/use-window-size";
import { ReactNode, Suspense } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

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
}: {
  children: ReactNode;
  fullHeight?: boolean;
  enableDesktop?: boolean;
}) => {
  const { width, height } = useWindowSize();
  const router = useRouter();
  if (!width) return null;

  if (width < 640) {
    return (
      <Drawer
        modal={false}
        closeThreshold={0.1}
        open
        onClose={() => {
          // delay to allow drawer to close
          setTimeout(() => router.back(), 200);
        }}
      >
        <DrawerContent className="h-full">
          <Suspense fallback={<Loading />}>{children}</Suspense>
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
          <Suspense fallback={<Loading />}>
            {" "}
            {/* <Loading /> */}
            {children}
          </Suspense>
        </DialogContent>
      </Dialog>
    );
  }

  return children;
};

export default GarpiModal;
