import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { compose, createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import reducers from "./modules";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ })
  : compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

// 희석님 썻던코드
// 리덕스 thunk 가 어떤건지 확인하고 패스할것
// import { Provider } from 'react-redux';
// import { createStore } from 'redux';
// import Reducer from './modules';

// const store = createStore(Reducer);
// console.log(store.getState());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
