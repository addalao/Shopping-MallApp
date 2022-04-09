import { Link } from "react-router-dom";
import "./index.css";
import order from "../../img/order.svg";
import right from "../../img/right.svg";
import daizhifu from "../../img/daizhifu.svg";
import peisongzhong from "../../img/peisongzhong.svg";
import yiwancheng from "../../img/yiwancheng.svg";
import redright from "../../img/redright.svg";
import ReceivingAddress from "../../img/ReceivingAddress.svg";
import SystemSettings from "../../img/SystemSettings.svg";
import LogOut from "../../img/Logout.svg";
import history from "../../history";
import React, { useState, useEffect } from "react";
import axios from "axios";
function Personal() {
  const [Userinformation, setUserinformation] = useState([]);

  useEffect(() => {
    console.log(Userinformation);
  }, [Userinformation]);
  useEffect(() => {
    axios.get("/user/info").then(
      (scc) => {
        console.log(scc);
        setUserinformation(scc.data);
      },
      (err) => {
        console.log(err);
      }
    );
    // setUserinformation(JSON.parse(localStorage.getItem("Userinformation")));
  }, []);

  return (
    <div id="Personal">
      {/* ----------------------- */}
      <div className="Personal-top">
        <div className="headportrait">
          <img src={Userinformation.avatar} alt="头像" />
        </div>
        <div className="usetext">
          <div className="usenickname">{Userinformation.nickname}</div>
          <div className="usephone">{Userinformation.phone}</div>
        </div>
      </div>
      {/* --------------------------------------- */}
      <div className="temporaryParent">
        <div className="orderNav">
          <Link to={`/Allorders/${0}`}>
            <div className="myoption">
              <img src={order} alt="" />
              <span>全部订单</span>
            </div>
          </Link>
          <Link to={`/Allorders/${1}`}>
            <div className="myoption">
              <img src={daizhifu} alt="" />
              <span>待支付</span>
            </div>
          </Link>
          <Link to={`/Allorders/${2}`}>
            <div className="myoption">
              <img src={peisongzhong} alt="" />
              <span>配送中</span>
            </div>
          </Link>
          <Link to={`/Allorders/${3}`}>
            <div className="myoption">
              <img src={yiwancheng} alt="" />
              <span>已完成</span>
            </div>
          </Link>
        </div>
        {/* ----------------------------------------- */}
        <div className="localSet ">
          <div className="SystemSettings  localSet-itm">
            <div>
              <img src={SystemSettings} alt="" />
              <span>我的余额</span>
            </div>
            <img src={right} alt="" />
          </div>
          <Link to={`/ReceivingAddress/${"none"}`}>
            <div className="ReceivingAddress localSet-itm">
              <div>
                <img src={ReceivingAddress} alt="" />
                <span>收货地址</span>
              </div>
              <img src={right} alt="" />
            </div>
          </Link>
          <div className="SystemSettings  localSet-itm">
            <div>
              <img src={SystemSettings} alt="" />
              <span>设置</span>
            </div>
            <img src={right} alt="" />
          </div>
          <div
            className="LogOut  localSet-itm"
            onClick={() => {
              localStorage.clear();
              history.replace("/");
            }}
          >
            <div>
              <img src={LogOut} alt="" />
              <span style={{ color: "red" }}>退出登录</span>
            </div>
            <img src={redright} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Personal;
