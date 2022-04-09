import "swiper/css/navigation";
import { Link } from "react-router-dom";
import axios from "axios";
import vector from "../../img/Group3.svg";
import "./index.css";

function MyHomeList({ foodList = [] }) {
  const couponlist = (coupon) => {
    return coupon.map((itm) => {
      return <span key={itm.id}>{itm.name}</span>;
    });
  };
  const addShoppingCart = (itm) => {
    console.log(itm);

    axios
      .post("/shop-cart", {
        count: 1,
        goodsId: itm.id,
      })
      .then(
        (first) => {
          console.log(first);
          alert("加入购物车成功");
        },
        (first) => {
          console.log(first);
        }
      );
  };
  if (foodList.length === 0) return <div>loding...</div>;
  return foodList.map((itm) => {
    return (
      <Link
        to={`/Details/${itm.id}`}
        key={itm.id}
        style={{ width: "100%", marginBottom: "10px" }}
      >
        <div className="foodchaider">
          <img src={itm.cover} alt="美食" className="foodimg" />
          <div className="fooddetailedinformation">
            <div className="foodtitle">
              <b>{itm.name}</b>
              <span
                className="redfont"
                onClick={(e) => {
                  //阻止事件默认行为
                  e.preventDefault();
                  addShoppingCart(itm);
                  console.log(itm);
                }}
              >
                <img src={vector} alt="购物车" />
              </span>
            </div>
            <div className="salesvolume">月销量{itm.sales}</div>

            <div className="Price">
              <span>
                <p>￥</p>
                {itm.price}
              </span>
            </div>
            <div className="discountinfor">{couponlist(itm.cates)}</div>
          </div>
        </div>
      </Link>
    );
  });
}
export default MyHomeList;
