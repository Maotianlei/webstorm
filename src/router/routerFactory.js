// 获取扁平化路由列表
import { lazy } from "react";
import { judge_device } from "@/utils/pubilcmethods";

function get_routerlist() {
  let user_device = judge_device();
  //  搜索的目录，是否搜索其子目录，匹配文件正则
  let context = get_content(user_device);
  //  获取了所有文件的路径
  let paths = context.keys();
  return paths.map((path) => {
    //  批量获取引入的组件,懒加载
    //  注意：import动态导入需要使用模板字符串的方式
    let newpath = path.replace("./", "");
    let component = get_lazycom(user_device, newpath);
    //  组件扩展属性方便渲染菜单
    let meta = component["meta"] || {};
    //  去除路径前的'.'以及用正则替换'.jsx'后缀
    path = path
      .substr(1)
      .replace(/(\/index\.jsx|\.jsx)$/, "")
      .replace(/Page[0-9]+_/, "");
    return { path, component, meta };
  });
}

function get_content(user_device) {
  if (user_device) {
    return require.context("@/view_m", true, /index.jsx/);
  }
  return require.context("@/view", true, /index.jsx/);
}

function get_lazycom(user_device, newpath) {
  if (user_device) {
    return lazy(() => import(`@/view_m/${newpath}`));
  }
  return lazy(() => import(`@/view/${newpath}`));
}

// 遍历所有节点，处理id
function add_router_id(routeslist) {
  routeslist.forEach((route) => {
    // 将path去除收个'/',用'/'分割成数组
    let comparePaths = route.path.substr(1).split("/");
    // 是否是根节点，是根节点则将数组还原为字符串
    // 不是根节点则处理自己的id，删除数组最后一项为父节点id
    if (comparePaths.length === 1) {
      route.id = comparePaths.join("");
    } else {
      route.id = comparePaths.join("");
      comparePaths.pop();
      route.pid = comparePaths.join("");
    }
  });
}

// 处理子节点
function add_router_children(routeslist) {
  let router_tree = [];
  routeslist.forEach((route) => {
    if (route.pid) {
      // 子节点id找父节点id，为父节点添加children
      let p_router = routeslist.find((v) => v.id === route.pid);
      if (!p_router.children) {
        p_router.children = [];
      }
      p_router.children.push(route);
    } else {
      // 根节点无需处理
      router_tree.push(route);
    }
  });
  return router_tree;
}

// 获取处理好的路由列表
function get_router() {
  let routeslist = get_routerlist();
  add_router_id(routeslist);
  //2.所有的数据都已经找到了父节点的id,下面才是真正的找父节点了
  let router_tree = add_router_children(routeslist);
  return router_tree;
}

const routerlist = get_router();

export default routerlist;
