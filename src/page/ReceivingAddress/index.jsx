import axios from "axios";

import checked from "../../img/checked.svg";
import unchecked from "../../img/unchecked.svg";
import Edit from "../../img/Edit.svg";
import "./index.css";
import Mybottombtn from "../../components/MyBottomBtn";
import Myheader from "../../components/MyHeader";
import history from "../../history";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AddressList = ({
  address = [],
  tyep = "",
  setAddress = () => {
    console.log("未设置");
  },
  navigate,
}) => {
  if (address.length === 0) return;

  return address.map((itm, i) => {
    return (
      <div className="Receivingbox" key={itm.id}>
        <div className="ReceivingList">
          <div
            className="Receivingcheckbox"
            onClick={async (e) => {
              e.preventDefault();
              if (tyep !== "submit") {
                const res = await axios.put(
                  "/address/setDefault",
                  {},
                  {
                    params: {
                      id: itm.id,
                    },
                  }
                );
                console.log(res);
                if (res.data) {
                  async function fetchData() {
                    const res = await axios.get("/address");
                    if (res.status !== 200) return;
                    console.log(res.data);
                    setAddress(res.data);
                  }
                  fetchData();
                }
              } else {
                navigate("/Submit", { state: { name: itm } });
              }
              //  useCallback
              // console.log("传参");
            }}
          >
            {/*单选框 */}
            <span>
              <img src={itm.default ? checked : unchecked} alt="" />
            </span>
          </div>

          <div className="Receivinginfo">
            <div className="user">
              <span className="useronespan">{itm.name}</span>
              <span>{itm.phone}</span>
            </div>
            <div className="address">
              {itm.city} ({itm.detail})
            </div>
          </div>

          <div className="ReceivingList-Edit">
            <span>
              <img src={Edit} alt="" />
            </span>
          </div>
        </div>
      </div>
    );
  });
};
function ReceivingAddress() {
  const [address, setAddress] = useState([]);
  const { tyep } = useParams(); //页面跳转来源
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("/address");
      if (res.status !== 200) return;
      console.log(res.data);
      setAddress(res.data);
    }
    fetchData();
  }, []);

  return (
    <div id="ReceivingAddress">
      {Myheader({
        title: "收货地址",
      })}
      {AddressList({ address, setAddress, tyep, navigate })}
      {Mybottombtn({
        Buttontext: "新增收获地址",
        myOnClick: () => {
          history.push("/AddAddress");
        },
      })}
    </div>
  );
}
export default ReceivingAddress;
