import { Row, Col, Button } from "antd";
import { ImgSection2 } from "@/assets/images";
import { CircleCheck } from "@/assets/icons";
import BtnRegisterSSR from "@/components/btnRegisterSSR";
import Image from "next/image";

const Section2 = ({ texts }) => {
  return (
    <div className="section section-2">
      <div className="section-content">
        <Row gutter={[50, 20]}>
          <Col xs={24} md={24} lg={12}>
            <Image
              src={ImgSection2}
              alt="ImgSection2"
              style={{ objectFit: "contain" }}
            />
          </Col>

          <Col xs={24} md={24} lg={12}>
            <div className="ant-col__content">
              <h2 className="section-heading txt-green-color">
                {texts?.PIONEERING_IN_PROVIDING_ONLINE_AND_OFFLINE}
              </h2>

              <p className="paragraph">
                <span className="txt-sshop"></span>
              </p>

              <Row className="row-nowrap">
                <Image
                  src={CircleCheck}
                  alt="CircleCheck"
                  style={{
                    objectFit: "contain",
                    margin: "-2px 8px 0 0",
                    height: "24px",
                  }}
                  className="circle-check"
                />

                <Col>
                  <p className="paragraph">
                    {texts?.CREATE_A_CHAIN_OF_STORES_FUNCTIONAL}
                  </p>
                </Col>
              </Row>

              <Row className="row-nowrap">
                <Image
                  src={CircleCheck}
                  alt="CircleCheck"
                  style={{
                    objectFit: "contain",
                    margin: "-2px 8px 0 0",
                    height: "24px",
                  }}
                  className="circle-check"
                />

                <Col>
                  <p className="paragraph">{texts?.APPLYING_AI_TECHNOLOGY}</p>
                </Col>
              </Row>

              <Row className="row-nowrap">
                <Image
                  src={CircleCheck}
                  alt="CircleCheck"
                  style={{
                    objectFit: "contain",
                    margin: "-2px 8px 0 0",
                    height: "24px",
                  }}
                  className="circle-check"
                />

                <Col>
                  <p className="paragraph">{texts?.CAPTURE_CUSTOMER_NEEDS}</p>
                </Col>
              </Row>

              <Row>
                <BtnRegisterSSR texts={texts} />
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Section2;
