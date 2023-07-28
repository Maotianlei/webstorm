import Cookies from "js-cookie";

// 储存用户信息
export function set_usercookie(params) {
  Cookies.set("token", JSON.stringify(params));
}

// 获取用户信息
export function get_usercookie() {
  return Cookies.get("token");
}

// 删除用户信息
export function del_usercookie() {
  Cookies.remove("token");
}

// 储存other
export function set_othercookie(key, params) {
  Cookies.set(key, JSON.stringify(params));
}

// 获取other
export function get_othercookie(key) {
  return Cookies.get(key);
}

// 删除other
export function del_othercookie(key) {
  Cookies.remove(key);
}
