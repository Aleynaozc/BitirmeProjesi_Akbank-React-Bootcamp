import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import { Provider } from 'react-redux'
import  store  from './services/store'
import axios from 'axios';

axios.interceptors.request.use(
  (config) => {
    const {
      auth: { token },
    } = store.getState();
    config.baseURL = "http://localhost:80/";
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error).then((r) => console.error(r));
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
    
      
      return;
    }

    if (error.response.status === 403) {
      window.history.back();
      return;
    }

    return error.response.data;
  }
);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
    <Provider
      store={store}> 
      <App />
     </Provider>
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
