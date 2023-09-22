"use client";

import { COLUMNS_BANG_GIA, Tick } from "./constans";
import "./Styles.scss";
import { useSelector } from "react-redux";
import { Col, Row } from "antd";
import Image from "next/image";

function PricingPage() {
  const texts = useSelector((state) => state.system.texts);

  return (
    <div className="news-page">
      <div className="page-content">
        <h2 className="section-heading" style={{ marginTop: 20 }}>
          {texts?.PRICE_LIST_SPA}
        </h2>

        <Row gutter={[24, 24]}>
          {COLUMNS_BANG_GIA.map((column, index) => (
            <Col style={{ width: "100%" }} md={8} key={index}>
              <div className="feature-box">
                {/* phần giá và tên gói */}
                <div className={"pricing-header package-0" + index}>
                  <div className="pricing-text">
                    <span className="name">{column.name.toUpperCase()}</span>
                  </div>
                  <div className="pricing-value">
                    <span className="price">{column.price}</span>
                  </div>
                </div>
                <div className="feature-detail">
                  <div className="column-content-bottom">
                    {/* render các tính năng nổi bật */}
                    {column.tinh_nang_noi_bat.map((tinhNang, index) => (
                      <p className="tinh-nang-noi-bat" key={index}>
                        <Image
                          alt="Tick Icon"
                          className="icon-tick"
                          src={Tick}
                        />
                        <span style={{ marginLeft: 8 }}>{tinhNang}</span>
                      </p>
                    ))}

                    {/* render các tính năng thường */}
                    {column.tinh_nang_thuong.map((tinhNang, index) => (
                      <p className="tinh-nang-thuong" key={index}>
                        <Image
                          alt="Tick Icon"
                          className="icon-tick"
                          src={Tick}
                        />
                        <span style={{ marginLeft: 8 }}>{tinhNang}</span>
                      </p>
                    ))}

                    <div className="box-color"></div>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        <div style={{ marginTop: 100 }}></div>
      </div>
    </div>
  );
}

export default PricingPage;
