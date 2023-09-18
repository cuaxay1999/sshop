import ROUTERS from "../constants/routers";
import moment from "moment/moment";

const has = Object.prototype.hasOwnProperty;

export const isDiff = (A, B) => JSON.stringify(A) !== JSON.stringify(B);

const allRouters = [...ROUTERS.LANDING_PAGE, ...ROUTERS.AUTH_PAGE].map((r) => ({
  ...r,
  keys: r.path.split("/:")[0].split("/"),
}));

export const isEmpty = (prop) => {
  return (
    prop === null ||
    prop === undefined ||
    (has.call(prop, "length") && prop.length === 0) ||
    (prop.constructor === Object && Object.keys(prop).length === 0)
  );
};

export const hasPermission = (profile = {}, permission = []) => {
  const { permissions: listPermissions } = profile;
  if (!listPermissions) return false;
  return !!listPermissions.find((it) => {
    return permission.indexOf(it) !== -1;
  });
};

export const trimObject = (data = {}) => {
  const newObject = {};
  for (const key in data) {
    if (data[key]) {
      newObject[key] =
        typeof data[key] == "string" ? data[key].trim() : data[key];
    }
  }
  return newObject;
};

export const convertQueryToString = (routerPath, query) => {
  if (typeof query === "object" && !isEmpty(query)) {
    const querys = [];
    Object.keys(query).forEach((key) => {
      querys.push(`${key}=${query[key]}`);
    });
    return `${routerPath}?${querys.join("&")}`;
  }
  if (typeof query === "string") {
    return `${routerPath}${query}`;
  }
  return routerPath;
};

export const getFirebaseError = (e) => {
  const error = e.toString();
  if (error.includes("auth/app-not-authorized")) {
    return "FIREBASE_ERROR_AUTH";
  }
  if (error.includes("auth/captcha-check-failed")) {
    return "FIREBASE_ERROR_CAPCHA";
  }
  if (error.includes("auth/code-expired")) {
    return "FIREBASE_ERROR_EXPIRED";
  }
  if (error.includes("auth/invalid-user-token")) {
    return "FIREBASE_ERROR_TOKEN";
  }
  if (error.includes("auth/quota-exceeded")) {
    return "FIREBASE_ERROR_QUOTA";
  }
  if (error.includes("auth/too-many-requests")) {
    return "FIREBASE_ERROR_REQUEST";
  }
  if (error.includes("auth/user-token-expired")) {
    return "FIREBASE_ERROR_TOKEN_2";
  }
  return "ERROR_AUTHEN_GENERAL_ERROR";
};

export const getRouterParams = (routerPath, params) => {
  let path = routerPath;
  const keys = routerPath
    .split("/:")
    .map((p) => p.split("/")[0])
    .filter(Boolean);

  keys.forEach((key) => {
    path = path.replace(`:${key}`, params[key]);
  });
  return path;
};

export const getRouterByName = (name) => {
  const route = allRouters.find((r) => r.name === name);
  return route
    ? {
        ...route,
        key: route.name,
      }
    : {};
};

export const formatCurrency = (value = 0, fixed = 0) => {
  let newValue = value;
  if (fixed && `${value}`.split(".")[1]?.length > fixed) {
    newValue = Number(value).toFixed(fixed);
  }

  return `${newValue} VNĐ`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const getRouterByLocation = (pathname) => {
  const route = allRouters.find(
    (r) =>
      pathname.split("/").slice(0, r.keys.length).join("/") === r.keys.join("/")
  );
  return route
    ? {
        ...route,
        key: route.name,
      }
    : null;
};

export const getDayff = (time) => {
  const NOW = new Date();

  const endTime = moment(NOW).format("YYYY-MM-DD 00:00");
  const startTime = moment(time).format("YYYY-MM-DD 00:00");

  const daydiff = moment(endTime).diff(startTime, "days");
  const weekdiff = moment(endTime).diff(startTime, "weeks");
  const monthdiff = moment(endTime).diff(startTime, "months");

  if (monthdiff > 0) {
    return `${monthdiff} tháng trước`;
  } else {
    switch (daydiff) {
      case 0:
        return `Hôm nay`;
      case 1:
        return `Hôm qua`;
      case 7:
      case 14:
      case 21:
      case 28:
        return `${weekdiff} Tuần trước`;
      default:
        return `${daydiff} ngày trước`;
    }
  }
};
