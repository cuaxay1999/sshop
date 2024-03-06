export const SSHOP_SPA_TOKEN = "sshop-spa-token";
export const EXPIRED_TOKEN = 60 * 60 * 1000;
export const SSPA_CONSOLE_LOCALE = "sspa_console_locale";
export const SSPA_LOCALE = "sspa-locale";
export const NEXT_LOCALE = "NEXT_LOCALE";
export const CURRENT_CHAIN = "current-chain";
export const PHONE_PATTERN =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
export const EMAIL_PATTERN =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export { REACT_APP_KEY_GG_MAP };
export const PHONE_EMAIL_PATTERN = /^(?:(?:\+|0{0,2})[1-9]{1,4}(?:[ \.-]*[0-9]){8,14})$|^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

export const APP_IDS = {
  SSPA: "SSPA",
  SSHOP: "SSHOP",
  SSHOP_GUIDE: "SSHOP_GUIDE",
};

export const APP_ID = "SSHOP";

export const ACCOUNT_STATE = {
  GENERATE_OTP: "generate",
  VERIFY_OTP: "otp",
  REGISTER: "register",
  RESET_PWD: "reset-pwd",
  PASSWORD: "pwd",
  CHAIN_LIST: "chain-list",
};

const { REACT_APP_SERVER_BASE_URL, REACT_APP_KEY_GG_MAP, REACT_APP_DOMAIN } =
  process.env || {};

export let CONFIG_SERVER = {
  BASE_URL: REACT_APP_SERVER_BASE_URL || "https://test-apigateway.sfin.vn",
  DOMAIN: REACT_APP_DOMAIN || "sshop.asia",
};

export const CURRENCIES = [
  {
    label: "VND",
    unit: "đ",
  },
  {
    label: "USD",
    unit: "$",
  },
  {
    label: "JPY",
    unit: "Y",
  },
  {
    label: "THB",
    unit: "฿",
  },
];
