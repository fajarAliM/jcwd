/* eslint-disable react/jsx-no-useless-fragment */
import { ThemeProvider } from "@mui/material";
import { useRouter } from "next/router";
import AdminPageContainer from "components/Admin/AdminPageContainer";
import "../styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import theme from "../theme";

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        {router.pathname.startsWith("/admin") ? (
          <AdminPageContainer children={<Component {...pageProps} />} />
        ) : (
          <Component {...pageProps} />
        )}
      </ThemeProvider>
    </Provider>
  );
};

export default MyApp;
