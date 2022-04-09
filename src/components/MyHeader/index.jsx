import left from "../../img/left.png";
import "./index.css";
import { useNavigate } from "react-router-dom";

function Myheader({ title = "请设置标题" }) {
  const navigate = useNavigate();
  return (
    <div
      id="Myheader"
      onClick={() => {
        navigate(-1);
      }}
    >
      <img src={left} alt="" />

      <span>{title}</span>
    </div>
  );
}
export default Myheader;
