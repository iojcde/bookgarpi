import { CommentContent } from "./comment-content";

export const Comment = async ({
  id,
  isParent,
}: {
  id: number;
  isParent: boolean;
}) => {
  const res = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json`
  );

  if (!res.ok) {
    return null;
  }
  const comment = await res.json();

  return (
    <CommentContent isParent={isParent} comment={comment}>
      {comment.kids?.map((id: number) => (
        <Comment isParent={false} id={id} key={id} />
      ))}
    </CommentContent>
  );
};
