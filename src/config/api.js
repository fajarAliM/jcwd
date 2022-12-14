/* eslint-disable no-param-reassign */
import axios from "axios";
import Cookies from "js-cookie";

// eslint-disable-next-line import/prefer-default-export
export const API_URL = process.env.NEXT_PUBLIC_API || "http://localhost:2000";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const userToken = Cookies.get("user_auth_token");
  const adminToken = Cookies.get("admin_auth_token");
  if (userToken) {
    config.headers.authorization = userToken || "";
  }
  if (adminToken) {
    config.headers.authorization = adminToken || "";
  }
  return config;
});

export default axiosInstance;
