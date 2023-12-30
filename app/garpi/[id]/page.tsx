import { extractArticle } from "@/app/actions/extract-article";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { notFound } from "next/navigation";

const GarpiPage = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getServerSession();

  if (!session) {
    return null;
  }

  const garpi = await db.garpi.findUnique({
    where: { id, userId: session.user.id },
  });

  if (!garpi) {
    return notFound();
  }

  return (
    <div className="container py-20 max-w-prose">
      <h2>Garpi {id}</h2>

      <h1 className="text-4xl font-bold mt-4">{garpi.title}</h1>

      <div className="mt-2 text-gray-11">
        {garpi.desc || "No description found..."}
      </div>

      <Link
        href={garpi.url}
        className="text-gray-11 text-xs flex items-center mt-2"
      >
        Open
      </Link>
      <code>{JSON.stringify(garpi, null, 2)}</code>
      <div
        className="prose mt-8 "
        dangerouslySetInnerHTML={{ __html: garpi.content || "" }}
      ></div>
    </div>
  );
};

export default GarpiPage;
