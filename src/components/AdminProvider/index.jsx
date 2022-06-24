import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import jsCookie from "js-cookie";
import { login } from "redux/reducer/auth";
import axiosInstance from "config/api";

const AdminProvider = ({ children }) => {
  const userSelector = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-expressions
  const manggil = async () => {
    const userToken = jsCookie.get("admin_auth_token");
    // TODO masih nembak 2kali ke backend
    if (userToken) {
      try {
        const res = await axiosInstance.get("/auth/admin/refresh-token");

        const fetchDataResult = res?.data.result;
        jsCookie.set("admin_auth_token", fetchDataResult.token || "");

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

export default AdminProvider;
