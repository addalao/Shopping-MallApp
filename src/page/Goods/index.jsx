import React, { useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";
import axios from "axios";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";

import "./index.css";

import searchicon from "../../img/sousuo_slices/sousuo.png";
import lunbotu from "../../img/zu1_slices/lunbotu.png";
import MyHomeList from "../../components/MyHomeList";

const CategoryList = (props) => {
  if (props.category) {
    return props.category.map((itm) => {
      return (
        <span key={itm.id}>
          {/* itm.icon */}
          <img src={itm.icon} alt="分类图片" />
          <p>{itm.name}</p>
        </span>
      );
    });
  } else {
    return <div>loading.....</div>;
  }
};
function Goods(props) {
  const [swiper, setWweiperList] = useState([
    { id: 1, url: lunbotu },
    { id: 2, url: lunbotu },
  ]);
  const [foodList, setFoodList] = useState([]);
  const [cur, setCur] = useState(0);
  const [category, setcategory] = useState(false);
  const tabs = ["综合排序", "销量", "价格"];

  useEffect(() => {
    console.log("进入Home组件");
    // console.log(props.location.state.name);
    //获取轮播图图片地址
    axios
      .get("/swiper/active", {
        params: {
          page: 1,
          size: 10,
        },
      })
      .then(
        (success) => {
          console.log("轮播图", success.data.list);
          setWweiperList([...success.data.list]);
        },
        (error) => {
          console.log("轮播图--失败", error);
        }
      );
    //获取分类列表
    axios
      .get("/category/active", {
        params: {
          page: 1,
          size: 10,
        },
      })
      .then(
        (success) => {
          console.log("获取列表", success.data.list);
          setcategory(success.data.list);
        },
        (error) => {
          console.log("error", error);
        }
      );

    //获取上架的商品列表
    axios
      .get("/goods/active", {
        params: {
          page: 1,
          size: 10,
          sort: "composite",
        },
      })
      .then(
        (success) => {
          console.log("获取商品列表", success.data);
          setFoodList(success.data.list);
        },
        (seeor) => {
          console.log("获取商品列表失败", seeor);
        }
      );
  }, []);

  const sortAndColour = (i, v) => {
    setFoodList([]);
    setCur(i);
    var flag = "composite";

    if (v === "综合排序") {
      flag = "composite";
    } else if (v === "销量") {
      flag = "sales";
    } else {
      flag = "price";
    }
    console.log(flag);
    axios
      .get("/goods/active", {
        params: {
          page: 1,
          size: 10,
          sort: flag,
        },
      })
      .then(
        (success) => {
          console.log("成功获取商品列表排序", success.data.list);
          setFoodList(success.data.list);
        },
        (seeor) => {
          console.log("获取商品列表失败", seeor);
        }
      );
  };

  return (
    <>
      {/* ------------------红色背景及搜索框---------------------------------- */}
      <div id="redbackground">
        <div id="redtopinput">
          <span className="redinputleft">
            <img src={searchicon} alt="搜索" />
          </span>
          <input type="text" />
          <button className="redinputright">搜索</button>
        </div>
      </div>
      {/* -------------------轮播图------------------------------------- */}
      <div id="homeheder">
        <Swiper
          style={{ borderRadius: 16, overflow: "hidden" }}
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
          {swiper.map((itm) => {
            return (
              <SwiperSlide className="Homeswiper" key={itm.id}>
                <img src={itm.url} alt="轮播图" />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      {/* --------------------食品分类--------------------------------------- */}
      <div id="classificationlisit">
        <CategoryList category={category}></CategoryList>
      </div>

      {/* ------------------排序及食品展示栏------------------------------- */}
      <div id="foodsale">
        <div id="sortingoptions">
          {tabs.map((v, i) => {
            return (
              <span
                //className={[cur === i && "action"].join(" ")}
                key={v}
                className={cur === i ? "action" : ""}
                onClick={() => {
                  sortAndColour(i, v);
                }}
              >
                {v}
              </span>
            );
          })}
        </div>
        {MyHomeList({ foodList: foodList })}
      </div>
    </>
  );
}

export default Goods;
