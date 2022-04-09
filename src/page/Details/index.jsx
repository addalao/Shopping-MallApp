import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";

import "./indec.css";

import { Link, useParams } from "react-router-dom";
/* import left from "../../img/left.png"; */
import shouye from "../../img/dianpu.svg";
import gouwuche from "../../img/gouwuche.svg";
import Mybottombtn from "../../components/MyBottomBtn";
import Myheader from "../../components/MyHeader";
import store from "../../redux/store";
import { ORDER } from "../../redux/const.js";
const bottomlist = [
  { id: 1, name: "首页", icon: shouye, link: "/" },
  { id: 2, name: "购物车", icon: gouwuche, link: "/home/ShoppingCart" },
];

function Details() {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const [count, setcount] = useState(1);
  const [isClose, setIsClose] = useState(false);

  useEffect(() => {
    console.log(id);
    axios.get(`/goods/detail/${id}`).then(
      (scc) => {
        console.log("chenggg----", scc);
        setDetails(scc.data);
      },
      (err) => {
        console.log(err);
      }
    );
  }, [id]);

  const addtocart = async () => {
    console.log(details.id);
    if (count <= 0) return;
    const res = await axios.post("/shop-cart", {
      count: count,
      goodsId: details.id,
    });
    if (!res.data) return;
    console.log("加入");
  };
  return (
    <div id="Details">
      {Myheader({
        title: "商品详情",
      })}
      <div className="Details-body">
        <div className="swiper">
          <Swiper
            loop={true}
            centeredSlides={true}
            speed={2000}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            {!!details.imgs ? (
              details.imgs.map((itm) => {
                return (
                  <SwiperSlide className="Details-Homeswiper" key={itm}>
                    <img src={itm} alt="轮播图" />
                  </SwiperSlide>
                );
              })
            ) : (
              <h3>loding..</h3>
            )}
          </Swiper>
          <div className="Details-info">
            <span className="Details-info-price">
              <span className="Details-info-dollar">￥</span>
              {details.price}
            </span>
            <span className="Details-info-MonthlySales">
              月销量{details.sales}
            </span>
          </div>
          <div className="Details-name">{details.name}</div>
        </div>
      </div>
      <div className="RichText">
        <div className="RichText-title">产品详情</div>
        {/* {} */}
        <div dangerouslySetInnerHTML={{ __html: details.details }}></div>
      </div>
      <div className="Details-homebtom">
        {bottomlist.map((itm, i) => {
          return (
            <Link to={itm.link} key={itm.id}>
              <span
                className="homeBtnNav"
                onClick={() => {
                  sessionStorage.setItem("homeBtomNvuId", i);
                }}
              >
                <img src={itm.icon} alt="首页" />
                <p>{itm.name}</p>
              </span>
            </Link>
          );
        })}
        <div className="Details-btn">
          <div
            className="Details-leftBtn"
            onClick={() => {
              setIsClose(true);
            }}
          >
            加入购物车
          </div>
          <Link to={"/Submit"}>
            <div
              className="Details-rightBtn"
              onClick={() => {
                store.dispatch({
                  type: ORDER,
                  data: [{ goods: { ...details }, count: 1 }],
                });
              }}
            >
              立即购买
            </div>
          </Link>
        </div>
      </div>
      <div
        className="Details-Mask"
        style={{ display: isClose ? "" : "none" }}
        onClick={() => {
          setIsClose(false);
        }}
      >
        <div
          className="Mask-bottom"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="Mask-goods">
            <div className="goods-cover">
              <img src={details.cover} alt="" />
            </div>
            <div className="goods-number">
              <span className="price">
                <span className="dollar">￥</span>
                {details.price}
              </span>
              <span className="sales">月销量{details.sales}</span>
            </div>
          </div>
          <div className="Mask-count">
            <span className="text">数量</span>
            <div className="quantity">
              <div
                className={count === 1 ? "decrease" : "decreases"}
                onClick={() => {
                  if (count === 1) return;
                  setcount(count - 1);
                }}
              >
                <p className="Symbol">-</p>
              </div>
              <div className="number">{count}</div>
              <div
                className="increase"
                onClick={() => {
                  setcount(count + 1);
                }}
              >
                <p className="Symbol">+</p>
              </div>
            </div>
          </div>
          {Mybottombtn({
            Buttontext: "确定",
            myonclick: addtocart,
            margin: "68px 0 0 0",
          })}
        </div>
      </div>
    </div>
  );
}
export default Details;
