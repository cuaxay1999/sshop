import { Button } from "antd";
import "./css/index.scss";
import Link from "next/link";
import { useTranslations } from "next-intl";

const BtnRegisterSSR = ({ txtBtn }) => {
  const t = useTranslations("BtnRegisterSSR");
  return (
    <Button
      className="btn-register-section"
      size="large"
      type="primary"
      style={{ background: "#FEB700" }}
    >
      <Link className="linkSSR" href="/account">
        {txtBtn ? txtBtn : t("REGISTER_NOW")}
      </Link>
    </Button>
  );
};

export default BtnRegisterSSR;
