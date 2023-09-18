import cookie from "js-cookie";
import api from "../../../utils/service/api";
import * as actionType from "../../../utils/constants/actions";
import {SSPA_LOCALE} from "../../../utils/constants/config";
import { isObject } from "lodash";

export const actionChangeLanguage = (lang) => {
  cookie.set(SSPA_LOCALE, lang);
  return {
    type: actionType.CHANGE_LANGUAGE,
    payload: lang,
  };
};

export const actionSaveLanguage = (texts) => {
  return {
    type: actionType.SAVE_LANGUAGE,
    payload: texts,
  };
};

export const actionToggleLoading = (isLoading = false) => {
  return {
    type: actionType.TOGGLE_LOADING,
    payload: isLoading,
  };
};

export const actionLogout = () => {};
export const actionRefreshToken = () => {};

export const getUserInfo = (navigate) => async (dispatch) => {
  try {
    dispatch(actionToggleLoading(true));
    const { data } = await api({ method: "get", url: `/customers/profile` });
    dispatch({ type: actionType.SET_PROFILE, payload: data?.data });
    dispatch(actionToggleLoading(false));

    if (navigate) {
     
    }
  } catch (error) {
    dispatch(actionToggleLoading(false));
  }
};

export const actionGetRegion = (params = {}) => {
  return api({ method: "get", url: `/region`, params });
};

export const actionSetSessionStorage = (key, value = "") => {
  let data = "";
  if (isObject(value)) {
    data = JSON.stringify(value);
  } else {
    data = value;
  }
  sessionStorage.setItem(key, data);
};

export const actionGetSessionStorage = (key) => {
  const data = sessionStorage.getItem(key);
  try {
    const res = JSON.parse(data);
    return res;
  } catch (error) {}

  return data;
};

export const actionRemoveSessionStorage = (key) => {
  sessionStorage.removeItem(key);
};
