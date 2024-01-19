import GarpiPage from "@/app/garpi/[id]/page";
import GarpiModal from "@/app/@modal/modal";
import StoryPage from "../../../stories/[id]/page";
import { ScrollArea } from "@/components/ui/scroll-area";

const GarpiModalPage = ({ params }: { params: { id: number } }) => {
  return (
    <GarpiModal enableDesktop>
      <ScrollArea className="h-full container bg-gray-2 mt-1">
        <StoryPage params={params} />
      </ScrollArea>
    </GarpiModal>
  );
};

export default GarpiModalPage;
