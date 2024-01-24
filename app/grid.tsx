"use client";
import Masonry from "@/components/masonry";
import { ReactNode } from "react";

// masonry grid
export const Grid = ({ children }: { children: ReactNode }) => {
  return (
    <Masonry
      className="my-masonry-grid grid justify-items-center sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6"
      breakpointCols={{
        1: 1,
        640: 2,
        1024: 3,
        1536: 4,
        default: 1,
      }}
    >
      {children}
    </Masonry>
  );
};
