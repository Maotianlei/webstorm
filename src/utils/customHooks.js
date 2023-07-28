import { useEffect } from "react";

/**
 * 元素外部点击,调用回调函数
 * @date 2023-05-12
 * @param {reactref} ref react的ref绑定的点击的元素
 * @param {function} callback 回调函数
 */
function useClickOutside(ref, callback) {
  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  function handleClick(e) {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  }
}

/**
 * 元素内部点击,调用回调函数
 * @date 2023-05-12
 * @param {reactref} ref react的ref绑定的点击的元素
 * @param {function} callback 回调函数
 */
function useClickInside(ref, callback) {
  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  function handleClick(e) {
    if (ref.current && ref.current.contains(e.target)) {
      callback();
    }
  }
}

const customHooks = {
  useClickOutside,
  useClickInside,
};

export default customHooks;
