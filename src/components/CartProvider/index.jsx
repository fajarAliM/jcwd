import axiosInstance from "config/api";
import { useDispatch, useSelector } from "react-redux";
import jsCookie from "js-cookie";
import { addToCart } from "redux/reducer/cart";
import { useEffect } from "react";
import { useRouter } from "next/router";

const CartProvider = ({ children }) => {
  const authSelector = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const fetchCartData = async () => {
    const userToken = jsCookie.get("user_auth_token");
    if (userToken) {
      try {
        const cart = await axiosInstance.get("/cart/get-cart");
        const CartData = cart.data;

        dispatch(addToCart(CartData.data));
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    }
  };

  useEffect(() => {
    if (router.isReady) {
      if (authSelector.id) {
        fetchCartData();
      }
    }
  }, [authSelector.id]);
  return children;
};

export default CartProvider;
