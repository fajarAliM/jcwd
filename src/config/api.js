import axios from "axios";
// import Cookies from "js-cookie";

// eslint-disable-next-line import/prefer-default-export
export const API_URL = "http://localhost:2000";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

// axiosInstance.interceptors.request.use((config) => {
//   // eslint-disable-next-line no-param-reassign
//   config.headers.authorization = Cookies.get("user_auth_token") || "";
// });

export default axiosInstance;
