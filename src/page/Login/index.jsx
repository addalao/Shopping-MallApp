//import { useState } from "react";

import "./index.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import history from "../../history";
import lfet from "../../img/left.png";
function Login() {
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [nickname, setnickname] = useState("");
  const [passwordcopy, setpasswordcopy] = useState("");
  const [phone, setphone] = useState("");
  const [islogin, setislogin] = useState(true);
  const userrule = /^(\w|[0-9]){4,12}$/;
  const nicknamerule = /^(\w|[\u4e00-\u9fa5]){1,8}$/;
  const phonerule = /^[1][3-8][0-9]{9}$/;
  //页面初始化判断token
  useEffect(() => {
    if (localStorage.getItem("token")) {
      //window.location.pathname = "/home";
      // navigate("/home", { replace: true });

      history.replace("/home");
      // return <Navigate to="/login" replace></Navigate>;
    }
  }, []);
  //存储用户名
  const changgeusename = (e) => {
    if (userrule.test(e.target.value)) {
      console.log("用户名合法");
      setusername(e.target.value);
    }
  };
  //存储密码
  const changgepassword = (e) => {
    if (userrule.test(e.target.value)) {
      console.log("密码合法");
      setpassword(e.target.value);
    }
  };
  //存储昵称
  const depositnickname = (e) => {
    if (nicknamerule.test(e.target.value)) {
      setnickname(e.target.value);
      console.log("合法昵称");
    } else {
      console.log("bu");
    }
  };
  //注册---判断密码是否相同
  const ispasswordidentical = (e) => {
    if (e.target.value === password) {
      setpasswordcopy(e.target.value);
      console.log("密码一致");
    } else {
      console.log("密码不一致");
      return false;
    }
  };
  //注册-----判断合法的电话号码
  const phonenumber = (e) => {
    if (phonerule.test(e.target.value)) {
      setphone(e.target.value);
      //console.log("phone-----", phone);
    } else {
      console.log("请输入合法的电话号码");
    }
  };
  //获取准确的手机号码
  useEffect(() => {
    console.log("phone被改变了--", phone);
  }, [phone]);
  //登录请求
  const login = () => {
    axios
      .post("/user/login", {
        username,
        password,
      })
      .then(
        (success) => {
          console.log(success.data);
          localStorage.setItem("token", success.data.token);
          // localStorage.setItem(
          //   "Userinformation",
          //   JSON.stringify(success.data.user)
          // );
          sessionStorage.setItem("homeBtomNvuId", 0);
          if (localStorage.getItem("token")) {
            navigate("/home", { replace: true });
          }
        },
        (error) => {
          console.log("shibai", error);
        }
      );
  };
  //注册用户请求
  const registeruser = () => {
    if (
      userrule.test(username) &&
      userrule.test(password) &&
      nicknamerule.test(nickname) &&
      passwordcopy === password
    ) {
      axios
        .post("/user/register", {
          username,
          password,
          phone,
          nickname,
          avatar: "avatar",
          role: "user",
        })
        .then(
          (success) => {
            console.log("注册成功", success);
            axios
              .post("/user/login", {
                username,
                password,
              })
              .then(
                (success) => {
                  console.log("登录成功", success.data);
                  localStorage.setItem("token", success.data.token);
                  if (localStorage.getItem("token")) {
                    navigate("/home", { replace: true });
                  }
                },
                (error) => {
                  console.log("shibai", error);
                }
              );
          },
          (error) => {
            console.log("失败", error);
          }
        );
    } else {
      console.log("注册失败");
    }
  };
  return (
    <div id="login">
      <div className="Interface" style={{ display: islogin ? "flex" : "none" }}>
        <div className="login-hader">
          <img src={lfet} alt="返回" />
          <p>登录</p>
        </div>
        <div className="allinput">
          <div className="useinput usenameinput">
            <span>账号</span>
            <input
              placeholder="请输入用户名"
              type="text"
              onChange={(e) => {
                changgeusename(e);
              }}
            />
          </div>
          <div className="useinput passwordinput">
            <span>密码</span>
            <input
              placeholder="请输入密码"
              type="password"
              onChange={(e) => {
                changgepassword(e);
              }}
            />
            <p>忘记密码？</p>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      <div className="Interface" style={{ display: islogin ? "none" : "flex" }}>
        <div className="login-hader">
          <img src={lfet} alt="返回" />
          <p>注册</p>
        </div>
        <div className="allinput">
          <div className="useinput usenameinput">
            <span>账户</span>
            <input
              placeholder="请输入账号"
              type="text"
              onChange={(e) => {
                changgeusename(e);
              }}
            />
          </div>
          <div className="useinput usenameinput">
            <span>昵称</span>
            <input
              placeholder="取一个昵称吧"
              type="text"
              onChange={(e) => {
                depositnickname(e);
              }}
            />
          </div>
          <div className="useinput passwordinput usenameinput">
            <span>密码</span>
            <input
              placeholder="请输入密码"
              type="password"
              onChange={(e) => {
                changgepassword(e);
              }}
            />
          </div>

          <div className="useinput usenameinput">
            <span>确认密码</span>
            <input
              placeholder="确认密码"
              type="password"
              onChange={(e) => {
                ispasswordidentical(e);
              }}
            />
          </div>
          <div className="useinput">
            <span>手机号码</span>
            <input
              placeholder="请输入手机号"
              type="number"
              onChange={(e) => {
                phonenumber(e);
              }}
            />
          </div>
        </div>
      </div>
      {/* ------------------------ */}
      <div className="usebtn" style={{ display: islogin ? "flex" : "none" }}>
        <button
          onClick={() => {
            setislogin(false);
          }}
        >
          注册
        </button>
        <button onClick={login} className="usebtnleft">
          登录
        </button>
      </div>
      <div className="usebtn" style={{ display: islogin ? "none" : "flex" }}>
        <button
          onClick={() => {
            setislogin(true);
          }}
        >
          返回
        </button>
        <button onClick={registeruser} className="usebtnleft">
          注册
        </button>
      </div>
    </div>
  );
}

export default Login;
