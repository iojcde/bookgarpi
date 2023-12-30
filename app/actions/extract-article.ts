import { extract } from "@extractus/article-extractor";
export const extractArticle = async (url: string) => {
  return await extract(url);
};
