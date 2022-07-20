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
import { useSelector } from "react-redux";

const ProductList = () => {
  const searchSelector = useSelector((state) => state.search);
  const router = useRouter();
  const [contentList, setContentList] = useState([]);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState(searchSelector.searchInput);
  const [sortInput, setSortInput] = useState("");
  const [sortBy, setSortBy] = useState(router.query._sortBy);
  const [sortDir, setSortDir] = useState(router.query._sortDir);
  const [hargaMinimum, setHargaMinimum] = useState(router.query.hargaMinimum);
  const [hargaMaksimum, setHargaMaksimum] = useState(
    router.query.hargaMaksimum
  );
  const [maxPage, setMaxPage] = useState(1);
  const [jumlahProduk, setJumlahProduk] = useState(null);
  const [kategoriTerpilih, setKategoriTerpilih] = useState(
    router.query.kategoriTerpilih
  );

  const fetchProductList = async () => {
    const limit = 4;
    try {
      const productList = await axiosInstance.get("/product", {
        params: {
          _sortBy: sortBy ? sortBy : undefined,
          _sortDir: sortDir ? sortDir : undefined,
          _limit: limit,
          _page: page,
          hargaMinimum: hargaMinimum || undefined,
          hargaMaksimum: hargaMaksimum || undefined,
          kategoriTerpilih: kategoriTerpilih || undefined,
          searchProduk: searchValue,
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

  useEffect(() => {
    if (router.isReady) {
      if (router.query._sortBy) {
        setSortBy(router.query._sortBy);
      }
      if (router.query._sortDir) {
        setSortDir(router.query._sortDir);
      }
      if (router.query.hargaMinimum) {
        setHargaMinimum(router.query.hargaMinimum);
      }
      if (router.query.hargaMaksimum) {
        setHargaMaksimum(router.query.hargaMaksimum);
      }
      if (router.query.kategoriTerpilih) {
        setKategoriTerpilih(router.query.kategoriTerpilih);
      }
    }
  }, [router.isReady]);

  const fetchNextPage = () => {
    setPage(page + 1);
  };

  const sortInputHandler = (event) => {
    const { value } = event.target;
    setSortInput(value);
  };

  const sortButton = () => {
    if (sortInput == "Highest Price") {
      setSortBy("harga_jual");
      setSortDir("DESC");
    } else if (sortInput == "Lowest Price") {
      setSortBy("harga_jual");
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
            harga={val?.harga_jual}
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

    if (
      typeof sortDir === "string" ||
      typeof hargaMinimum === "string" ||
      typeof hargaMaksimum === "string" ||
      typeof kategoriTerpilih === "number" ||
      typeof searchValue === "string"
    ) {
      router.push({
        query: {
          _sortBy: sortBy,
          _sortDir: sortDir,
          hargaMaksimum,
          hargaMinimum,
          kategoriTerpilih,
          searchProduk: searchValue,
        },
      });
    }
  }, [
    page,
    sortDir,
    sortBy,
    hargaMaksimum,
    hargaMinimum,
    kategoriTerpilih,
    searchValue,
  ]);

  useEffect(() => {
    setSearchValue(searchSelector.searchInput);
    setPage(1);
  }, [searchSelector.searchInput]);

  const sortDefaultValue = () => {
    if (router.isReady && router.query._sortDir && router.query._sortBy) {
      if (
        router.query._sortDir === "DESC" &&
        router.query._sortBy === "harga_jual"
      ) {
        return "Highest Price";
      }
      if (
        router.query._sortDir === "ASC" &&
        router.query._sortBy === "harga_jual"
      ) {
        return "Lowest Price";
      }
      if (
        router.query._sortDir === "DESC" &&
        router.query._sortBy === "nama_produk"
      ) {
        return "name_DESC";
      }
      if (router.query._sortDir === "ASC" && router.query._sortBy === "harga") {
        return "name_ASC";
      }
    }
    return "";
  };

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
            setKategoriTerpilih={setKategoriTerpilih}
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
                <Select
                  onChange={sortInputHandler}
                  defaultValue={sortDefaultValue()}
                >
                  <MenuItem value="">None</MenuItem>
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
            hasMore={page < maxPage}
            loader={<Typography>Loading...</Typography>}
            endMessage={
              <Box display="flex" alignItems="center" justifyContent="center">
                <Typography>No more Product available</Typography>
              </Box>
            }
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
