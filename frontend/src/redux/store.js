import { createStore } from "redux";
import { makeAuth } from "./reducers";

export const authStore = createStore(makeAuth);
