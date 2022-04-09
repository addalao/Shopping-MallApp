//import { Link } from "react-router-dom";
import React, { useState } from "react";

import { Routes, Route, Link } from "react-router-dom";
import shouye from "../../img/dianpu.svg";
import gouwuche from "../../img/gouwuche.svg";
import frame from "../../img/frame.svg";

import redShouye from "../../img/redShouye.svg";
import redGouwuche from "../../img/redGouwuche.svg";
import redFrame from "../../img/redFrame.svg";

import "./index.css";

const Goods = React.lazy(() => import("../Goods"));
const ShoppingCart = React.lazy(() => import("../ShoppingCart"));
const Personal = React.lazy(() => import("../Personal"));
const bottomlist = [
  { id: 1, name: "首页", icon: shouye, redIcon: redShouye, link: "" },
  {
    id: 2,
    name: "购物车",
    icon: gouwuche,
    redIcon: redGouwuche,
    link: "ShoppingCart",
  },
  { id: 3, name: "我的", icon: frame, redIcon: redFrame, link: "Personal" },
];

function Home() {
  var homeBtomNvuId = sessionStorage.getItem("homeBtomNvuId");
  const [bottomnav, setbottomnav] = useState(+homeBtomNvuId || 0);

  //删除token的函数
  /* const deletetoken = () => {
    localStorage.removeItem("token");
    settoken(localStorage.getItem("token"));
  }; */
  return (
    <div className="Home">
      <Routes>
        <Route path="/" element={<Goods />}></Route>

        <Route path="/ShoppingCart" element={<ShoppingCart />}></Route>
        <Route path="/Personal" element={<Personal />}></Route>
      </Routes>
      {/*-------------------- 底部导航栏 ----------------------------------------------------------- */}
      <div className="homebtom">
        {bottomlist.map((itm, i) => {
          return (
            <Link to={itm.link} key={itm.id}>
              <span
                className="homeBtnNav"
                onClick={() => {
                  setbottomnav(i);
                  sessionStorage.setItem("homeBtomNvuId", i);
                }}
              >
                <div className={bottomnav === i ? "iconcolor" : "btmIcon"}>
                  <img src={itm.icon} alt="图片" />
                  <img
                    src={itm.redIcon}
                    alt="图片"
                    style={{ marginLeft: "15px" }}
                  />
                </div>

                <p>{itm.name}</p>
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
