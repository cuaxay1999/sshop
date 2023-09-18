import { Button } from "antd";
import { LogoSSHOP } from "../../../assets/images";
import { MenuOutlined } from "@ant-design/icons";
import Image from "next/image";
import { PhoneIcon, EmailIcon } from "@/assets/icons";

const TopBar = (props) => {
  const { handleToggleMenuMobile } = props;

  const mail = "Letaidai@sfin.com";
  const phone = "0902.624.006";

  const handleMailTo = () => {
    window.location.href = `mailto:${mail}`;
  };

  const handleTel = () => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className="top-bar">
      <div className="top-bar__content">
        <div className="top-bar__content__left">
          <Button
            onClick={handleMailTo}
            className="txt-bold"
            type="text"
            size="small"
            icon={
              <Image src={EmailIcon} className="top-bar-icon" alt="EmailIcon" />
            }
          >
            {mail}
          </Button>

          <Button
            onClick={handleTel}
            className="txt-bold"
            type="text"
            size="small"
            icon={
              <Image src={PhoneIcon} className="top-bar-icon" alt="PhoneIcon" />
            }
          >
            {phone}
          </Button>
        </div>

        <div className="top-bar__content__right">
          <Button
            className="btn-open-menu-mobile"
            size="large"
            type="text"
            onClick={handleToggleMenuMobile}
            icon={<MenuOutlined size="large" />}
          />

          <Image
            className="app-logo"
            src={LogoSSHOP}
            alt="logo-app"
            style={{ objectFit: "contain" }}
          />

          <span>Nền tảng quản lý bán hàng thông minh</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
