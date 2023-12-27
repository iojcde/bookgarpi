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
    <div className={!isParent ? "border-l pl-3" : ""}>
      <div className="text-sm text-gray-10 ">
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

      <div className="mb-2">
        {open && (
          <>
            <div
              className=" prose-sm max-w-none last:prose-p:mb-0 text-black"
              dangerouslySetInnerHTML={{ __html: comment.text }}
            ></div>
            <button className="text-xs text-gray-10">save</button>

            <div className="space-y-2 pl-3">
              {comment.kids && <>{children}</>}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
