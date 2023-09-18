import api from '../../../utils/service/api';
import * as actionType from '../../../utils/constants/actions';

export const actionSetProfile = (data = {}) => {
  return {
    type: actionType.SET_PROFILE,
    payload: data,
  };
};

export const actionUpdateProfile = (id, data = {}) => {
  return api({ method: 'put', url: `/customers/${id}`, data });
};

export const actionUploadAvatar = (id, data = {}) => {
  return api({ method: 'put', url: `/customers/${id}/avatar`, data });
};
