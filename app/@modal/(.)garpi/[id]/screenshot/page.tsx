import GarpiModal from "@/app/@modal/modal";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import Image from "next/image";

const ScreenshotPage = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <GarpiModal enableDesktop fullHeight>
      <ScrollArea className="relative w-full h-full">
        <img
          alt=""
          src={`https://f000.backblazeb2.com/file/garpi-s3/${id}.png`}
          className={cn(
            "w-full max-w-5xl mx-auto  object-cover h-full transition-all object-top"
          )}
        />
      </ScrollArea>
    </GarpiModal>
  );
};

export default ScreenshotPage;
