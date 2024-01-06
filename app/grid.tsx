"use client";
import Masonry from "react-masonry-css";
import { ReactNode } from "react";

// masonry grid
export const Grid = ({ children }: { children: ReactNode }) => {
  return (
    <Masonry
      className="my-masonry-grid gap-6"
      breakpointCols={{
        default: 4,
        1200: 3,
        700: 2,
        500: 1,
      }}
    >
      {children}
    </Masonry>
  );
};
