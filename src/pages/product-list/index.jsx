/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable eqeqeq */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-console */
/* eslint-disable array-callback-return */
import {
  Box,
  Breadcrumbs,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import ProductCard from "components/ProductCard";
import Sidebar from "components/Sidebar";
import axiosInstance from "config/api";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const ProductList = () => {
  const router = useRouter();
  const [contentList, setContentList] = useState([]);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [sortInput, setSortInput] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortDir, setSortDir] = useState("");
  const [hargaMinimum, setHargaMinimum] = useState(null);
  const [hargaMaksimum, setHargaMaksimum] = useState(null);
  const [maxPage, setMaxPage] = useState(1);
  const [jumlahProduk, setJumlahProduk] = useState(null);

  const fetchProductList = async () => {
    const limit = 3;
    try {
      const productList = await axiosInstance.get("/product", {
        params: {
          _sortBy: sortBy ? sortBy : undefined,
          _sortDir: sortDir ? sortDir : undefined,
          _limit: limit,
          _page: page,
          hargaMinimum: hargaMinimum || undefined,
          hargaMaksimum: hargaMaksimum || undefined,
        },
      });
      setJumlahProduk(productList.data.result.count);
      if (page == 1) {
        setContentList(productList.data.result.rows);
      } else {
        setContentList((prevProduct) => [
          ...prevProduct,
          ...productList.data.result.rows,
        ]);
      }
      setMaxPage(Math.ceil(productList.data.result.count / limit));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchNextPage = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (router.isReady) {
      if (router.query._sortDir) {
        setSearchValue(router.query._sortDir);
      }
      if (router.query._sortBy) {
        setSearchValue(router.query._sortBy);
      }
    }
  }, [router.isReady]);

  const sortInputHandler = (event) => {
    const { value } = event.target;
    setSortInput(value);
  };

  const sortButton = () => {
    if (sortInput == "Highest Price") {
      setSortBy("harga");
      setSortDir("DESC");
    } else if (sortInput == "Lowest Price") {
      setSortBy("harga");
      setSortDir("ASC");
    } else if (sortInput == "name_ASC") {
      setSortBy("nama_produk");
      setSortDir("ASC");
    } else if (sortInput == "name_DESC") {
      setSortBy("nama_produk");
      setSortDir("DESC");
    } else if (sortInput == "") {
      setSortBy("");
      setSortDir("");
    }
    setPage(1);
  };

  const renderProductList = () => {
    return contentList?.map((val) => {
      return (
        <Grid item xs={6} sm={4} md={3}>
          <ProductCard
            nama_produk={val?.nama_produk}
            harga={val?.harga}
            diskon={val?.diskon}
            produk_image={val?.produk_image_url[0]}
            id={val?.id}
          />
        </Grid>
      );
    });
  };

  useEffect(() => {
    fetchProductList();

    if (sortInput) {
      router.push({
        query: {
          _sortBy: sortBy ? sortBy : undefined,
          _sortDir: sortDir ? sortDir : undefined,
        },
      });
    }
  }, [page, sortDir, sortBy, hargaMaksimum, hargaMinimum]);
  return (
    <Grid container sx={{ mt: "44px" }}>
      <Grid item sm={0} md={3} order={{ xs: 2, md: 1 }}>
        <Stack sx={{ ml: "90px" }}>
          <Box sx={{ display: "flex", flexDirection: "column", mt: 2, mr: 8 }}>
            <Box sx={{ mb: 5 }} display={{ xs: "none", sm: "block" }}>
              <Breadcrumbs
                sx={{ "&:hover": { cursor: "pointer" } }}
                display={{ xs: "none", md: "block" }}
              >
                <Link underline="hover" href="/">
                  <Typography
                    sx={{
                      color: router.pathname === "/" ? "Brand.500" : "#213360",
                      fontWeight: router.pathname === "/" ? 700 : 400,
                    }}
                  >
                    Beranda
                  </Typography>
                </Link>
                <Link underline="hover" href="/">
                  <Typography
                    sx={{
                      color: router.pathname === "/" ? "Brand.500" : "#213360",
                      fontWeight: router.pathname === "/" ? 700 : 400,
                    }}
                  >
                    Kategori
                  </Typography>
                </Link>
                <Link underline="hover" href="/product-list">
                  <Typography
                    sx={{
                      color:
                        router.pathname === "/product-list"
                          ? "Brand.500"
                          : "#213360",
                      fontWeight:
                        router.pathname === "/product-list" ? 700 : 400,
                    }}
                  >
                    Obat
                  </Typography>
                </Link>
              </Breadcrumbs>
            </Box>
          </Box>
          <Sidebar
            setHargaMaksimum={setHargaMaksimum}
            setHargaMinimum={setHargaMinimum}
            setPage={setPage}
          />
        </Stack>
      </Grid>
      <Grid item sm={12} md={9} order={{ xs: 1, md: 2 }}>
        <Stack sx={{ mr: "96px", ml: "48px" }}>
          <Box
            sx={{
              width: "100%",
              borderBottom: "1px solid #D5D7DD",
              mb: "34px",
            }}
          >
            <Typography
              sx={{ fontWeight: 700, fontSize: "24px", paddingY: "16px" }}
            >
              Obat
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              sx={{ fontSize: "14px", fontWeight: 400, color: "#737A8D" }}
            >
              {jumlahProduk} Produk di Vitamin & Suplemen
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "#737A8D",
                  mr: "17px",
                }}
              >
                Urutkan
              </Typography>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <Select onChange={sortInputHandler}>
                  <MenuItem value="Highest Price">Termahal</MenuItem>
                  <MenuItem value="Lowest Price">Termurah</MenuItem>
                  <MenuItem value="name_ASC">A - Z</MenuItem>
                  <MenuItem value="name_DESC">Z - A</MenuItem>
                </Select>
              </FormControl>
              <Button variant="contained" onClick={sortButton}>
                Cari
              </Button>
            </Box>
          </Box>
          <InfiniteScroll
            dataLength={contentList.length}
            next={fetchNextPage}
            // eslint-disable-next-line react/jsx-boolean-value
            hasMore={page < maxPage}
            loader={<Typography>Loading...</Typography>}
          >
            <Grid
              container
              rowSpacing="24px"
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {renderProductList()}
            </Grid>
          </InfiniteScroll>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default ProductList;
