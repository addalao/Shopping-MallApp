import { Link } from "react-router-dom";
import store from "../../redux/store";
import { ORDER } from "../../redux/const.js";
import "./index.css";
function SubmitList() {
  const changeCount = (i, value) => {
    if (value <= 0) return;
    var details = [...store.getState()];
    details[i].count = value;
    store.dispatch({ type: ORDER, data: details });
  };

  if (store.getState().length === 0) return <div>暂无</div>;
  return (
    <div id="SubmitAllList">
      {store.getState().map((itm, i) => {
        return (
          <Link to={`/Details/${itm.goods.id}`} key={itm.goods.id}>
            <div className="SubmitList">
              <div className="foodimg">
                <img src={itm.goods.cover} alt="美食" />
              </div>
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
                    <div className="number">
                      {itm.goods.count ? itm.goods.count : itm.count}
                    </div>
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
      })}
    </div>
  );
}
export default SubmitList;
