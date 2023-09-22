import { Row, Col, Button } from "antd";
import { ImgSection3 } from "@/assets/images";
import { CircleCheck } from "@/assets/icons";
import BtnRegisterSSR from "@/components/btnRegisterSSR";
import Image from "next/image";
import { useTranslations } from "next-intl";

const Section3 = () => {
  const t = useTranslations("Section3");
  return (
    <div className="section section-3">
      <div className="section-content">
        <Row gutter={[50, 20]} className="row-reverse-xs">
          <Col xs={24} md={24} lg={12} className="justify-content--right">
            <div className="ant-col__content">
              <h2 className="section-heading txt-green-color">
                {t("EFFICIENT_AND_ACCURATE_WAREHOUSE_MANAGEMENT")}
              </h2>

              <Row className="row-nowrap">
                <Image
                  src={CircleCheck}
                  alt="CircleCheck"
                  style={{
                    objectFit: "contain",
                    margin: "0 8px 0 0",
                    height: "24px",
                  }}
                  className="circle-check"
                />

                <Col>
                  <p className="paragraph">{t("SMART_REPORT_STATISTICS")}</p>
                </Col>
              </Row>

              <Row className="row-nowrap">
                <Image
                  src={CircleCheck}
                  alt="CircleCheck"
                  style={{
                    objectFit: "contain",
                    margin: "0 8px 0 0",
                    height: "24px",
                  }}
                  className="circle-check"
                />

                <Col>
                  <p className="paragraph">
                    {t("LOOK_UP_IMPORT_AND_EXPORT_HISTORY")}
                  </p>
                </Col>
              </Row>

              <Row className="row-nowrap">
                <Image
                  src={CircleCheck}
                  alt="CircleCheck"
                  style={{
                    objectFit: "contain",
                    margin: "0 8px 0 0",
                    height: "24px",
                  }}
                  className="circle-check"
                />

                <Col>
                  <p className="paragraph">
                    {t("PROVIDE_A_FULL_RANGE_OF_EXPORT")}
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
              src={ImgSection3}
              alt="ImgSection3"
              style={{ objectFit: "contain" }}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Section3;
