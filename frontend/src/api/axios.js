/* eslint-disable dot-notation */
import axios from "axios";

const API_END_POINT = "https://localhost:8443";

const token = sessionStorage.getItem("accessToken");
const headers = token
  ? {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  : {
      "Content-Type": "application/json",
    };

const client = axios.create({
  baseURL: API_END_POINT,
  headers,
});

export default client;
