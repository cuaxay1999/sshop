import News from "./news";
import { getNewsIdFromUrl } from "@/utils/helpers/common";
import { actionGetPostsByIdAndLanguage } from "./actions";

export async function generateMetadata({ params }) {
  const newsId = getNewsIdFromUrl(params.slug);
  const data = await actionGetPostsByIdAndLanguage(newsId, params.locale);

  console.log(newsId);

  let title = data.data.data.title;
  return {
    title: title,
    description: title,
  };
}

export default async function Page({ params }) {
  return <News params={params}></News>;
}
