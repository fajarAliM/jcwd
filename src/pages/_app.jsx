/* eslint-disable react/jsx-no-useless-fragment */
import { ThemeProvider } from "@mui/material";
import { useRouter } from "next/router";
import AdminPageContainer from "components/Admin/AdminPageContainer";
import theme from "../theme";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  return (
    <ThemeProvider theme={theme}>
      {router.pathname === "/admin/login" ? (
        <Component {...pageProps} />
      ) : (
        <>
          {router.pathname.startsWith("/admin") ? (
            <AdminPageContainer children={<Component {...pageProps} />} />
          ) : (
            <Component {...pageProps} />
          )}
        </>
      )}
    </ThemeProvider>
  );
};

export default MyApp;
