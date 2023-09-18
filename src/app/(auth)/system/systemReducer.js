import cookie from "js-cookie";
import {SSPA_LOCALE} from "../../../utils/constants/config";
import * as actions from "../../../utils/constants/actions";

const initialState = {
  locale: cookie.get(SSPA_LOCALE) || "vi",
  isLoading: false,
  texts: {}
};

const system = (state = initialState, action) => {
  switch (action.type) {
    case actions.CHANGE_LANGUAGE:
      return { ...state, locale: action.payload };
    case actions.SAVE_LANGUAGE:
      return { ...state, texts: action.payload };
    case actions.TOGGLE_LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

export default system;
