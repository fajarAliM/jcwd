import jsCookie from "js-cookie";
import api from "../../config/api";

const userLogin = (values, setSubmitting) => {
  return async (dispatch) => {
    try {
      const res = await api.post("/auth/admin/login", {
        username: values.username,
        password: values.password,
      });

      const userResponse = res.data.result;

      jsCookie.set("user_token", userResponse.token);

      dispatch({
        type: "auth/login",
        payload: userResponse.user,
      });

      setSubmitting(false);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err.response.data);
      dispatch({
        type: "USER_ERROR",
        payload: err.response.data.message,
      });

      setSubmitting(false);
    }
  };
};
export default userLogin;
