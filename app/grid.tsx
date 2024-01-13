"use client";
import Masonry from "@/components/masonry";
import { ReactNode } from "react";

// masonry grid
export const Grid = ({ children }: { children: ReactNode }) => {
  return (
    <Masonry
      className="my-masonry-grid grid justify-items-center sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6"
      breakpointCols={{
        default: 4,
        1280: 4,
        1024: 3,
        640: 2,
        500: 1,
      }}
    >
      {children}
    </Masonry>
  );
};
