"use client";
import { ReactNode } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

export const Grid = ({ children }: { children: ReactNode }) => {
  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1200: 4 }}
    >
      <Masonry gutter="1.5rem">{children}</Masonry>
    </ResponsiveMasonry>
  );
};
