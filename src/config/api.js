import axios from "axios";

// eslint-disable-next-line import/prefer-default-export
export const API_URL = "http://localhost:2000";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

export default axiosInstance;
