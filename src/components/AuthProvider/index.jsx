import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import jsCookie from "js-cookie";
import { login } from "redux/reducer/auth";
import axiosInstance from "config/api";

const AuthProvider = ({ children }) => {
  const userSelector = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-expressions
  const manggil = async () => {
    const userToken = jsCookie.get("user_auth_token");
    if (userToken) {
      try {
        const res = await axiosInstance.get("/auth/refresh-token");

        const fetchDataResult = res?.data.result;
        jsCookie.set("user_auth_token", fetchDataResult.token || "");

        dispatch(login(fetchDataResult.user));
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    }
  };

  useEffect(() => {
    if (!userSelector.id) {
      manggil();
    }
  }, []);

  return children;
};

export default AuthProvider;
