import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import React, { Suspense } from "react";

const Login = React.lazy(() => import("./page/Login"));
const Home = React.lazy(() => import("./page/Home"));
const Details = React.lazy(() => import("./page/Details"));
const ReceivingAddress = React.lazy(() => import("./page/ReceivingAddress"));
const Submit = React.lazy(() => import("./page/Submit"));
const AddAddress = React.lazy(() => import("./page/AddAddress"));
const Allorders = React.lazy(() => import("./page/Allorders"));
const OrderDetails = React.lazy(() => import("./page/OrderDetails"));

//判断token来渲染相关组件
const AuthVerification = ({ children }) => {
  // console.log(children);
  const token = localStorage.getItem("token");
  if (token) return children;

  return <Navigate to="/" replace></Navigate>;
};

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>loading....</div>}>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/Submit" element={<Submit />}></Route>
          <Route
            path="/home/*"
            element={
              <AuthVerification>
                <Home />
              </AuthVerification>
            }
          ></Route>
          <Route path="/Details/:id" element={<Details />}></Route>
          <Route
            path="/ReceivingAddress/:tyep"
            element={<ReceivingAddress />}
          ></Route>
          <Route path="/AddAddress" element={<AddAddress />}></Route>
          <Route path="/Allorders/:id" element={<Allorders />}></Route>
          <Route path="/OrderDetails/:id" element={<OrderDetails />}></Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
