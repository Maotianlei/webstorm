import axios from "axios";
import axiosRetry from "axios-retry";
import { addload, removeload } from "@/utils/stylemethods";
import { mergejson } from "@/utils/handlejson";
import { messagetip } from "@/utils/stylemethods";
import { get_usercookie } from "@/utils/cookieUtils";

const axiosInstance = axios.create({
  baseURL: window.config.baseURL,
  timeout: 5000,
  headers: {
    Authorization: get_usercookie(),
  },
});

/**
 * 接口失败重新调用次数，从0开始计数
 * @date 2023-07-14
 * @param {any} axiosInstance
 * @param {any} {retries:2}
 */
axiosRetry(axiosInstance, { retries: 2 });

// Do something before request is sent,调接口前处理
axiosInstance.interceptors.request.use(
  function (config) {
    addload();
    return config;
  },
  function (error) {
    removeload();
    return Promise.reject(error);
  }
);

// Do something with response data,调完接口处理
axiosInstance.interceptors.response.use(
  function (response) {
    removeload();
    return response;
  },
  function (error) {
    removeload();
    return Promise.reject(error);
  }
);

// 默认提示
const defaultcallback = {
  success: (res) => {
    messagetip("success", res.msg);
  },
  error: (res) => {
    messagetip("error", res?.msg);
  },
};

/**
 * 通用请求的方法
 * @date 2023-07-14
 * @param {string} type 请求方式 post/get
 * @param {string} url 请求地址
 * @param {object} payload 载荷数据
 * @param {
 *          success:()=>{},成功回调
 *          error:()=>{},失败回调
 * } callback 回调
 */
export function generalapi(type, url, payload, callback) {
  callback = mergejson(defaultcallback, callback);
  axiosInstance[type](window.config.baseURL + url, payload)
    .then(function (res) {
      if (res.data.code == "2") {
        //登录失效
        callback.error(res.data, payload);
        return;
      }
      callback.success(res.data, payload);
    })
    .catch(function (err, ret) {
      callback.error(ret?.data, payload);
    });
}

/**
 * 通用同步请求的方法
 * @date 2023-07-14
 * @param {string} type 请求方式 post/get
 * @param {string} url 请求地址
 * @param {object} payload 载荷数据
 * @param {
 *          success:()=>{},成功回调
 *          error:()=>{},失败回调
 * } callback 回调
 */
export async function async_generalapi(type, url, payload, callback) {
  callback = mergejson(defaultcallback, callback);
  return await axiosInstance[type](window.config.baseURL + url, payload)
    .then(function (res) {
      let returnparam = { res: res.data, payload };
      if (res.data.code == "2") {
        return returnparam;
      }
      callback.success(res.data, payload);
      return returnparam;
    })
    .catch(function (err, ret) {
      let returnparam = { res: ret?.data, payload };
      return returnparam;
    });
}
