/* eslint-disable no-console */
import { Box, Container, Divider, Typography } from "@mui/material";
import UnggahResep from "components/UnggahResep/unggahResep";
import MetodePembayaran from "components/MetodePembayaran";
import ProductCard from "components/ProductCard";
import BannerJaminan from "components/BannerJaminan";
import Kategori from "components/Kategori";
import Link from "next/link";
import CarouselCard from "components/carousel";
import axiosInstance from "config/api";
import { useEffect, useState } from "react";
import Image from "next/image";
import Page from "components/Page";
import kejardiskon from "../public/Images/kejardiskon.png";

const Home = () => {
  const [popularProduct, setPopularProduct] = useState([]);
  const [productWithDiscount, setProductWithDiscount] = useState([]);

  const fetchPopularProduct = async () => {
    try {
      const productList = await axiosInstance.get("/product/popular");
      setPopularProduct(productList.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  const renderPopularProduct = () => {
    return popularProduct?.map((val) => {
      return (
        <ProductCard
          nama_produk={val?.product?.nama_produk}
          harga={val?.product?.harga_jual}
          diskon={val?.product?.diskon}
          produk_image={val?.product?.produk_image_url[0]}
          id={val?.product?.id}
          stocks={val?.product?.stocks}
        />
      );
    });
  };

  const fetchProductWithDiscount = async () => {
    try {
      const res = await axiosInstance.get("/product/discount");
      setProductWithDiscount(res.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  const renderProductWithDiscount = () => {
    return productWithDiscount?.map((val) => {
      return (
        <ProductCard
          nama_produk={val?.nama_produk}
          harga={val?.harga_jual}
          diskon={val?.diskon}
          produk_image={val?.produk_image_url[0]}
          id={val?.id}
          stocks={val?.stocks}
        />
      );
    });
  };

  useEffect(() => {
    fetchPopularProduct();
    fetchProductWithDiscount();
  }, []);

  console.log(popularProduct);
  return (
    <Page title="Homepage">
      <Box>
        <Container>
          <CarouselCard />
          <UnggahResep />
          <Kategori />
          <Divider sx={{ marginY: "30px" }} />
          <Box maxWidth="100vw">
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h5">Kejar Diskon Hari Ini</Typography>
              <Link href="/product-list">
                <Typography
                  color="Brand.500"
                  sx={{
                    ":hover": {
                      cursor: "pointer",
                    },
                  }}
                >
                  Lihat Semua
                </Typography>
              </Link>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                overflow: "auto",
                "::-webkit-scrollbar": {
                  display: "none",
                },
                maxWidth: "100vw",
              }}
            >
              <Image
                width="301px"
                height="395px"
                position="relative"
                src={kejardiskon}
              />
              <Box
                sx={{
                  display: "flex",
                  position: "relative",
                  ml: "100px",
                  width: "100%",
                }}
              >
                {renderProductWithDiscount()}
              </Box>
            </Box>
          </Box>
          <Divider sx={{ marginY: "30px" }} />
          <Box>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h5">Popular Product</Typography>
              <Link href="/product-list">
                <Typography
                  color="Brand.500"
                  sx={{
                    ":hover": {
                      cursor: "pointer",
                    },
                  }}
                >
                  Lihat Semua
                </Typography>
              </Link>
            </Box>
            <Box
              sx={{
                display: "flex",
                overflow: "scroll",
                "::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              {renderPopularProduct()}
            </Box>
          </Box>

          <BannerJaminan />
          <MetodePembayaran />
        </Container>
      </Box>
    </Page>
  );
};

export default Home;
