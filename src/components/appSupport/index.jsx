import {
  MessengerIcon,
  ZaloIcon,
  FacebookIcon,
  PhoneIconPng,
} from "@/assets/icons";
import Image from "next/image";
import "./css/index.scss";
import { Space } from "antd";

const AppSupport = (props) => {
  const {
    supportZalo = "https://zalo.me/2744995084207432799",
    supportPhone = "+84969877888",
    supportMessenger = "https://www.messenger.com/t/100083593861311",
    supportFanpage = "https://www.facebook.com/100083593861311",
  } = props;

  return (
    <div className="app-support">
      <Space>
        <a target="_blank" href={supportFanpage}>
          <Image
            src={FacebookIcon}
            className="icon-support"
            alt="FacebookIcon"
          />
        </a>
        <a target="_blank" href={supportMessenger}>
          <Image
            src={MessengerIcon}
            className="icon-support"
            alt="MessengerIcon"
          />
        </a>
        <a target="_blank" href={supportZalo}>
          <Image alt="ZaloIcon" src={ZaloIcon} className="icon-support" />
        </a>
        <a target="_blank" href={`tel:${supportPhone}`}>
          <Image
            src={PhoneIconPng}
            className="icon-support"
            alt="PhoneIconPng"
          />
        </a>
      </Space>
    </div>
  );
};

export default AppSupport;
