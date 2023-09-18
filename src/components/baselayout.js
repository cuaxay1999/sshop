"use client";

import { Layout } from "antd";
import React, { useEffect, useState } from "react";
import {
  useSearchParams,
  useRouter,
  usePathname,
  useParams,
} from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { SSHOP_SPA_TOKEN } from "@/utils/constants/config";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-phone-number-input/style.css";
import "antd/es/style/reset.css";
import { actionChangeLanguage } from "@/app/(auth)/system/actions";

import {
  getLocaleConfigByCountryCode,
  updateCustomerConfigLanguage,
} from "../app/(auth)/languageSetting/actions";
import { actionSaveLanguage, getUserInfo } from "../app/(auth)/system/actions";
import { isEmpty } from "@/utils/helpers";

import { navigatePages } from "@/utils/helpers/navigate";

export default function BaseLayout({ children }) {
  const [isMobile, setIsMobile] = useState(false);
  const { push } = useRouter();
  if (typeof window !== "undefined") {
    window.navigatePage = (name, params = {}, query = {}) =>
      navigatePages(push, name, params, query);
    window.isMobile = isMobile;
  }

  const dispatch = useDispatch();
  const pathName = usePathname();
  const params = useParams();

  ["/ja", "/en", "/vi"].includes(pathName) &&
    dispatch(actionChangeLanguage(params.locale));

  const locale = useSelector((state) => state.system.locale);

  const userInfo = useSelector((state) => state.profile.userInfo);

  const urlParams = useSearchParams();
  const paramUserToken = urlParams.get("user-token");

  useEffect(() => {
    let token = Cookies.get(SSHOP_SPA_TOKEN);

    if (paramUserToken) {
      Cookies.set(SSHOP_SPA_TOKEN, paramUserToken, { expires: 1 });
      token = paramUserToken;
    }

    if (token) {
      handleGetUserInfo();
    }

    if (window.innerWidth <= 1023) {
      setIsMobile(true);
    }
  }, []);

  useEffect(() => {
    getLanguageText();
    if (!isEmpty(userInfo)) {
      updateCustomerConfigLanguage({ countryCode: locale });
    }
  }, [locale]);

  const handleGetUserInfo = async () => {
    try {
      dispatch(getUserInfo(navigate));
    } catch (error) {}
  };

  const getLanguageText = async () => {
    const res = await getLocaleConfigByCountryCode({
      countryCode: locale,
      filter: "CLINIC",
    });
    if (res.data.status.code == 200) {
      let texts = {};
      res.data.data.forEach((e) => {
        texts = { ...texts, ...e };
      });
      dispatch(actionSaveLanguage(texts));
    }
  };

  return <Layout className="app-container">{children}</Layout>;
}
