/**
 * 获取json的指定值，获取不到返回vdefault
 * @date 2023-05-09
 * @param {object} json
 * @param {string} key
 * @param {any} vdefault
 * @returns {any}
 */
export function getvalue(json, key, vdefault) {
  if (key in json && json[key] != undefined) {
    return json[key];
  }
  return vdefault;
}

/**
 * 合并json，排在越后面的权重越高
 * @date 2023-05-09
 * @returns {any}
 */
export function mergejson() {
  let newJson = {};
  for (let i in arguments) {
    newJson = Object.assign(newJson, arguments[i]);
  }
  return newJson;
}
