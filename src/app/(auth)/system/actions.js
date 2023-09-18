import cookie from "js-cookie";
import api from "../../../utils/service/api";
import * as actionType from "../../../utils/constants/actions";
import {SSPA_LOCALE} from "../../../utils/constants/config";

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

export const actionToggleLoading = (isLoading = false) => {
  return {
    type: actionType.TOGGLE_LOADING,
    payload: isLoading,
  };
};