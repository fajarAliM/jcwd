/* eslint-disable react/jsx-no-useless-fragment */
import { ThemeProvider } from "@mui/material";
import { useRouter } from "next/router";
import AdminPageContainer from "components/Admin/AdminPageContainer";
import "../styles/globals.css";
import { Provider } from "react-redux";
import Nav from "components/Nav/nav";
import Footer from "components/Footer";
import { SnackbarProvider } from "notistack";
import { store } from "../redux/store";
import theme from "../theme";

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
          {router.pathname === "/admin/login" ||
          router.pathname === "/admin/kartu_stok" ||
          router.pathname === "/register" ||
          router.pathname === "/login" ? (
            <Component {...pageProps} />
          ) : (
            <>
              {router.pathname.startsWith("/admin") ? (
                <AdminPageContainer children={<Component {...pageProps} />} />
              ) : (
                <>
                  <Nav />
                  <Component {...pageProps} />
                  <Footer />
                </>
              )}
            </>
          )}
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default MyApp;
