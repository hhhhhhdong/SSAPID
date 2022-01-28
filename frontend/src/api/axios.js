/* eslint-disable dot-notation */
import axios from "axios";

const BASE_URL = "http://localhost:8080";
const DEFAULT_ACCEPT_TYPE = "application/json";
const token = localStorage.getItem("accessToken");
axios.defaults.baseURL = BASE_URL;
axios.defaults.headers["Content-Type"] = DEFAULT_ACCEPT_TYPE;
axios.defaults.headers["Authorization"] = `Bearer ${token}`;

export default axios;
