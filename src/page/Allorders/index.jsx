import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import Myheader from "../../components/MyHeader";
import "./index.css";
//处理时间格式函数
const gmtToStr = (time) => {
  let date = new Date(time);
  let Str =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  /* 

    /时/分/秒

    +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    date.getSeconds(); */
  return Str;
};
//处理订单完成情况
const completion = ({ status = "" }) => {
  if (status === "unpay") {
    return "待支付";
  } else if (status === "dispatch") {
    return "配送中";
  } else if (status === "finished") {
    return "已完成";
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
function OrderList({ orderlist = [] }) {
  console.log(orderlist);
  if (orderlist.length === 0) return <div>暂无订单</div>;
  return orderlist.map((itm) => {
    return (
      <Link to={`/OrderDetails/${itm.id}`} key={itm.id}>
        <div className="orderlist">
          <div className="orderlist-header">
            <span className="listTime"> {gmtToStr(itm.createAt)}</span>
            <span>{completion({ status: itm.status })}</span>
          </div>
          {GoodsList({ goods: itm.goods })}
          <div className="allcount">
            <div className="count">共{itm.goods.length}件商品</div>
            <div className="price">订单金额 ¥{itm.price}</div>
          </div>
        </div>
      </Link>
    );
  });
}
const getParams = ({ number = 0 }) => {
  const status = [null, "unpay", "dispatch", "finished"];
  if (status !== "") {
    return {
      page: 1,
      size: 10,
      status: status[+number],
    };
  } else {
    return {
      page: 1,
      size: 10,
    };
  }
};
const OrdersNav = ({ number = 0, setNumber, setOrderlist }) => {
  const navtite = ["全部订单", "待支付", "配送中", "已完成"];

  return (
    <div className="ordersNav">
      {navtite.map((itm, i) => {
        return (
          <span
            key={itm}
            className={number === i ? "orderSpan" : ""}
            onClick={async () => {
              if (number === i) return;
              setNumber(i);
              const params = getParams({ number: i });
              const res = await axios.get(
                "/order/byUser",

                {
                  params,
                }
              );
              setOrderlist(res.data.list);
            }}
          >
            {itm}
          </span>
        );
      })}
    </div>
  );
};
function Allorders() {
  const [orderlist, setOrderlist] = useState([]);
  const [number, setNumber] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    setNumber(+id);
  }, [id]);
  useEffect(() => {
    const params = getParams({ number: id });
    async function fetchDate() {
      const res = await axios.get(
        "/order/byUser",

        {
          params,
        }
      );
      setOrderlist(res.data.list);
    }
    fetchDate();
  }, [id]);
  return (
    <div id="myorders">
      {Myheader({ title: "我的订单" })}
      <div id="Allorders">
        {OrdersNav({ number, setNumber, setOrderlist })}
        {OrderList({ orderlist })}
      </div>
    </div>
  );
}
export default Allorders;
