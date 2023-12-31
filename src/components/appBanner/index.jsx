import { Row, Col } from "antd";
import { ImageBanner1 } from "@/assets/images";
import Image from "next/image";
import BtnRegisterSSR from "../btnRegisterSSR";
import { HeightLightIcon } from "@/assets/icons";
import { useTranslations } from "next-intl";
import "./css/index.scss";

const AppBaner = () => {
  const t = useTranslations("AppBaner");
  return (
    <div className="app-banner">
      <div className="app-banner__content ">
        <div className="banner-1">
          <Row className="row-reverse-xs">
            <Col xs={24} md={24} lg={12}>
              <h1 className="banner-heading">
                {t("INTELLIGENT_SALES_MANAGEMENT_PLATFORM")}
              </h1>

              <Row gutter={[8, 8]} className="row-nowrap">
                <Col>
                  <Image
                    className="icon-sample"
                    src={HeightLightIcon}
                    alt="HeightLightIcon"
                    style={{ objectFit: "contain" }}
                  />
                </Col>
                <Col>
                  <p className="banner-title">
                    {t("SIMPLE_CONVENIENT_AND_EASY_TO_USE")}
                  </p>
                </Col>
              </Row>

              <Row gutter={[8, 8]} className="row-nowrap">
                <Col>
                  <Image
                    className="icon-sample"
                    src={HeightLightIcon}
                    alt="HeightLightIcon"
                    style={{ objectFit: "contain" }}
                  />
                </Col>
                <Col>
                  <p className="banner-title">
                    {t("OPTIMIZING_THE_SALES_PROCESS")}
                  </p>
                </Col>
              </Row>

              <Row gutter={[8, 6]} className="row-nowrap">
                <Col>
                  <Image
                    className="icon-sample"
                    src={HeightLightIcon}
                    alt="HeightLightIcon"
                    style={{ objectFit: "contain" }}
                  />
                </Col>
                <Col className="ant-col">
                  <p className="banner-title">
                    {t("COMPREHENSIVE_CUSTOMER_CARE_SOLUTION")}
                  </p>
                </Col>
              </Row>

              <div className="btns">
                <Row gutter={[20, 20]} className="row-nowrap">
                  <Col>
                    <BtnRegisterSSR txtBtn={t("LOG_IN")} />
                  </Col>

                  <Col>
                    <BtnRegisterSSR txtBtn={t("SIGN_UP_TRIAL")} />
                  </Col>
                </Row>
              </div>
            </Col>

            <Col xs={24} md={24} lg={12}>
              <Image
                src={ImageBanner1}
                alt="ImageBanner1"
                style={{ objectFit: "contain" }}
              />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default AppBaner;
