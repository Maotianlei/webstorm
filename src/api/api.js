import { generalapi, async_generalapi } from "./request";

// 通用接口post
export function api_general_p(payload, callback) {
  generalapi("post", "/other/getcomapi", payload, callback);
}

// 通用接口get
export function api_general_g(payload, callback) {
  generalapi("get", "/other/getcomapi", payload, callback);
}

// 通用同步接口post
export async function api_general_wp(payload) {
  return await async_generalapi("post", "/other/getcomapi", payload);
}

// 通用同步接口post
export async function api_general_wg(payload) {
  return await async_generalapi("get", "/other/getcomapi", payload);
}
