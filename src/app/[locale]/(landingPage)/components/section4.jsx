import { Row, Col, Button } from "antd";
import { ImgSection4 } from "@/assets/images";
import { CircleCheck } from "@/assets/icons";
import BtnRegisterSSR from "@/components/btnRegisterSSR";
import Image from "next/image";
import { useTranslations } from "next-intl";

const Section4 = () => {
  const t = useTranslations("Section4");
  return (
    <div className="section section-4">
      <div className="section-content">
        <Row gutter={[0, 20]} className="row-reverse-xs">
          <Col xs={24} md={24} lg={12} className="justify-content--right">
            <div className="ant-col__content">
              <Row>
                <Col span={24}>
                  <h3 className="ant-col__content__title">
                    <Image
                      src={CircleCheck}
                      alt="CricleCheck"
                      style={{
                        objectFit: "contain",
                        margin: "0px 8px 0px 0px",
                        height: "24px",
                      }}
                      className="circle-check"
                    />
                    {t("SELL_RIGHT_ON_THE_PHONE")}
                  </h3>

                  <p className="paragraph">
                    {t("SALES_MANAGEMENT_APPLICATION")}
                  </p>
                </Col>

                <Col span={24}>
                  <h3 className="ant-col__content__title">
                    <Image
                      src={CircleCheck}
                      alt="CricleCheck"
                      style={{
                        objectFit: "contain",
                        margin: "0px 8px 0px 0px",
                        height: "24px",
                      }}
                      className="circle-check"
                    />
                    {t("VIEW_REPORTS_ANYTIME_ANYWHERE")}
                  </h3>

                  <p className="paragraph">
                    {t("SALES_SOFTWARE_ON_THE_PHONE_WILL")}
                  </p>
                </Col>

                <Col span={24}>
                  <h3 className="ant-col__content__title">
                    <Image
                      src={CircleCheck}
                      alt="CricleCheck"
                      style={{
                        objectFit: "contain",
                        margin: "0px 8px 0px 0px",
                        height: "24px",
                      }}
                      className="circle-check"
                    />
                    {t("COMPATIBLE_WITH_ALL_MOBILE_DEVICES")}
                  </h3>

                  <p className="paragraph">
                    {t("THE_SSHOP_APPLICATION_IS_AVAILABLE")}
                  </p>
                </Col>
              </Row>

              <Row>
                <BtnRegisterSSR />
              </Row>
            </div>
          </Col>

          <Col xs={24} md={24} lg={12}>
            <Image
              src={ImgSection4}
              alt="ImgSection4"
              style={{ objectFit: "contain" }}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Section4;
