import Link from "next/link";

export const Story = async ({
  story: id,
  order,
}: {
  story: number;
  order: number;
}) => {
  const res = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json`
  );

  if (!res.ok) {
    return null;
  }
  const story = await res.json();

  return (
    <li className="rounded-md py-1 border-gray-3">
      <div>
        <a
          target="_blank"
          href={story.url || `/hn/stories/${story.id}`}
          className="font-medium"
        >
          {story.title}
          {` `}
          <span className="text-gray-11 text-xs font-normal">
            {story.url ? <>({new URL(story.url).hostname})</> : <></>}
          </span>
        </a>
      </div>

      <div className="flex gap-1 text-gray-11 text-sm items-center">
        <span>
          {story.score} points by {story.by}
        </span>
        ·<Link href={`/hn/stories/${id}`}>{story.descendants} comments</Link>
      </div>
    </li>
  );
};

