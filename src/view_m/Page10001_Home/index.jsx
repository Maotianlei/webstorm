import React, { useRef, useEffect, useState } from "react";

function Page10001_mHome() {
  const imgref = useRef();
  const [imgdata, setimgdata] = useState({ count: 12, data: {} });
  useEffect(() => {
    createimg();
    let start = addInterval();
    return () => {
      clearInterval(start);
    };
  }, []);

  function addInterval() {
    return setInterval(() => {
      imgdata.count = imgdata.count + 12;
      if (imgdata.count > 1404) {
        imgdata.count = 12;
      }
      imgref.current.innerHTML = "";
      imgref.current.appendChild(imgdata.data[imgdata.count]);
    }, 40);
  }

  function createimg() {
    if (imgdata.count > 1404) return;
    let img = document.createElement("img");
    img.src = `/resource/img/HomeVideopic/${imgdata.count}.jpg`;
    imgdata.data[imgdata.count] = img;
    imgdata.count = imgdata.count + 12;
    createimg();
  }

  return <div ref={imgref}></div>;
}

export default Page10001_mHome;
