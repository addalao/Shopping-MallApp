import "swiper/css/bundle";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import history from './history';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios';
import store from './redux/store.js'


//拦截器
axios.interceptors.request.use(config => {

  const token = localStorage.getItem("token")
  config.headers = {
    'Authorization': `bearer ${token}`
  }
  return config
})

axios.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response.status === 401) {
      localStorage.clear();
      alert("1")
      history.replace("/");
    } else if (error.response.status === 403) {
      alert("请重新使用用户账号登录");
      localStorage.clear();
      history.replace("/");
    }

    return Promise.reject(error);
  }
);
ReactDOM.render(
  <HistoryRouter history={history}>
    <App />
  </HistoryRouter>
  ,
  document.getElementById('root')
);
//不存在效率问题
store.subscribe(() => {
  ReactDOM.render(<HistoryRouter history={history}><App /></HistoryRouter>, document.getElementById("root"))
})

