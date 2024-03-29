import Link from "next/link";
import { Comment } from "./comment";
import { Suspense } from "react";
import { SaveButton } from "./save-button";
import { notFound } from "next/navigation";

const StoryPage = async ({ params: { id } }: { params: { id: number } }) => {
  const res = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json`
  );

  if (!res.ok) {
    return null;
  }
  const story = await res.json();

  if (!story) {
    return notFound();
  }

  return (
    <div className="rounded-md mt-4 py-1 ">
      <div>
        <a
          target="_blank"
          href={story.url || `/hn/stories/${story.id}`}
          className="font-semibold"
        >
          {story.title}
          {` `}
          <span className="text-gray-11 text-xs font-normal">
            {story.url ? <>({new URL(story.url).hostname})</> : <></>}
          </span>
        </a>
      </div>

      <div className="flex gap-1 items-center text-gray-11 text-sm">
        <span>
          {story.score} points by {story.by}
        </span>
        ·<Link href={`/hn/stories/${id}`}>{story.descendants} comments</Link>·
        <SaveButton url={`https://bookgarpi.vercel.app/hn/stories/${id}`} />
      </div>

      {story.text && (
        <div
          className="my-4 prose-sm prose prose-radix"
          dangerouslySetInnerHTML={{ __html: story.text }}
        />
      )}

      <hr className="my-2" />

      <div className="space-y-1 overflow-x-hidden mt-8">
        {story.kids?.map((id: number) => (
          <Comment isParent={true} id={id} key={id} />
        ))}
      </div>
    </div>
  );
};

export async function generateStaticParams() {
  const stories = await fetch(
    "https://hacker-news.firebaseio.com/v0/topstories.json",
    { next: { revalidate: 3600 } }
  ).then((res) => res.json());

  return stories.slice(0, 30).map((id: number) => ({
    id: id.toString(),
  }));
}

export default StoryPage;

export async function generateMetadata({
  params: { id },
}: {
  params: { id: number };
}) {
  const res = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json`
  );

  if (!res.ok) {
    return null;
  }
  const story = await res.json();

  return {
    title: `${story.title} | Bookgarpi HN`,
    description: story.text,
  };
}
