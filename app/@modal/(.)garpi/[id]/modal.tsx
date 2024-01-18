"use client";
import { Dialog, DialogContent } from "@/app/@modal/dialog-copy";

import GarpiPage from "@/app/garpi/[id]/page";
import { Drawer, DrawerContent } from "@/app/@modal/drawer-copy";
import { useWindowSize } from "@/lib/use-window-size";
import { ReactNode, Suspense } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const Loading = () => {
  return (
    <div className="text-xl text-center justify-center flex items-center w-full h-full">
      <div className="flex items-center gap-2">
        <Loader2 className="spin inline-block" />
        Loading...
      </div>
    </div>
  );
};

const GarpiModal = ({ children }: { children: ReactNode }) => {
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
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog defaultOpen>
      <DialogContent className="overflow-hidden">
        <Suspense fallback={<Loading />}>
          {" "}
          {/* <Loading /> */}
          {children}
        </Suspense>
      </DialogContent>
    </Dialog>
  );
};

export default GarpiModal;
