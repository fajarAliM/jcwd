import { Box, Button, Container, Typography } from "@mui/material";
import { fontFamily } from "@mui/system";
import Nav from "components/nav";
import UnggahResep from "components/unggahResep";
import Footer from "components/Footer";
import MetodePembayaran from "components/MetodePembayaran";

const Home = () => {
  return (
    <Box>
      <Nav />
      <UnggahResep />
      <MetodePembayaran />
      <Footer />
    </Box>
  );
};

export default Home;
