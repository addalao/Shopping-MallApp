import { Link } from "react-router-dom";
import axios from "axios";
import checked from "../../img/checked.svg";
import unchecked from "../../img/unchecked.svg";
import { useEffect } from "react";
import "./index.css";
function MyGoodsList({ shopCartList = [], setShopCartList }) {
  useEffect(() => {
    console.log("Mygoodlist", shopCartList);
  }, [shopCartList]);
  const changeChecked = (i) => {
    //将点击的购物车（old[i]）的checked取反
    setShopCartList((old) => {
      old[i].checked = !old[i].checked;
      return [...old];
    });
  };
  const changeCount = async (i, value) => {
    if (value <= 0) return;
    const res = await axios.put("/shop-cart/count", {
      count: value,
      goodsId: shopCartList[i].goods.id,
    });
    console.log(res);
    if (!res.data) return;
    setShopCartList((old) => {
      old[i].count = value;
      return [...old];
    });
  };

  if (shopCartList.length === 0) return <div>暂无</div>;
  return shopCartList.map((itm, i) => {
    return (
      <Link
        to={`/Details/${itm.goods.id}`}
        key={itm.id}
        style={{ width: "100%" }}
      >
        <div className="foodchaider">
          <div
            className="ShoppingCartcheckbox" /* style={{  display: "none"}} */
          >
            {/* 多选框 */}
            <span
              onClick={(e) => {
                e.preventDefault();
                changeChecked(i);
              }}
            >
              <img src={itm.checked ? checked : unchecked} alt="" />
            </span>
          </div>
          <img src={itm.goods.cover} alt="美食" className="foodimg" />
          <div className="fooddetailedinformation">
            <div className="foodtitle">
              <b>{itm.goods.name}</b>
            </div>
            <div className="salesvolume">月销量{itm.goods.sales}</div>

            <div className="Price">
              <span>
                <p>￥</p> {itm.goods.price}
              </span>
              <div className="quantity">
                <div
                  className={itm.count === 1 ? "decrease" : "decreases"}
                  onClick={(e) => {
                    changeCount(i, itm.count - 1);
                    e.preventDefault();
                  }}
                >
                  <p className="Symbol">-</p>
                </div>
                <div className="number">{itm.count}</div>
                <div
                  className="increase"
                  onClick={(e) => {
                    e.preventDefault();
                    changeCount(i, itm.count + 1);
                  }}
                >
                  <p className="Symbol">+</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  });
}
export default MyGoodsList;
