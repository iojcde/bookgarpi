import { Garpi } from "@prisma/client";
import { Label } from "./ui/label";

export const Details = ({ garpi }: { garpi: Garpi }) => {
  return (
    <div className="w-full hidden relative lg:block bg-gray-2 h-screen p-6">
      <h1 className="line-clamp-1 overflow-ellipsis text-xl font-bold">
        {garpi.title}
      </h1>

      <div className="space-y-2 mt-4 text-sm">
        <div>
          <Label className="text-gray-11">Author</Label>
          <div>{garpi.author}</div>
        </div>
        <div>
          <Label className="text-gray-11">URL</Label>
          <div>{garpi.url}</div>
        </div>
        <div>
          <Label className="text-gray-11">Created At</Label>
          <div>{garpi.createdAt.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
};
