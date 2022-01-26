import { createStore } from "redux";
import { makeAuth, makeEmail } from "./reducers";

export const authStore = createStore(makeAuth);
export const emailStore = createStore(makeEmail);
