import { combineReducers } from "redux";
import system from "../../app/(auth)/system/systemReducer";
import profile from "../../app/(auth)/profile/profileReducer";

const rootReducer = combineReducers({
  system,
  profile,
});

export default rootReducer;
