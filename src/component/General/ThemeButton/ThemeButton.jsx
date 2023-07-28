import React, { useState } from "react";
import { toggleTheme, RenderFloat } from "@/utils/stylemethods.js";
import "./style.scss";

function ThemeButton() {
  const [themelist, setthemelist] = useState([
    { vtitle: "默认", vsign: "" },
    { vtitle: "李紫", vsign: "dark" },
    { vtitle: "粉团花红", vsign: "wpink" },
    { vtitle: "淡蓝灰", vsign: "wblue" },
    { vtitle: "海螺橙", vsign: "worange" },
    { vtitle: "竹绿", vsign: "wgreen" },
  ]);

  const modaldom = (
    <div className="ThemeButton_modal">
      {themelist.map((item, i) => (
        <div key={i} className="hoverdom" onClick={(e) => changetheme(e, item)}>
          {item.vtitle}
        </div>
      ))}
    </div>
  );

  function openmodal(e) {
    RenderFloat(e.target, modaldom, { position: "right" });
  }

  function changetheme(e, item) {
    toggleTheme(e, { themes: item.vsign });
  }

  return (
    <span className="ThemeButton" onClick={(e) => openmodal(e)}>
      主题
    </span>
  );
}

export default ThemeButton;
