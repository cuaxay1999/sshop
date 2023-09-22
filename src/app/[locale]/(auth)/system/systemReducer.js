import cookie from "js-cookie";
import { NEXT_LOCALE } from "@/utils/constants/config";
import * as actions from "@/utils/constants/actions";
// import { useLocale } from "next-intl";

// const locale = useLocale()

const initialState = {
  locale: cookie.get(NEXT_LOCALE) || "en",
  isLoading: false,
  texts: {},
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
