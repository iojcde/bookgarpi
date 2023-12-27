import { Story } from "./story";

const HackerNews = async () => {
  const stories = await fetch(
    "https://hacker-news.firebaseio.com/v0/topstories.json"
  ).then((res) => res.json());

  return (
    <ol className="px-2 flex flex-col gap-1 mt-2 list-decimal">
      {stories.slice(0, 30).map((id: number, i: number) => (
        <Story story={id} key={id} order={i + 1} />
      ))}
    </ol>
  );
};

export default HackerNews;
