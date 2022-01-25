import { createStore } from "redux";
import { makeAuth } from "./reducers";

const store = createStore(makeAuth);

export default store;
