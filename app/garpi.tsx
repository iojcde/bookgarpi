import { LinkIcon } from "./components/link-icon";

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
  <div className="flex gap-4 border items-start rounded-xl p-4">
    {img ? (
      <img
        src={img}
        alt=""
        className="aspect-square w-8 h-8"
        width={32}
        height={32}
      />
    ) : (
      <LinkIcon />
    )}

    <div>
      <a className="text-lg font-bold leading-none" target="_blank" href={url}>
        {title}{" "}
        <span className="text-gray-11 text-xs font-normal">
          - {url.replace("https://", "")}
        </span>
      </a>
      <div className="text-gray-11 mt-1 text-xs">{desc}</div>
    </div>

    {/* <GarpiActions/> */}
  </div>
);
