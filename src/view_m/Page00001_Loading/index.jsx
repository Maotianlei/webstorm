import React from "react";
import RouterView from "@/router/router-view";
import { Outlet } from "react-router-dom";

function Page00001_loading(props) {
  console.log(props);
  return (
    <div>
      <div>Page00001_loading</div>
      <Outlet />
    </div>
  );
}

export default Page00001_loading;
