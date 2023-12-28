"use client";
import { useState } from "react";
import { Comment } from "./comment";
import convertTime from "@/utils/convertTime";

export const CommentContent = ({
  comment,
  children,
  isParent,
}: {
  comment: any;
  children: React.ReactNode;
  isParent?: boolean;
}) => {
  const [open, setOpen] = useState(true);
  return (
    <div className={!isParent ? "border-l pl-2 sm:pl-3" : ""}>
      <div className="text-xs text-gray-10 ">
        <span>
          {comment.by} {convertTime(comment.time)} ago
        </span>
        {" · "}
        <button
          onClick={() => {
            setOpen(!open);
          }}
        >
          {open ? "min" : `max (${comment.kids?.length ?? 0 + 1} more)`}
        </button>
      </div>

      <div className="mb-2 mt-1">
        {open && (
          <>
            <div
              className=" prose prose-sm overflow-ellipsis max-w-none last:prose-p:mb-0 text-black"
              dangerouslySetInnerHTML={{ __html: comment.text }}
            ></div>
            <button className="text-xs text-gray-10">save</button>

            <div className="space-y-2 pl-2 mt-2 sm:pl-3">
              {comment.kids && <>{children}</>}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
