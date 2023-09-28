"use client";

import React, { useState, useEffect } from "react";
import { Select } from "antd";
import { getListCountry } from "@/app/[locale]/(auth)/languageSetting/actions";
import { CaretDownOutlined } from "@ant-design/icons";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next-intl/client";
import { useDispatch, useSelector } from "react-redux";
import { actionChangeLanguage } from "@/app/[locale]/(auth)/system/actions";
import { useParams } from "next/navigation";

const SelectLanguage = () => {
  const dispatch = useDispatch();
  const texts = useSelector((state) => state.system.texts);
  const params = useParams();
  const locale = params.locale;
  const [dataSelect, setDataSelect] = useState([]);

  const router = useRouter();
  const pathname = usePathname();

  const changeLocate = (locale) => {
    router.replace(pathname, { locale: locale });
    dispatch(actionChangeLanguage(locale));
  };

  useEffect(() => {
    getLanguageConfig();
  }, []);

  const getLanguageConfig = async () => {
    try {
      const res = await getListCountry();
      if (res.data.status.code == 200) {
        let dataSelect = [];
        res.data?.data.forEach((i) =>
          dataSelect.push({
            value: i.countryCode,
            label: (
              <div style={{ display: "flex" }}>
                <img
                  src={i.imageUrl}
                  style={{ height: "16px", alignSelf: "center" }}
                  alt="icon"
                />

                <div className="txt-bold" style={{ marginLeft: "10px" }}>
                  {i.countryName}
                </div>
              </div>
            ),
          })
        );
        setDataSelect(dataSelect);
      }
    } catch (error) {
      setDataSelect([]);
    }
  };

  return (
    <Select
      size="middle"
      suffixIcon={<CaretDownOutlined />}
      value={locale}
      placeholder={texts.APP_SETTING_SELECT_LANGUAGE}
      onChange={(e) => changeLocate(e)}
      options={dataSelect}
      style={{ minWidth: 150 }}
    />
  );
};
export default SelectLanguage;
