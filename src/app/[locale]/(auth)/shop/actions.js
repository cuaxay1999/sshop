import api from "@/utils/service/api";

export const actionAddShop = (customerId, data = {}) => {
  return api({
    method: "post",
    url: `/shops/profile?appId=sshop`,
    data,
    params: { customerId },
  });
};

export const actionAddInventory = (shopId, data = {}) => {
  return api({ method: "post", url: `/shops/${shopId}/inventory`, data });
};

export const actionAddChain = (data = {}) => {
  return api({ method: "post", url: `/chain-profile/create`, data });
};

export const getShopCategories = () => {
  return api({ method: "get", url: `/categories` });
};

export const createDataSample = (params) => {
  return api({
    method: "post",
    url: `/spa/on-boarding/create-sample`,
    data: params,
    params,
  });
};
