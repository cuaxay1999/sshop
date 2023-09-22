import { useTranslations } from "next-intl";

export default function Test() {
  const t = useTranslations("Tests");
  return (
    <>
      <h1>{t("Test")}</h1>
    </>
  );
}
