import api from "@/utils/service/api";
import { APP_ID } from "@/utils/constants/config";

// lấy bài viết top 1
export const actionGetTop1News = (languageCode = "") => {
  return api({
    method: "get",
    url: `/news/get_top`,
    params: { languageCode, appId: APP_ID },
  });
};

// lấy danh sách danh mục
export const actionGetAllCategory = (languageCode = "") => {
  return api({
    method: "get",
    url: "/news/category/get_all",
    params: {
      languageCode,
      catName: "",
      active: true,
      appId: APP_ID,
    },
  });
};

// lấy danh sách bài viết theo danh mục và theo ngôn ngữ
export const actionGetAllNews = (params = {}) => {
  return api({
    method: "get",
    url: "/news/getAll",
    params: {
      ...params,
      appId: APP_ID,
    },
  });
};
