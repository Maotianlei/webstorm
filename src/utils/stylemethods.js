import ReactDOM from "react-dom";
import { guid32 } from "@/utils/pubilcmethods";
import RenderFloatDom from "@/component/General/RenderFloatDom/RenderFloatDom.jsx";
import Nprogress from "nprogress";
import "@/style/component/Nprogress.css";
import { message } from "antd";

/**
 * 切换主题功能
 * @date 2023-06-26
 * @param {} e 点击事件
 * @param {
 *          themes:"",根据支持的样式传入对应的值
 *        }
 * config 配置信息
 */
export function toggleTheme(e, config) {
  const root = document.documentElement;
  const themes = config.themes;
  if (root.getAttribute("color-scheme") == themes) {
    return;
  }
  const x = e.clientX;
  const y = e.clientY;
  // 计算圆点半径
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  );
  // 给根节点设置属性
  const transition = document.startViewTransition(() => {
    root.setAttribute("color-scheme", themes);
  });
  // 准备好后开始动画
  transition.ready.then(() => {
    const clipPath = [
      `circle(${endRadius}px at ${x}px ${y}px)`,
      `circle(0px at ${x}px ${y}px)`,
    ];
    root.animate(
      {
        clipPath: [...clipPath], //可以反着画原型，使用reverse()
      },
      {
        duration: 400, //持续时间
        easing: "ease-in", //动画速率
        pseudoElement: "::view-transition-old(root)", //::view-transition-new(root)，使用新的覆盖旧的
      }
    );
  });
}

/**
 * 自动生成浮动层，并计算弹出位置
 * @date 2023-05-12
 * @param {reactref} ref react的ref绑定的点击的元素(必传)
 * @param {needrenderdom} dom  需要生成的结构(必传)
 * @param {
 *    position:'boottom(default)/top/left/right', 基于操作源生成的位置
 *    renderposition:'document.body(default)', 在哪里生成,默认在body生成
 *    offsetx:number, x轴偏移量(px)
 *    offsety:number, y轴偏移量(px)
 *    classname:String, 自定义类名
 *    Tick:100, 消失时间默认100毫秒
 *    scrollfn:true(default), 是否开启随着窗口滚动事件
 *    clickoutfn:true(default), 是否开启点击外部事件
 *    clickinfn:false(default), 是否开启点击内部事件
 *    eventcallback:{
 *       useoutclick:()=>{}, 组件外部点击
 *       useinsideclick:()=>{}, 组件内部点击
 *       usescroll:()=>{}, 组件监听到滚动,注意该事件为高频事件
 *    }, 组件内部回调
 * } config 一些额外配置(选填)
 */
export function RenderFloat(ref, dom, config = {}) {
  config = {
    position: "bottom",
    renderposition: document.body,
    ...config,
  };
  let container = document.createElement("div");
  let params = {
    sourceref: ref, //操作源dom
    renderdom: dom, //生成的dom结构
    config: config, //配置信息
    container: container, //生成的dom结构
    uniqueid: "unique" + guid32(), //唯一类名
    getdelfn: (delfn) => (params["removefn"] = delfn), //强制移除方法,外部调用removefn即可
  };
  container.setAttribute("class", `${params.uniqueid} ${config.classname}`);
  config.renderposition.appendChild(container);
  ReactDOM.render(<RenderFloatDom params={params} />, container);
  return params;
}

/**
 * 顶部进度条开启
 * @date 2023-06-27
 */
export function addload() {
  Nprogress.start();
}

/**
 * 顶部进度条关闭
 * @date 2023-06-27
 * @returns {any}
 */
export function removeload() {
  Nprogress.done();
}

/**
 * 全局提示
 * @date 2023-06-27
 * @param {any} type error/success/warning
 * @param {any} tiptext 提示文本
 */
export function messagetip(type, tiptext) {
  message[type](tiptext);
}
