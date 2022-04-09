import axios from "axios";
import BigNumber from "bignumber.js";
import { Link, useLocation } from "react-router-dom";
import Myheader from "../../components/MyHeader";
import right from "../../img/right.svg";
import "./index.css";
import { useEffect, useState, useMemo } from "react";
import SubmitList from "../../components/SubmitList";
import store from "../../redux/store";
import history from "../../history";

var BN = BigNumber.clone();
BN.config({ DECIMAL_PLACES: 2 });
const address = ({ defaultAddress = [] }) => {
  if (defaultAddress.length === 0) {
    return (
      <div className="address-user" style={{ padding: "18px 0 18px 14px" }}>
        <p>请选择收货地址</p>
      </div>
    );
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
function Submit() {
  const [defaultAddress, setDefaultAddress] = useState([]);
  const location = useLocation(); //路由跳转携带的数据
  var storeState = store.getState();

  //总价格
  const totalPrice = useMemo(() => {
    //数组为空需要终止，否则报错
    if (storeState.length === 0) {
      return;
    }
    console.log(storeState);
    return store
      .getState()
      .map((item) => BN(item.goods.price).times(item.count).toNumber()) //等于item.goods.price*item.count
      .reduce((prev, next) => BN(prev).plus(next).toNumber(), 0); //等于reev(上一个数)+next(现在的数)
  }, [storeState]);
  //获取默认地址
  useEffect(() => {
    // 获取默认收货地址
    if (location.state === null) {
      axios.get("/address").then(
        (scc) => {
          var adres = scc.data.filter((itm) => {
            return itm.default;
          });
          console.log("地址", adres);
          setDefaultAddress(adres[0]);
        },
        (err) => {
          console.log(err);
        }
      );
    } else if (location.state !== null) {
      const { name } = location.state;
      console.log(name);
      setDefaultAddress(name);
    }
  }, [location.state]);

  const settlement = async () => {
    // console.log(storeState);
    const goods = storeState.map((itm) => {
      return {
        goodsId: itm.goods.id,
        count: itm.count,
      };
    });

    const res = await axios.post("/order", {
      remark: "第二次测试",
      price: +totalPrice,
      goods,
      addressId: defaultAddress.id,
    });
    console.log(res.data);
    if (!res.data) return;
    history.push(`/OrderDetails/${res.data.id}`);
  };
  return (
    <div id="Submit">
      {Myheader({ title: "提交订单" })}
      <div className="controlwidth">
        <div className="Submint_address list">
          {address({ defaultAddress })}

          <div className="Submint_address-right">
            <Link to={`/ReceivingAddress/${"submit"}`}>
              <img src={right} alt="" />
            </Link>
          </div>
        </div>

        <textarea
          placeholder="请输入要留言的信息"
          className="story list"
          name="story"
        ></textarea>

        {<SubmitList></SubmitList>}
      </div>
      <div id="Submit-settlement">
        <div className="Submit-settlement-right">
          <p className="Submit-total">合计：</p>
          <span className="Submit-Priceall">
            <span className="Submit-dollarSymbol">￥</span>
            {totalPrice}
          </span>
        </div>
        <div
          className="Submit-settlement-butn"
          onClick={() => {
            settlement();
          }}
        >
          结算
        </div>
      </div>
    </div>
  );
}
export default Submit;
