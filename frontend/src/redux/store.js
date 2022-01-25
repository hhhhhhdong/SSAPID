import { createStore } from "redux";
import { makeAuth, makeNick } from "./reducers";

export const authStore = createStore(makeAuth);
export const nickStore = createStore(makeNick);
