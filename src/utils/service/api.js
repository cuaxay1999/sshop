import axios from "axios";
import cookie from "js-cookie";
import Qs from "qs";

import { SSHOP_SPA_TOKEN, CONFIG_SERVER, route } from "../constants/config";

const request = axios.create();

request.interceptors.request.use(
  (config) => {
    // if (config.url.indexOf(tokenUrl) !== -1) {
    //   delete config.headers.Authorization;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error.response || { data: {} });
  }
);

request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      (error.response && error.response.status === 401) ||
      !cookie.get(SSHOP_SPA_TOKEN)
    ) {
      cookie.remove(SSHOP_SPA_TOKEN);
    } else {
      return Promise.reject(error?.response || { data: {} });
    }
  }
);

const api = (options) => {
  let config = {
    baseURL: CONFIG_SERVER.BASE_URL,
    ...options,
    paramsSerializer: (params) =>
      Qs.stringify(params, { arrayFormat: "repeat" }),
    headers: {
      ...options.headers,
    },
  };
  if (cookie.get(SSHOP_SPA_TOKEN)) {
    config.headers.Authorization = `${cookie.get(SSHOP_SPA_TOKEN)}`;
    config.headers.appId = 'SSHOP';
  }
  return request(config);
};

export const apiOther = (options) => {
  let config = {
    baseURL: CONFIG_SERVER.BASE_URL,
    ...options,
    paramsSerializer: (params) =>
      Qs.stringify(params, { arrayFormat: "repeat" }),
    headers: {
      ...options.headers,
    },
  };
  return request(config);
};

export default api;
