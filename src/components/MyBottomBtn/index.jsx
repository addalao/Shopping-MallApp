import "./index.css";
const defaultonclick = () => {
  console.log("Mybottombtn----未设置点击事件");
};
function Mybottombtn({
  Buttontext = "请设置文字",
  myOnClick = defaultonclick,
}) {
  return (
    //父元素heightdiv和子元素copydiv用来解决 position:fixed定位时 “高度坍塌” 问题
    <div className="ReceivingAddressBottm" onClick={myOnClick}>
      <div className="ReceivingAddress_newlyAdded">{Buttontext}</div>
    </div>
  );
}
export default Mybottombtn;
