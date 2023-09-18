import api from "../../../utils/service/api";
import * as actionType from "../../../utils/constants/actions";

export const actionSetProfile = (data = {}) => {
  return {
    type: actionType.SET_PROFILE,
    payload: data,
  };
};

export const actionAddChain = (data = {}) => {
  return api({ method: "post", url: `/chain-profile/create?appId=sshop`, data });
};