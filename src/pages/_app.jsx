/* eslint-disable react/jsx-no-useless-fragment */
import { ThemeProvider } from "@mui/material";
import { useRouter } from "next/router";
import AdminPageContainer from "components/Admin/AdminPageContainer";
import "../styles/globals.css";
import { Provider } from "react-redux";
import Nav from "components/Nav/nav";
import Footer from "components/Footer";
import NavbarBottom from "components/NavbarBottom";
import { SnackbarProvider } from "notistack";
import AuthProvider from "components/AuthProvider";
import "moment/locale/id";
import AdminProvider from "components/AdminProvider";
import CartProvider from "components/CartProvider";
import { useEffect } from "react";
import GoogleAnalytics from "components/GoogleAnalystics";
import { store } from "../redux/store";
import theme from "../theme";
import * as gtag from "../lib/gtag";

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      if (!router.pathname.startsWith("/admin")) {
        gtag.pageView(url);
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <GoogleAnalytics />
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={3}>
            {router.pathname === "/admin/login" ||
            router.pathname.startsWith("/admin/kartu-stok") ||
            router.pathname === "/register" ||
            router.pathname === "/login" ? (
              <Component {...pageProps} />
            ) : (
              <>
                {router.pathname.startsWith("/admin") ? (
                  <AdminProvider>
                    <AdminPageContainer
                      children={<Component {...pageProps} />}
                    />
                  </AdminProvider>
                ) : (
                  <>
                    <CartProvider>
                      <AuthProvider>
                        <Nav />
                        <Component {...pageProps} />
                        <Footer />
                        <NavbarBottom />
                      </AuthProvider>
                    </CartProvider>
                  </>
                )}
              </>
            )}
          </SnackbarProvider>
        </ThemeProvider>
      </Provider>
    </>
  );
};

export default MyApp;
