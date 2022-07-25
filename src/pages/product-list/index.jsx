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
  Pagination,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import Page from "components/Page";
import ProductCard from "components/ProductCard";
import Sidebar from "components/Sidebar";
import axiosInstance from "config/api";
import { ceil } from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
  const [dataCount, setDataCount] = useState([]);
  const [rowPerPage, setRowPerPage] = useState(8);

  const [isLoadingQueryParams, setIsLoadingQueryParams] = useState(true);

  const fetchProductList = async () => {
    try {
      const productList = await axiosInstance.get("/product", {
        params: {
          _sortBy: sortBy ? sortBy : undefined,
          _sortDir: sortDir ? sortDir : undefined,
          _limit: parseInt(rowPerPage),
          _page: parseInt(page),
          hargaMinimum: hargaMinimum || undefined,
          hargaMaksimum: hargaMaksimum || undefined,
          kategoriTerpilih: kategoriTerpilih || undefined,
          searchProduk: searchValue,
        },
      });
      setContentList(productList.data.result.rows);
      setDataCount(productList.data.result.count);
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
      if (router.query.page) {
        setPage(parseInt(router.query.page));
      }

      setIsLoadingQueryParams(false);
    }
    // console.log(router.query.page);
  }, [router.isReady]);

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
            stocks={val?.stocks}
          />
        </Grid>
      );
    });
  };

  useEffect(() => {
    if (!isLoadingQueryParams) {
      if (
        typeof sortDir === "string" ||
        typeof hargaMinimum === "string" ||
        typeof hargaMaksimum === "string" ||
        typeof kategoriTerpilih === "number" ||
        typeof searchValue === "string" ||
        (typeof page === "number" && !Number.isNaN(page))
      ) {
        fetchProductList();
        router.push({
          query: {
            _sortBy: sortBy,
            _sortDir: sortDir,
            hargaMaksimum,
            hargaMinimum,
            kategoriTerpilih,
            searchProduk: searchValue,
            page: page || 1,
          },
        });
      }
    }
  }, [
    page,
    sortDir,
    sortBy,
    hargaMaksimum,
    hargaMinimum,
    kategoriTerpilih,
    searchValue,
    rowPerPage,
    router.isReady,
    isLoadingQueryParams,
  ]);

  useEffect(() => {
    if (searchSelector.searchInput) {
      setSearchValue(searchSelector.searchInput);
      setPage(1);
    }
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

  const handleChangeRowsPerPage = (event) => {
    setRowPerPage(event.target.value);
    setPage(1);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    // router.push({
    //   query: {
    //     page: newPage,
    //   },
    // });
  };

  return (
    <Page title="Product Page">
      <Grid container sx={{ mt: "44px" }}>
        <Grid item sm={0} md={3} order={{ xs: 2, md: 1 }}>
          <Stack sx={{ ml: { xs: "10px", md: "90px" } }}>
            <Box
              sx={{ display: "flex", flexDirection: "column", mt: 2, mr: 8 }}
            >
              <Box sx={{ mb: 5 }} display={{ xs: "none", sm: "block" }}>
                <Breadcrumbs
                  sx={{ "&:hover": { cursor: "pointer" } }}
                  display={{ xs: "none", md: "block" }}
                >
                  <Link underline="hover" href="/">
                    <Typography
                      sx={{
                        color:
                          router.pathname === "/" ? "Brand.500" : "#213360",
                        fontWeight: router.pathname === "/" ? 700 : 400,
                      }}
                    >
                      Beranda
                    </Typography>
                  </Link>
                  <Link underline="hover" href="/">
                    <Typography
                      sx={{
                        color:
                          router.pathname === "/" ? "Brand.500" : "#213360",
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
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="flex-end"
              sx={{ mt: 3 }}
            >
              <Box display="flex" flexDirection="row" alignContent="center">
                <Typography sx={{ marginRight: "5px" }}>
                  Transaksi per halaman
                </Typography>
                <FormControl sx={{ marginRight: "30px" }}>
                  <Select
                    sx={{
                      borderRadius: "5px",
                      minWidth: "68px",
                      height: "28px",
                      backgroundColor: "white",
                      borderColor: "Brand.500",
                    }}
                    onChange={handleChangeRowsPerPage}
                    defaultValue={8}
                    size="small"
                  >
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={8}>8</MenuItem>
                  </Select>
                </FormControl>
                <Stack spacing={2}>
                  <Pagination
                    defaultPage={page}
                    siblingCount={0}
                    count={ceil(dataCount / rowPerPage)}
                    page={page}
                    onChange={handleChangePage}
                    color="primary"
                  />
                </Stack>
              </Box>
            </Box>
            <Grid
              container
              rowSpacing="24px"
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {renderProductList()}
            </Grid>
          </Stack>
        </Grid>
      </Grid>
    </Page>
  );
};

export default ProductList;
