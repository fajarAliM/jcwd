/* eslint-disable no-console */
import { Box, Container } from "@mui/material";
import UnggahResep from "components/UnggahResep/unggahResep";
import MetodePembayaran from "components/MetodePembayaran";
import ProductCard from "components/ProductCard";
import BannerJaminan from "components/BannerJaminan";
import Kategori from "components/Kategori";
import CarouselCard from "components/carousel";
import axiosInstance from "config/api";
import { useEffect, useState } from "react";
// import ModalUploadPembayaran from "components/modalUploadPembayaran";

const Home = () => {
  const [product, setProduct] = useState([]);

  const fetchProductList = async () => {
    const limit = 6;
    try {
      const productList = await axiosInstance.get("/product", {
        params: {
          _limit: limit,
        },
      });
      setProduct(productList.data.result.rows);
    } catch (err) {
      console.log(err);
    }
  };

  const renderProductList = () => {
    return product?.map((val) => {
      return (
        <ProductCard
          nama_produk={val?.nama_produk}
          harga={val?.harga_jual}
          diskon={val?.diskon}
          produk_image={val?.produk_image_url[0]}
          id={val?.id}
        />
      );
    });
  };

  useEffect(() => {
    fetchProductList();
  }, []);
  return (
    <Box>
      <Container>
        {/* <ModalUploadPembayaran /> */}
        <CarouselCard />
        <Box sx={{ display: "flex", overflowX: "scroll" }}>
          {renderProductList()}
        </Box>
        <UnggahResep />
        <Kategori />
        <Box sx={{ display: "flex", overflowX: "scroll" }}>
          {renderProductList()}
        </Box>
        <BannerJaminan />
        <MetodePembayaran />
      </Container>
    </Box>
  );
};

export default Home;
