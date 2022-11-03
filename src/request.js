import axios from 'axios';
import {message} from 'antd';
import {get} from 'lodash';
// import Cookies from 'js-cookie';
// import { clearAllCache } from '@admin/common/utils/tools';

axios.defaults.headers = {'Access-Control-Allow-Origin': '*',}
let instance = axios.create({
    baseURL: "http://localhost:7852"
})

// 错误设置
window.ToastError = () => message.error()

// 添加请求拦截器
instance.interceptors.request.use((config) => {
    // 在发送请求之前做些什么
    config.headers = {
        ...config.headers,
        // token
        // Authorization: Cookies.get(FRONT_AUTH_KEY)
    }
    // get请求映射params参数
    if (config.method === 'get' && config.params) {
        let url = config.url + '?'
        for (const propName of Object.keys(config.params)) {
            const value = config.params[propName]
            var part = encodeURIComponent(propName) + '='
            if (value !== null && typeof (value) !== 'undefined') {
                if (typeof value === 'object') {
                    for (const key of Object.keys(value)) {
                        const currentValue = value[key];
                        if(currentValue !== undefined) {
                            const params = propName + '[' + key + ']'
                            var subPart = encodeURIComponent(params) + '='
                            url += subPart + encodeURIComponent(currentValue) + '&'
                        }
                    }
                } else {
                    url += part + encodeURIComponent(value) + '&'
                }
            }
        }
        url = url.slice(0, -1)
        config.params = {}
        config.url = url
    }

    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use((response) => {
    errorCodeResolve(response, response.data)
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    message.error('服务器异常，请稍后再试！')
    return Promise.reject(error);
});

/**
 * 处理各种错误代码情况（针对请求成功Restful返回错误情况）
 */
function errorCodeResolve(response, {data, code, message: msg}) {
    switch (code) {
        case 401:
            message.error(msg || '登录过期或未登录，请重新登录！');
            window.location.replace('/#/login');
            // clearAllCache();
            break;
        case 403:
            message.error(msg || '没有权限，请联系管理员授权！');
            break;
        case 500:
            message.error(msg || '服务器异常，请稍后再试！');
            break;
    }
}

export default instance