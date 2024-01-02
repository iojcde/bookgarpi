"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { db } from "@/lib/db";
import { MoreVertical } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { deleteGarpi } from "./actions/delete-garpi";
import { cn } from "@/lib/utils";

export const GarpiActions = ({
  id,
  open,
  setOpen,
}: {
  id: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  return (
    <AlertDialog>
      <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
        <DropdownMenuTrigger
          className={cn(
            "absolute bottom-3 right-2 p-1 group-hover:opacity-100  opacity-0 transition-opacity",
            open && "opacity-100"
          )}
        >
          <MoreVertical className="text-gray-11" size={16} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <AlertDialogTrigger className="text-red-500 font-medium">
              Delete Garpi
            </AlertDialogTrigger>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            Garpi.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              toast.promise(deleteGarpi(id), {
                loading: "Deleting Garpi...",
                success: "Deleted!",
                error: "Error deleting Garpi.",
              });
            }}
            className="bg-red-500"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
