import Mybottombtn from "../../components/MyBottomBtn";
import Myheader from "../../components/MyHeader";

import React, { useEffect, useState } from "react";
import { pcaa } from "area-data"; // v3 or higher
import "react-area-linkage/dist/index.css"; // v2 or higher
import { AreaCascader } from "react-area-linkage";

import "./index.css";
import axios from "axios";
const phonerule = /^[1][3-8][0-9]{9}$/;
function AddAddress() {
  const [addAddressData, setAddAddressData] = useState({});
  const changeData = (itm, value) => {
    const copydata = { ...addAddressData };
    copydata[itm] = value;
    setAddAddressData({ ...copydata });
  };
  //确定按钮
  const confirmAdd = async () => {
    const res = await axios.post("/address", addAddressData);
    console.log(res);
  };
  useEffect(() => {
    console.log(addAddressData);
  }, [addAddressData]);
  return (
    <div className="AddAddress">
      {Myheader({ title: "新增收货地址" })}
      <div className="AddList ">
        <div className="list">
          <div className="boder-bttom">
            <span className="margin">收货人</span>
            <input
              type="text"
              placeholder="姓名"
              onBlur={(e) => {
                changeData("name", e.target.value);
              }}
            />
          </div>
          <div className="boder-bttom">
            <span className="margin">手机号</span>
            <input
              type="number"
              placeholder="请输入手机号"
              onBlur={(e) => {
                if (!phonerule.test(e.target.value)) alert("不合法的手机号");
                changeData("phone", e.target.value);
              }}
            />
          </div>
          <div className="boder-bttom">
            <span className="margin">所在地区</span>
            <AreaCascader
              type="text"
              onChange={(e) => {
                changeData("city", e.join());
              }}
              level={1}
              size="large"
              data={pcaa}
            />
          </div>
          <div
            className="AddAddress-DetailedAddress"
            style={{ border: "none" }}
          >
            <span className="margin">详细地址</span>
            <textarea
              placeholder="请输入详细地址"
              onBlur={(e) => {
                changeData("detail", e.target.value);
              }}
            ></textarea>
          </div>
        </div>
        <div className="boder-bttom-list">
          <span>设为默认地址</span>
          <input
            type="checkbox"
            id="AddAddressCheckbox"
            defaultChecked="checked"
            onClick={(e) => {
              changeData("default", e.target.checked);
            }}
          />
        </div>
      </div>
      {Mybottombtn({ Buttontext: "确定", myOnClick: confirmAdd })}
    </div>
  );
}
export default AddAddress;
