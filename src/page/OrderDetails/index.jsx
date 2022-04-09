import Myheader from "../../components/MyHeader";
import Mybottombtn from "../../components/MyBottomBtn";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
//结算请求
const payment = async ({ id = -1, status = "" }) => {
  console.log(id);
  if (id < 0 || status !== "unpay") return;
  const res = await axios.post("/order/pay", {
    id: +id,
  });
  console.log(res);
  if (!res.data) return;
  alert("支付成功");
  // axios({
  //   method: "post",
  //   url: "order/pay",
  //   headers: {},
  //   data: { id: +id },
  // }).then(
  //   (scc) => {
  //     console.log(scc);
  //   },
  //   (err) => {
  //     console.log(err);
  //   }
  // );
};

//时间处理
const gmtToStr = (time) => {
  let date = new Date(time);
  let Str =
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1) +
    "-" +
    date.getDate() +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    date.getSeconds();
  return Str;
};

//订单完成情况的文字
const completion = ({ status = "" }) => {
  if (status === "unpay") {
    return "立即支付";
  } else if (status === "dispatch") {
    return "配送中";
  } else if (status === "finished") {
    return "已完成";
  }
};
const address = ({ defaultAddress = [] }) => {
  if (defaultAddress.length === 0) {
    return <div>loding...</div>;
  } else {
    return (
      <div className="address-user">
        <div>
          <p>收货地址</p>
          <span>
            {defaultAddress.city} {defaultAddress.detail}
          </span>
        </div>
        <div>
          <p>收货人</p>
          <span>
            <span>{defaultAddress.name}</span>
            {defaultAddress.phone}
          </span>
        </div>
      </div>
    );
  }
};
const GoodsList = ({ goods = [] }) => {
  if (goods.length === 0) return;

  return goods.map((itm) => {
    return (
      <div className="orderlist-goods" key={itm.id}>
        <div className="left">
          <img src={itm.cover} alt="图片" />
          <div className="goodText">
            <p className="name">{itm.name}</p>
            <p className="price">
              <span>¥</span>
              {itm.price}
            </p>
          </div>
        </div>
        <div className="right">
          x<p> {itm.count}</p>
        </div>
      </div>
    );
  });
};

function OrderDetails() {
  const [orderDetails, setOrderDetails] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const initialData = async () => {
      const res = await axios.get(`/order/detail/${id}`);
      console.log(res.data);
      setOrderDetails(res.data);
    };
    initialData();
  }, [id]);
  return (
    <div id="OrderDetails">
      {Myheader({ title: "订单详情" })}
      <div className="OrederBody">
        <div className="OrderDetails_address list">
          {address({ defaultAddress: orderDetails.address })}
        </div>
        <div className="list goods">
          {GoodsList({ goods: orderDetails.goods })}
        </div>
        <div className="information list">
          <div className="infoList">
            <span className="name">商品金额</span>
            <span className="price">¥{orderDetails.price}</span>
          </div>
          <div className="infoList">
            <span className="name">订单编号</span>
            <span className="Number">{orderDetails.orderNumber}</span>
          </div>
          <div className="infoList">
            <span className="name">下单时间</span>
            <span className="Number">{gmtToStr(orderDetails.createAt)}</span>
          </div>
          <div className="infoList">
            <span className="name">付款时间</span>
            <span className="Number">{gmtToStr(orderDetails.createAt)}</span>
          </div>
          <div className="infoList end">
            <span className="name">备注信息</span>
            <span className="Number">{orderDetails.remark}</span>
          </div>
        </div>
      </div>

      {Mybottombtn({
        Buttontext: completion({ status: orderDetails.status }),
        myOnClick: () => {
          payment({ id: orderDetails.id, status: orderDetails.status });
        },
      })}
    </div>
  );
}
export default OrderDetails;
