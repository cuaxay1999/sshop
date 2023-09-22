import { combineReducers } from "redux";
import system from "@/app/[locale]/(auth)/system/systemReducer";
import profile from "@/app/[locale]/(auth)/profile/profileReducer";

const rootReducer = combineReducers({
  system,
  profile,
});

export default rootReducer;
