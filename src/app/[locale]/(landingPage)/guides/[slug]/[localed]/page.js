import Guide from "./guide";
import { getNewsIdFromUrl } from "@/utils/helpers/common";
import { actionGetPostsByIdAndLanguage } from "./actions";

export async function generateMetadata({ params }) {
  const newsId = getNewsIdFromUrl(params.slug);
  const data = await actionGetPostsByIdAndLanguage(newsId, params.localed);

  console.log(newsId);

  let title = data.data.data.title;
  let description = data.data.data.shortDescription
  return {
    title: title,
    description: description,
  };
}

export default async function Page({ params }) {
  return <Guide params={params}></Guide>;
}
