import api from "../../../utils/service/api";
import axios from 'axios'

const URL_API = {
    CONFIG: '/config',
    COUNTRY: '/country',
    CUSTOMERS_CONFIG: '/customers/config',
};

export const getListCountry = (params={}) => {
    return api({
        method: "get",
        url: URL_API.CONFIG + URL_API.COUNTRY,
        params,
    });
};

export const getLocaleConfigByCountryCode = (params) => {
    return api({
        method: "get",
        url: URL_API.CONFIG,
        params,
    });
};

export const getCustomerConfig = (params={}) => {
    return api({
        method: "get",
        url: URL_API.CUSTOMERS_CONFIG,
        params,
    });
};

export const updateCustomerConfigLanguage = (params) => {
    return api({
        method: "put",
        url: URL_API.CUSTOMERS_CONFIG,
        params
    });
};

export const getGeoInfo = () => {
    axios.get('https://ipinfo.io')
};