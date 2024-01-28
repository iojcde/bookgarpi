import GarpiPage from "@/app/garpi/[id]/page";
import GarpiModal from "../../modal";

const GarpiModalPage = ({ params }: { params: { id: string } }) => {
  return (
    <GarpiModal enableDesktop>
      <GarpiPage params={params} />
    </GarpiModal>
  );
};

export default GarpiModalPage;
