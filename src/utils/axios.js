import { Toast } from 'vant';
import axios from 'axios';
import md5 from './md5.js';

const successCode = [200, '200', 0, '0'];
const codeKey = ['code', 'status'];

const service = axios.create({
    baseURL: process.env.VUE_APP_APIURL || process.env.VUE_APP_BASE_API
});

// 请求拦截
service.interceptors.request.use(
    config => {
        //get的参数
        if (config.params) {
            config.headers.sign = md5(parseParam(config.params));
        }
        //post的参数
        if (config.data) {
            config.headers.sign = md5(JSON.stringify(config.data));
        }
        return config;
    },
    error => {
        Toast(error.message || error);
        return Promise.reject(error);
    }
);

// 返回内容拦截
service.interceptors.response.use(
    response => {
        const res = response.data;
        if (isSuccess(res)) {
            return Promise.resolve(res);
        }
        Toast(res.msg || res.message);
        return Promise.reject(res);
    },
    error => {
        Toast(error.message || error);
        return Promise.reject(error);
    }
);

//json转url参数
function parseParam(param, key) {
    let paramStr = '';
    if (typeof param == 'string' || typeof param == 'number' || typeof param == 'boolean') {
        return '&' + key + '=' + encodeURIComponent(param);
    } else {
        let data = null;
        if (key) {
            data = param ? param[key] : '';
        } else {
            data = param;
        }
        for (let keyTemp in data) {
            let dataTemp = data[keyTemp];
            paramStr += parseParam(dataTemp, keyTemp);
        }
    }
    return paramStr.substr(1);
}

function isSuccess(res) {
    let flag = false;
    let codes = [].concat(codeKey);
    while (codes.length) {
        const code = codes.shift();
        const value = res[code];
        if (successCode.includes(value)) {
            return true;
        }
    }
    return flag;
}

export function get(url, data, config) {
    return service.get(url, { params: data }, config).catch(res => {
        Toast.clear();
        return Promise.reject(res);
    });
}

export function post(url, data, config) {
    return service.post(url, data, config).catch(res => {
        Toast.clear();
        return Promise.reject(res);
    });
}

export default service;
