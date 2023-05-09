import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import "@/style/root/reset.css";

import routes from "@/router/router";
import { reportWebVitals } from "@/utils/react-scaffold";
import RouterView from "@/router/router-view";
import Page00000_RouterGuard from "@/view/Page00000_Setting/Page00000_RouterGuard.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <Page00000_RouterGuard>
      <RouterView route={routes} />
    </Page00000_RouterGuard>
  </Router>
);

/*  
    If you want to start measuring performance in your app, pass a function
    to log results (for example: reportWebVitals(console.log))
    or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
    性能分析工具，脚手架自带，使用:reportWebVitals(console.log)
*/
// reportWebVitals();
