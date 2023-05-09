import { lazy } from "react";

const page_setting = [
  {
    path: "*",
    meta: {
      title: "404",
    },
    component: lazy(() =>
      import("@/view/Page00000_Setting/Page00002_NotFound.jsx")
    ),
  },
];
const page_content = [
  {
    path: "/",
    meta: {
      title: "首页",
    },
    component: lazy(() => import("@/view/Page10001_Home/Page10001_Home.jsx")),
    exact: true,
  },
];

const routes = [].concat(page_content).concat(page_setting);

export default routes;
