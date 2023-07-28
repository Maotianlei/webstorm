import React, { useEffect } from "react";
import ThemeButton from "@/component/General/ThemeButton/ThemeButton";
import { api_general_p, api_general_wp } from "@/api/api.js";

function Page10001_home() {
  useEffect(() => {
    api_general_p({ a: "1" }, bakc);
  }, []);

  const bakc = {
    success: (res) => {
      console.log(res);
    },
    error: (res, payload) => {
      console.log(res, payload);
    },
  };

  function asd() {
    api_general_p({ a: "1" }, bakc);
  }

  return (
    <div className="Page10001_home">
      <ThemeButton />
      <div onClick={asd}>123123</div>
    </div>
  );
}

export default Page10001_home;
