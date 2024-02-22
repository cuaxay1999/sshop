import { AppStore, GooglePlay } from "../../assets/images";
import { useSelector } from "react-redux";
import Image from "next/image";
import { Row, Col, Button, Form } from "antd";
import { PhoneIconSolid, EmailIconSolid, LocationIcon } from "@/assets/icons";

import "./css/index.scss";

function LinkAppStore(props) {
  const {
    linkAppIos = "https://apps.apple.com/vn/app/sshop-s%E1%BB%95-b%C3%A1n-h%C3%A0ng/id1629584008",
    linkAppAndroid = "https://play.google.com/store/apps/details?id=sfin.sshop.vn",
  } = props;

  return (
    <Row gutter={[24, 24]}>
      <Col span={12} lg={12} md={12} sm={12} xs={12}>
        <a target="_blank" href={linkAppAndroid}>
          <Image className="w-full" src={GooglePlay} alt="GooglePlay" />
        </a>
      </Col>

      <Col span={12} lg={12} md={12} sm={12} xs={12}>
        <a target="_blank" href={linkAppIos}>
          <Image className="w-full" src={AppStore} alt="AppStore" />
        </a>
      </Col>
    </Row>
  );
}

const AppFooter = () => {
  const texts = useSelector((state) => state.system.texts);

  const gutterHorizontal = 40;
  const gutterVertical = 20;
  return (
    <div className="app-footer">
      <div className="app-footer__content">
        <Row gutter={[gutterHorizontal, gutterVertical]}>
          <Col xs={24} md={24} lg={14}>
            <h2 className="app-footer__content__heading">
              {texts?.OWNERS_AND_DEVELOPMENT_UNIT}
            </h2>

            <h4 className="app-footer__content__sub-heading">
              {texts?.SFIN_SMART_JSC}
            </h4>

            <Row gutter={[8, 0]} className="row-nowrap">
              <Image
                src={LocationIcon}
                alt="Icon"
                className="icon-footer"
                style={{ margin: "5px 5px 0 0" }}
              />

              <Col>
                <p className="paragraph">{texts?.SFIN_ADDRESS}</p>
              </Col>
            </Row>

            <Row gutter={[8, 0]} className="row-nowrap">
              <Image src={PhoneIconSolid} alt="Icon" className="icon-footer" />

              <Col>
                <p className="paragraph">
                  {texts?.LABEL_HOTLINE}:{" "}
                  <a href={`tel:${texts?.SUPPORT_PHONE}`}>
                    {texts?.SUPPORT_PHONE}
                  </a>
                </p>
              </Col>
            </Row>

            <Row gutter={[8, 0]} className="row-nowrap">
              <Image
                src={EmailIconSolid}
                alt="Icon"
                className="icon-footer"
                style={{ marginTop: "2px" }}
              />

              <Col>
                <p className="paragraph">
                  {texts?.LABEL_EMAIL}:{" "}
                  <a href={`mailto:${texts?.SUPPORT_EMAIL}`}>
                    {texts?.SUPPORT_EMAIL}
                  </a>
                </p>
              </Col>
            </Row>
          </Col>

          <Col xs={24} md={24} lg={10}>
            <h2 className="app-footer__content__heading">
              {texts?.COOPERATION_AND_CUSTOMER_CARE_UNIT}
            </h2>

            <h4 className="app-footer__content__sub-heading">
              {texts?.GOL_SOFTWARE_COMPANY_LIMITED}
            </h4>

            <Row gutter={[8, 0]} className="row-nowrap">
              <Image
                src={LocationIcon}
                alt="Icon"
                className="icon-footer"
                style={{ margin: "5px 5px 0 0" }}
              />

              <Col>
                <p className="paragraph">{texts?.GOL_PHONE_CONTACT}</p>
              </Col>
            </Row>

            <Row gutter={[8, 0]} className="row-nowrap">
              <Image src={PhoneIconSolid} alt="Icon" className="icon-footer" />

              <Col>
                <p className="paragraph">
                  {texts?.LABEL_HOTLINE}:{" "}
                  <a href={`tel:${texts?.GOL_HOTLINE}`}>{texts?.GOL_HOTLINE}</a>
                </p>
              </Col>
            </Row>

            <Row gutter={[8, 0]} className="row-nowrap">
              <Image
                src={EmailIconSolid}
                alt="Icon"
                className="icon-footer"
                style={{ marginTop: "2px" }}
              />

              <Col>
                <p className="paragraph">
                  {texts?.LABEL_EMAIL}:{" "}
                  <a href={`mailto:${texts?.SSHOP_SUPPORT_EMAIL_GOLSOFT}`}>
                    {texts?.SSHOP_SUPPORT_EMAIL_GOLSOFT}
                  </a>
                </p>
              </Col>
            </Row>
          </Col>

          <Col xs={24} md={24} lg={14}>
            <h2 className="app-footer__content__heading">
              {texts?.CERTIFICATION}
            </h2>

            <p className="paragraph">{`
              ${texts?.BUSINESS_LIECENSE}: 0109959309`
            }</p>
            <p className="paragraph">{`
              ${texts?.DATED} : 07/04/2022, ${texts?.BY_BRO}`
            }</p>
          </Col>

          <Col xs={12} md={12} lg={10}>
            <LinkAppStore
              linkAppIos={texts?.LINK_APP_IOS}
              linkAppAndroid={texts?.LINK_APP_ANDROID}
            />

            {/*<Row gutter={[12, 0]}>*/}
            {/*<Col span={12}>*/}
            {/*<a target='_blank' href={texts?.LINK_APP_ANDROID || 'https://play.google.com/store/apps/details?id=sfin.sshop.vn'}>*/}
            {/*<img className='w-full' src={GooglePlay} />*/}
            {/*</a>*/}
            {/*</Col>*/}

            {/*<Col span={12}>*/}
            {/*<a target='_blank' href={texts?.LINK_APP_IOS || 'https://apps.apple.com/vn/app/sshop-s%E1%BB%95-b%C3%A1n-h%C3%A0ng/id1629584008'}>*/}
            {/*<img className='w-full' src={AppStore} />*/}
            {/*</a>*/}
            {/*</Col>*/}

            {/*<Col span={24}>*/}
            {/*<AppSupport />*/}
            {/*</Col>*/}
            {/*</Row>*/}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AppFooter;
