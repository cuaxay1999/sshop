import SelectLanguage from "@/components/selectLanguage";
import AppBaner from "@/components/appBanner";
import Section1 from "./components/section1";
import Section2 from "./components/section2";
import Section3 from "./components/section3";
import Section4 from "./components/section4";
import "./css/index.scss";

const HomePage = async () => {
  return (
    <div className="landing-page home-page">
      <AppBaner />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
    </div>
  );
};
export default HomePage;
