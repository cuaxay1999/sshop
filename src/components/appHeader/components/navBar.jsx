"use client";

import { LogoSSHOP } from "../../../assets/images";
import ROUTERS from "../../../utils/constants/routers";
import { Menu, Button } from "antd";
import { PhoneFilled } from "@ant-design/icons";
import SelectLanguage from "../../selectLanguage";
import { getRouterByLocation } from "../../../utils/helpers";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const NavBar = (props) => {
  const { handleToggleMenuMobile } = props;
  const pathname = usePathname();
  const texts = useSelector((state) => state.system.texts);

  const locale = useSelector((state) => state.system.locale);

  const generateLink = (path) => {
    return `/${locale}${path}`;
  };

  const itemButton = ROUTERS.LANDING_PAGE.filter((it) => it.onMenu).map(
    (it) => ({
      label: (
        <Link href={`${generateLink(it.path, it.name)}`}>
          {texts[it?.label]}
        </Link>
      ),
      key: it?.name,
      icon: typeof window !== "undefined" && window.isMobile ? it?.icon : null,
    })
  );

  const callSupport = () => {
    window.open(`tel:${texts?.SUPPORT_PHONE}`);
  };

  return (
    <div className="nav-bar" onClick={handleToggleMenuMobile}>
      <div className="nav-bar__content" onClick={(e) => e.stopPropagation()}>
        {typeof window !== "undefined" && window.isMobile && (
          <Image
            className="logo-only-mobile"
            src={LogoSSHOP}
            alt="LogoSSHOP"
            style={{ objectFit: "contain" }}
          />
        )}

        <Menu
          defaultOpenKeys={getRouterByLocation(pathname)?.name}
          selectedKeys={getRouterByLocation(pathname)?.name}
          mode={
            typeof window !== "undefined" && window.isMobile
              ? "vertical"
              : "horizontal"
          }
          items={[
            ...itemButton,
            {
              label: <SelectLanguage />,
              key: "SELECT_LANGUAGE",
            },
            {
              label: (
                <Button
                  icon={<PhoneFilled />}
                  size={"large"}
                  className="button-primary-outline"
                  onClick={callSupport}
                >
                  {texts?.SUPPORT_PHONE?.replace("+84", "0")}
                </Button>
              ),
              key: "BUTTON_PHONE",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default NavBar;
