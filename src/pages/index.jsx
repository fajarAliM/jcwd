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

const Home = () => {
  const [product, setProduct] = useState([]);
  const [productWithDiscount, setProductWithDiscount] = useState([]);

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
        />
      );
    });
  };

  useEffect(() => {
    fetchProductList();
    fetchProductWithDiscount();
  }, []);
  return (
    <Box>
      <Container>
        <CarouselCard />
        <UnggahResep />
        <Kategori />
        <Divider sx={{ marginY: "30px" }} />
        <Box>
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
          <Box sx={{ display: "flex" }}>{renderProductWithDiscount()}</Box>
        </Box>
        {/* <Box sx={{ display: "flex", overflowX: "scroll" }}>
          {renderProductList()}
        </Box> */}
        <BannerJaminan />
        <MetodePembayaran />
      </Container>
    </Box>
  );
};

export default Home;
