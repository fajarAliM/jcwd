import { Button, Container, Typography } from "@mui/material";
import { fontFamily } from "@mui/system";
import Footer from "components/Footer";
import MetodePembayaran from "components/MetodePembayaran";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home = () => {
  return (
    <>
      <Container>
        <Button variant="contain">hello world</Button>
        <Typography variant="h2">hello world</Typography>
      </Container>
      <MetodePembayaran />
      <Footer />
    </>
  );
};

export default Home;
