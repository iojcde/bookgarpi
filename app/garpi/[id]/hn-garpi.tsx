import { Comment } from "@/app/hn/stories/[id]/comment";
import { buttonVariants } from "@/components/ui/button";
export const HNGarpi = async ({ id }: { id: string }) => {
  const story = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json`
  ).then((res) => res.json());

  return (
    <div>
      <div className="text-gray-11">{story.descendants} comments</div>
      <a className={buttonVariants()} href={story.url}>
        Open
      </a>

      <div
        className="prose mt-8"
        dangerouslySetInnerHTML={{ __html: story.text || "" }}
      ></div>

      <hr className="my-2" />

      <div className="space-y-1 overflow-x-hidden mt-8">
        {story.kids?.map((id: number) => (
          <Comment isParent={true} id={id} key={id} />
        ))}
      </div>
    </div>
  );
};
