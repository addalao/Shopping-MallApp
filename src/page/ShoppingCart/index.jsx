import React, { useState, useEffect, useMemo } from "react";

import "./index.css";
import checked from "../../img/checked.svg";
import unchecked from "../../img/unchecked.svg";
import axios from "axios";
import BigNumber from "bignumber.js";
import MyGoodsList from "../../components/MyGoodsList";
import { Link } from "react-router-dom";
import store from "../../redux/store";
import { ORDER } from "../../redux/const.js";
var BN = BigNumber.clone();
BN.config({ DECIMAL_PLACES: 2 });

function ShoppingCart() {
  //购物车列表
  const [shopCartList, setShopCartList] = useState([]);
  useEffect(() => {
    // axios.get("/shop-cart", {}).then(
    //   (success) => {
    //     console.log("购物车列表", success.data);
    //     setShopCartList(
    //       success.data.map((item) => {
    //         item.checked = true;
    //         return item;
    //       })
    //     );
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );
  }, []);
  const isCheckedAll = useMemo(() => {
    const checkedList = shopCartList.filter((item) => item.checked);
    return checkedList.length === shopCartList.length;
  }, [shopCartList]);
  //获取选中的购物车物品
  const checkedList = useMemo(() => {
    return shopCartList.filter((item) => item.checked);
  }, [shopCartList]);
  const totalPrice = useMemo(() => {
    //数组为空需要终止，否则报错
    if (shopCartList.length === 0) {
      return;
    }
    console.log(checkedList);
    return checkedList
      .map((item) => BN(item.goods.price).times(item.count).toNumber()) //等于item.goods.price*item.count
      .reduce((prev, next) => BN(prev).plus(next).toNumber(), 0); //等于reev(上一个数)+next(现在的数)
  }, [shopCartList, checkedList]);

  const initializationChecked = () => {
    const isSelectAll =
      shopCartList.filter((itm) => {
        return itm.checked === false;
      }).length === 0; //判断是否全部选中
    if (isSelectAll) {
      setShopCartList(
        shopCartList.map((item) => {
          item.checked = false;
          return item;
        })
      );
    } else {
      setShopCartList(
        shopCartList.map((item) => {
          item.checked = true;
          return item;
        })
      );
    }
  };

  return (
    <div id="ShoppingCart">
      {MyGoodsList({
        shopCartList: shopCartList,
        setShopCartList: setShopCartList,
      })}
      <div id="settlement">
        <div className="settlement-left">
          <span onClick={initializationChecked} className="settlementinput">
            <img src={isCheckedAll ? checked : unchecked} alt="" />
          </span>
          <span>全选</span>
        </div>
        <div className="settlement-right">
          <p className="total">合计：</p>
          <span className="Priceall">
            <span className="dollarSymbol">￥</span>
            {totalPrice}
          </span>
          <Link to={"/Submit"}>
            <div
              className="settlement-butn"
              onClick={() => {
                store.dispatch({ type: ORDER, data: checkedList });
              }}
            >
              结算
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default ShoppingCart;
