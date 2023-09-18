import Section1 from "../components/section1";
import Section2 from "../components/section2";
import Section3 from "../components/section3";
import Section4 from "../components/section4";
import AppBanner from "@/components/appBanner";

import "../css/index.scss";
import { getLocaleConfigByCountryCode } from "@/app/(auth)/languageSetting/actions";

const HomePage = async ({ params }) => {
  const { locale } = params;
  let texts = {};

  const getLangueText = async () => {
    const res = await getLocaleConfigByCountryCode({
      countryCode: locale,
      filter: "SSHOP",
    });

    if (res.data.status.code == 200) {
      res.data.data.forEach((e) => {
        texts = { ...texts, ...e };
      });
    }
  };

  await getLangueText();

  return (
    <div className="landing-page home-page">
      <AppBanner texts={texts} />
      <Section1 texts={texts} />
      <Section2 texts={texts} />
      <Section3 texts={texts} />
      <Section4 texts={texts} />
    </div>
  );
};

export default HomePage;
