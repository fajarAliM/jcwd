import { Box, Container } from "@mui/material";
import Nav from "components/nav";
import UnggahResep from "components/unggahResep";
import Footer from "components/Footer";
import MetodePembayaran from "components/MetodePembayaran";
import ProductCard from "components/ProductCard";

const Home = () => {
  return (
    <Box>
      <Nav />
      <Container>
        <ProductCard />
        <UnggahResep />
        <MetodePembayaran />
      </Container>
      <Footer />
    </Box>
  );
};

export default Home;
