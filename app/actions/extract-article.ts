import { extract } from "@extractus/article-extractor";
import rehypeParse from "rehype-parse";
import rehypeRemark from "rehype-remark";
import remarkStringify from "remark-stringify";
import remarkGfm from "remark-gfm";
import { unified } from "unified";

export const extractArticle = async (url: string) => {
  let data = await extract(url);
  if (data?.content) {
    const file = await unified()
      .use(rehypeParse)
      .use(rehypeRemark)
      .use(remarkGfm)
      .use(remarkStringify)
      .process(data.content);

    data.content = file.toString();
  }

  return data;
};
