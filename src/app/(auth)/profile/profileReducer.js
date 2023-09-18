import * as actions from "../../../utils/constants/actions";

const initialState = {
  userInfo: {},
};

const profile = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_PROFILE:
      return { ...state, userInfo: action.payload };
    default:
      return state;
  }
};

export default profile;
