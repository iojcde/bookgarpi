export const Bookmark = ({
  img,
  title,
  desc,
  url,
}: {
  img: string;
  title: string;
  desc: string;
  url: string;
}) => (
  <div className="flex gap-4 border rounded-xl p-4">
    {img ? (
      <img
        src={img}
        alt=""
        className="aspect-square w-8 h-8"
        width={32}
        height={32}
      />
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8 aspect-square"
        viewBox="0 0 24 24"
        width={32}
        height={32}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    )}

    <div className="flex flex-col">
      <a className="text-lg font-bold" target="_blank" href={url}>
        {title}{" "}
        <span className="text-gray-11 text-xs font-normal">
          - {url.replace("https://", "")}
        </span>
      </a>
      <div className="text-gray-11 mt-1 text-xs">{desc}</div>
    </div>
  </div>
);
