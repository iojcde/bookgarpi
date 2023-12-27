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
  <div className="flex gap-3 items-center border rounded-xl p-3">
    {img ? (
      <img src={img} alt="" className="aspect-square" />
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    )}

    <div className="flex flex-col ml-2">
      <div className="text-lg font-bold">{title}</div> <div>{url}</div>
      <div className="text-gray-11 text-sm">{desc}div</div>
    </div>
  </div>
);
