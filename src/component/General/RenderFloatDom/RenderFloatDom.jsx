import customHooks from "@/utils/customHooks";
import { getjson, mergejson } from "@/utils/handlejson";
import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

function RenderFloatDom(props) {
  const rootnode = useRef();
  const renderwin = useRef();
  const [renderinfo, setrenderinfo] = useState(initrenderinfo());
  const [eventcallback, seteventcallback] = useState({
    useoutclick: () => {},
    useinsideclick: () => {},
    usescroll: () => {},
    ...getconfig("eventcallback", {}),
  });

  // 自定义钩子函数注册外部点击调用closemodalfn事件和回调事件
  if (getconfig("clickoutfn", true)) {
    customHooks.useClickOutside(rootnode, eventcallback_useoutclick);
  }

  function eventcallback_useoutclick() {
    eventcallback.useoutclick(renderinfo);
    closemodalfn();
  }

  // 自定义钩子函数注册内部点击调用回调事件
  if (getconfig("clickinfn", false)) {
    customHooks.useClickInside(rootnode, eventcallback_useinsideclick);
  }

  function eventcallback_useinsideclick() {
    eventcallback.useinsideclick(renderinfo);
  }

  // 初始化注册滚动事件，计算弹框位置
  useEffect(() => {
    props.params.getdelfn(closemodalfn);
    calcpostion();
    if (getconfig("scrollfn", true)) {
      document.addEventListener("scroll", scrollwindow, true);
    }
    return () => {
      document.removeEventListener("scroll", scrollwindow, true);
    };
  }, []);

  function getconfig(key, defaultval, srcjson = renderinfo.config) {
    //从json中返回key的值取不到返回defaultval
    return getjson(srcjson, key, defaultval);
  }

  // 初始化计算默认配置
  function initrenderinfo() {
    let elseconfig = getjson(props, "params", {});
    elseconfig["offsetx"] = getconfig("offsetx", 0, elseconfig.config);
    elseconfig["offsety"] = getconfig("offsety", 0, elseconfig.config);
    let Tick = getconfig("Tick", 100, elseconfig.config);
    let defaultconfig = {
      rootnode_style: {
        position: "absolute",
        top: "0px",
        left: "0px",
        width: "100%",
      },
      renderwin_style: {
        opacity: "0",
        position: "absolute",
        transition: `opacity ${Tick}ms linear`,
        zIndex: "999",
      },
    };
    // json合并
    return mergejson(defaultconfig, elseconfig);
  }

  // 计算弹框位置
  function calcpostion() {
    let stylejson = { opacity: "1" };
    let positionjson = {
      winwidth: window.innerWidth,
      winheight: window.innerHeight,
      renderwin_position: renderwin.current.getBoundingClientRect(),
      source_position: renderinfo.sourceref.getBoundingClientRect(),
    };
    switch (renderinfo.config.position) {
      case "top":
        render_top(positionjson, stylejson);
        break;
      case "bottom":
        render_bottom(positionjson, stylejson);
        break;
      case "left":
        render_left(positionjson, stylejson);
        break;
      case "right":
        render_right(positionjson, stylejson);
        break;
    }
    if (
      renderinfo.renderwin_style.top != stylejson.top ||
      renderinfo.renderwin_style.left != stylejson.left
    ) {
      changeoffset(stylejson);
      // 高频操作建议不使用数据驱动直接操作dom
      for (let i in stylejson) {
        renderwin.current.style[i] = stylejson[i];
      }
      renderinfo.renderwin_style = stylejson;
      // setrenderinfo({ ...renderinfo });
    }
  }

  // 添加偏移量
  function changeoffset(stylejson) {
    let offsetx = renderinfo.offsetx;
    let offsety = renderinfo.offsety;
    stylejson["left"] = stylejson["left"] + offsetx + "px";
    stylejson["top"] = stylejson["top"] + offsety + "px";
  }

  // 向上弹框
  function render_top(positionjson, stylejson) {
    let { source_position, renderwin_position } = positionjson;
    // 生成高度小于顶部到点击元素的高度则向下弹，否则向上弹
    if (source_position.y >= renderwin_position.height) {
      stylejson["top"] = source_position.y - renderwin_position.height;
    } else {
      stylejson["top"] = source_position.y + source_position.height;
    }
    stylejson["left"] = source_position.x;
  }

  // 向下弹框
  function render_bottom(positionjson, stylejson) {
    let { source_position, renderwin_position, winheight } = positionjson;
    // 生成高度小于底部到点击元素的高度则向上弹，否则向下弹
    if (
      winheight - source_position.y - source_position.height >
      renderwin_position.height
    ) {
      stylejson["top"] = source_position.y + source_position.height;
    } else {
      stylejson["top"] = source_position.y - renderwin_position.height;
    }
    stylejson["left"] = source_position.x;
  }

  // 向左弹框
  function render_left(positionjson, stylejson) {
    let { source_position, renderwin_position } = positionjson;
    // 生成宽度小于左侧到点击元素的高度则向右弹，否则向左弹
    if (source_position.x >= renderwin_position.width) {
      stylejson["left"] = source_position.x - renderwin_position.width;
    } else {
      stylejson["left"] = source_position.x + source_position.width;
    }
    stylejson["top"] = source_position.y;
  }

  // 向右弹框
  function render_right(positionjson, stylejson) {
    let { source_position, renderwin_position, winwidth } = positionjson;
    // 生成宽度小于右侧到点击元素的宽度则向左弹，否则向右弹
    if (
      winwidth - source_position.x - source_position.width >
      renderwin_position.width
    ) {
      stylejson["left"] = source_position.x + source_position.width;
    } else {
      stylejson["left"] = source_position.x - renderwin_position.width;
    }
    stylejson["top"] = source_position.y;
  }

  // 关闭弹框
  function closemodalfn() {
    renderwin.current.style.opacity = "0";
    setTimeout(() => {
      if (ReactDOM.unmountComponentAtNode(renderinfo.container)) {
        document.body.removeChild(renderinfo.container);
      }
    }, getconfig("Tick", 100));
  }

  // 滚动调整位置
  function scrollwindow(e) {
    eventcallback.usescroll(renderinfo);
    calcpostion();
  }

  return (
    <div style={renderinfo.rootnode_style} ref={rootnode}>
      <div style={renderinfo.renderwin_style} ref={renderwin}>
        {renderinfo.renderdom}
      </div>
    </div>
  );
}

export default RenderFloatDom;
