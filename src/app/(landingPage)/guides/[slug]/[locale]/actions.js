import api from "@/utils/service/api";

// lấy bài viết theo id và languageCode
export const actionGetPostsByIdAndLanguage = (id, languageCode) => {
  return api({
    method: "get",
    url: `/news/${id}`,
    params: { languageCode },
  });
};

// lấy danh sách bài viết theo danh mục và theo ngôn ngữ
export const actionGetAllNews = (params = {}) => {
  return api({
    method: "get",
    url: "/news/getAll",
    params,
  });
};
