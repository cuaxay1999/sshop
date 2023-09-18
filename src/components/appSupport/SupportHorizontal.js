import { FacebookIcon, ZaloIcon, MessengerIcon } from "@/assets/icons";
import Image from "next/image";
import "./css/index.scss";

const SupportHorizontal = (props) => {
  const {
    supportZalo = "https://zalo.me/2744995084207432799",
    supportPhone = "+84969877888",
    supportMessenger = "https://www.messenger.com/t/108259882024824",
    supportFanpage = "https://www.facebook.com/100083593861311",
  } = props;

  return (
    <div className="app-support-horizontal">
      <div>
        <a target="_blank" href={supportFanpage}>
          <Image
            src={FacebookIcon}
            className="icon-support"
            alt="FacebookIcon"
          />
        </a>
      </div>
      <div>
        <a target="_blank" href={supportMessenger}>
          <Image
            src={MessengerIcon}
            className="icon-support"
            alt="MessengerIcon"
          />
        </a>
      </div>
      <div>
        <a target="_blank" href={supportZalo}>
          <Image src={ZaloIcon} className="icon-support" alt="ZaloIcon" />
        </a>
      </div>
    </div>
  );
};

export default SupportHorizontal;
