import Link from "next/link";

export const Nav = ({
  subpage,
  subpageHref,
}: {
  subpage?: string;
  subpageHref?: string;
}) => (
  <nav className="container py-2 border-b">
    <Link href="/" className="font-bold  font-display text-lg">
      Garpi{" "}
    </Link>{" "}
    {subpage && subpageHref && (
      <Link href={subpageHref} className="font-medium text-gray-10">
        / {subpage}
      </Link>
    )}
  </nav>
);
