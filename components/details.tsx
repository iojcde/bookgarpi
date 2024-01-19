import { Garpi } from "@prisma/client";
import { Label } from "./ui/label";

export const Details = ({ garpi }: { garpi: Garpi }) => {
  return (
    <div className="w-80 hidden lg:block bg-gray-2 h-screen p-6">
      <h1 className="font-semibold">Details</h1>

      <Label>Author</Label>
      <div className="text-gray-11">{garpi.author}</div>
    </div>
  );
};
