"use client"

import { Button } from "antd";
import "./css/index.scss";
import Link from "next/link";
import { useParams } from "next/navigation";

const BtnRegisterSSR = ({ txtBtn }) => {
  const params = useParams();
  const locale = params.locale;
  return (
    <Button
      className="btn-register-section"
      size="large"
      type="primary"
      style={{ background: "#FEB700" }}
    >
      <Link className="linkSSR" href={`/${locale}/account`}>
        {txtBtn}
      </Link>
    </Button>
  );
};

export default BtnRegisterSSR;

