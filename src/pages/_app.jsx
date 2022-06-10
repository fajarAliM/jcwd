import { ThemeProvider } from "@mui/material";
import { useRouter } from "next/router";
import theme from "theme";
import "../styles/globals.css";
import AdminPageContainer from "components/Admin/AdminPageContainer";

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  return (
    <ThemeProvider theme={theme}>
      {router.pathname.startsWith("/admin") ? (
        <AdminPageContainer children={<Component {...pageProps} />} />
      ) : (
        <Component {...pageProps} />
      )}
    </ThemeProvider>
  );
};

export default MyApp;
