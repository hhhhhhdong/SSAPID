import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore } from "redux";
import rootReducer from "./redux/_reducers";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";

const store = createStore(rootReducer, composeWithDevTools());
// 리덕스 개발자 도구
// composeWithDevTools 를 사용하여 리덕스 개발자 도구 활성화

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
