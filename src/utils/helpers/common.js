export const genNewsSlug = (title, id) => {
  // Chuyển hết sang chữ thường
  let slug = title.toLowerCase();

  // xóa dấu
  slug = slug.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, "a");
  slug = slug.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, "e");
  slug = slug.replace(/(ì|í|ị|ỉ|ĩ)/g, "i");
  slug = slug.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, "o");
  slug = slug.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, "u");
  slug = slug.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, "y");
  slug = slug.replace(/(đ)/g, "d");

  // Xóa ký tự đặc biệt
  slug = slug.replace(/([^0-9a-z-\s])/g, "");

  // Xóa khoảng trắng thay bằng ký tự -
  slug = slug.replace(/(\s+)/g, "-");

  // xóa phần dự - ở đầu
  slug = slug.replace(/^-+/g, "");

  // xóa phần dư - ở cuối
  slug = slug.replace(/-+$/g, "");

  return slug + "-" + id;
};

export const getNewsIdFromUrl = (slug = "") => {
  let arr_slug = slug.split("-");
  let id = parseInt(arr_slug[arr_slug?.length - 1]);
  return id;
};

export const navToNewsDetail = (itemTitle, itemId, languageCode, navigate) => {
  let slug = genNewsSlug(itemTitle, itemId);
  navigate(`/news/${slug}/${languageCode}`);
};

export const navToGuideDetail = (itemTitle, itemId, languageCode, navigate) => {
  let slug = genNewsSlug(itemTitle, itemId);
  navigate(`/guides/${slug}/${languageCode}`);
};

export const buildRequestParams = (params) => {
  return Object.entries(params)
    .map(([key, val]) => `${key}=${val}`)
    .join("&");
};

export const phoneRegex = /^([0]|\+*[1-9][0-9]{0,2})[1-9][0-9]{8}$/;

export const validatePhone = (phone) => {
  // let phoneRegex = /^([0]|\+*[1-9][0-9]{0,2})[1-9][0-9]{8}$/;
  return phoneRegex.test(phone);
};

export const convertOembedToIframe = (content = "") => {
  if (!content) return "";

  const regex =
    /<oembed url="https:\/\/(?:www\.)?youtube.com\/watch\?v=([^"&?/ ]+)(&[^"]+)?"><\/oembed>/g;

  return content.replace(
    regex,
    `<div style='position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;'>
        <iframe src='https://www.youtube.com/embed/$1' style='position: absolute; width: 100%; height: 100%; top: 0; left: 0;' frameborder='0' allow='autoplay; encrypted-media' allowfullscreen>
        </iframe>
    </div>`
  );
};
