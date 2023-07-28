/**
 * 生成32位guid
 * @date 2023-05-09
 * @returns {string}
 */
export function guid32() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return `${S4()}-${S4()}-${S4()}-${S4()}-${S4()}-${S4()}`;
}

/**
 * 判断浏览器设备
 * @date 2023-07-14
 * @returns {boolean} true/false 移动/pc
 */
export function judge_device() {
  let sUserAgent = navigator.userAgent;
  if (
    sUserAgent.indexOf("Android") > -1 ||
    sUserAgent.indexOf("iPhone") > -1 ||
    sUserAgent.indexOf("iPad") > -1 ||
    sUserAgent.indexOf("iPod") > -1 ||
    sUserAgent.indexOf("Symbian") > -1
  ) {
    return true;
  }
  return false;
}
