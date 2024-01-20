import { DialogTrigger } from "@/app/@modal/dialog-copy";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export const Sidebar = () => {
  return (
    <div className=" h-full p-6 px-5 sm:block hidden border-r w-18">
      <DialogTrigger
        className={cn(
          " rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-foreground"
        )}
      >
        <X className="h-6 w-6" />
        <span className="sr-only">Close</span>
      </DialogTrigger>
    </div>
  );
};
