import { createStore } from "redux";
import orderReduceer from "./reduceer/orderReduceer.js"

export default createStore(
    orderReduceer
)