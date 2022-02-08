/* eslint-disable dot-notation */
import axios from "axios";

// const API_END_POINT = "https://localhost:8443";
const API_END_POINT =
  process.env.NODE_ENV === "production"
    ? "https://i6d205.p.ssafy.io:8443"
    : "https://localhost:8443";

const headers = {
  "Content-Type": "application/json",
};

const client = axios.create({
  baseURL: API_END_POINT,
  headers,
});

export default client;
