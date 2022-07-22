/* eslint-disable no-underscore-dangle */
/* eslint-disable eqeqeq */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable react/jsx-no-useless-fragment */
import {
  Grid,
  Box,
  Typography,
  Button,
  OutlinedInput,
  FormControl,
  Select,
  MenuItem,
  Stack,
  Pagination,
  Divider,
} from "@mui/material";
import _, { ceil } from "lodash";
import DownloadIcon from "@mui/icons-material/Download";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import SearchIcon from "@mui/icons-material/Search";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import CardOrder from "components/Admin/CardOrder";
import Group from "public/Images/Group.png";
import requiresAdmin from "config/requireAdmin";
import axiosInstance from "config/api";
import { useRouter } from "next/router";

const DalamPengirimanPage = () => {
  const router = useRouter();
  // eslint-disable-next-line no-unused-vars
  const [order, setOrder] = useState([1]);
  const [sortFilter, setSortFilter] = useState("");
  const [urutkan, setUrutkan] = useState("");
  const [transaksi, setTransaksi] = useState([]);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState(router.query._sortBy);
  const [sortDir, setSortDir] = useState(router.query._sortDir);
  const [namaUser, setNamaUser] = useState(router.query.username);
  const [dataCount, setDataCount] = useState([]);
  const [rowPerPage, setRowPerPage] = useState(5);
  const [dummy, setDummy] = useState(false);
  const [isLoadingQueryParams, setIsLoadingQueryParams] = useState(true);

  const filterHandle = (event) => {
    setSortFilter(event.target.value);
  };

  const urutkanHandle = (event) => {
    setUrutkan(event.target.value);
  };

  const fetchTransaksi = async () => {
    try {
      const dataTransaksi = await axiosInstance.get("/transaction", {
        params: {
          statusTerpilih: 3,
          _page: parseInt(page),
          _sortBy: sortBy ? sortBy : undefined,
          _sortDir: sortDir ? sortDir : "ASC",
          username: namaUser,
          _limit: parseInt(rowPerPage),
        },
      });
      setTransaksi(dataTransaksi.data.result.rows);
      setDataCount(dataTransaksi.data.result.count);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      if (router.query._sortBy) {
        setSortBy(router.query._sortBy);
      }
      if (router.query._sortDir) {
        setSortDir(router.query.sortDir);
      }
      if (router.query.username) {
        setNamaUser(router.query.username);
      }
      if (router.query.page) {
        setPage(parseInt(router.query.page));
      }
      setIsLoadingQueryParams(false);
    }
  }, [router.isReady]);

  const namaUserDebounce = useCallback(
    _.debounce((values) => {
      setNamaUser(values);
      setPage(1);
    }, 2000)
  );

  const sortButton = () => {
    if (urutkan == "Terbaru") {
      setSortBy("createdAt");
      setSortDir("DESC");
    } else if (urutkan == "Terlama") {
      setSortBy("createdAt");
      setSortDir("ASC");
    }
    setPage(1);
  };

  const renderTransaksi = () => {
    return transaksi?.map((val) => {
      return (
        <CardOrder
          buyersName={val?.user?.username}
          buyersAddress={val?.address?.alamat_lengkap}
          totalPrice={val?.total_price}
          productImage={
            val?.resep_image_url ||
            val?.transaction_details[0]?.product?.produk_image_url[0]
          }
          productName={
            val?.nomor_resep ||
            val?.transaction_details[0]?.product?.nama_produk
          }
          product={val?.transaction_details}
          productQty={val?.transaction_details[0]?.quantity}
          productPrice={val?.transaction_details[0]?.price_when_sold}
          courier="JNE-REG"
          orderCode={`HTMED-${val.id}`}
          status={val?.paymentStatusId}
          orderTime={val?.createdAt}
          productAdded={val?.productAdded}
          transaksiId={val?.id}
          isObatResep={val?.is_resep}
          productOrderQty={val?.transaction_details.length}
          detail={val}
          reRender={() => {
            setDummy(!dummy);
          }}
        />
      );
    });
  };

  useEffect(() => {
    if (!isLoadingQueryParams) {
      if (
        typeof sortDir === "string" ||
        typeof namaUser === "string" ||
        (typeof page === "number" && !Number.isNaN(page))
      ) {
        fetchTransaksi();
        router.push({
          query: {
            _sortBy: sortBy,
            _sortDir: sortDir,
            username: namaUser,
            page: page || 1,
          },
        });
      }
    }
  }, [
    page,
    sortBy,
    sortDir,
    namaUser,
    rowPerPage,
    dummy,
    router.isReady,
    isLoadingQueryParams,
  ]);

  const sortDefaultValue = () => {
    if (router.isReady && router.query._sortDir && router.query._sortBy) {
      if (
        router.query._sortDir === "DESC" &&
        router.query._sortBy === "createdAt"
      ) {
        return "Terbaru";
      }
      if (
        router.query._sortDir === "ASC" &&
        router.query._sortBy === "createdAt"
      ) {
        return "Terlama";
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
  };

  return (
    <>
      {order.length ? (
        <Grid container>
          {/* Heading Box */}
          <Grid item xs={12} marginBottom="32px">
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box>
                <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
                  Dalam Pengiriman
                </Typography>
              </Box>
              <Box display="flex">
                <Button
                  sx={{ marginRight: "15px" }}
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                >
                  Unduh PDF
                </Button>
                <Button variant="outlined" startIcon={<InsertDriveFileIcon />}>
                  Excel
                </Button>
              </Box>
            </Box>
            <Divider orientation="horizontal" sx={{ marginTop: "40px" }} />
          </Grid>

          {/* Filter Box */}
          <Grid item xs={12} marginBottom="16px">
            {/* Box Filter */}
            <Box display="flex" flexDirection="row">
              <OutlinedInput
                onChange={(e) => namaUserDebounce(e.target.value)}
                sx={{
                  borderRadius: "10px",
                  width: "328px",
                  height: "42px",
                  backgroundColor: "white",
                  marginRight: "16px",
                }}
                placeholder="Cari user"
                endAdornment={<SearchIcon htmlColor="gray" />}
              />
              {/* Filter Obat */}
              <FormControl sx={{ marginRight: "16px" }}>
                <Select
                  sx={{
                    borderRadius: "10px",
                    minWidth: "156px",
                    height: "42px",
                    backgroundColor: "white",
                  }}
                  onChange={filterHandle}
                  value={sortFilter}
                  displayEmpty
                  autoWidth
                >
                  <MenuItem disabled value="">
                    Filter
                  </MenuItem>
                  <MenuItem value="Obat Bebas">Obat Bebas</MenuItem>
                  <MenuItem value="Obat Resep">Obat Resep</MenuItem>
                </Select>
              </FormControl>

              {/* Filter Urutkan */}
              <FormControl>
                <Select
                  sx={{
                    borderRadius: "10px",
                    minWidth: "156px",
                    height: "42px",
                    backgroundColor: "white",
                  }}
                  onChange={urutkanHandle}
                  value={urutkan}
                  autoWidth
                  displayEmpty
                  defaultValue={sortDefaultValue()}
                >
                  <MenuItem value="" disabled>
                    Urutkan
                  </MenuItem>
                  <MenuItem value="Terbaru">Terbaru</MenuItem>
                  <MenuItem value="Terlama">Terlama</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="contained"
                onClick={sortButton}
                sx={{ ml: 3, "&:hover": { border: 0 } }}
              >
                Urutkan
              </Button>
            </Box>
          </Grid>

          {/* Body Box */}
          <Grid item xs={12}>
            <Box display="flex" flexDirection="row" justifyContent="flex-end">
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
                    defaultValue={5}
                    size="small"
                  >
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                  </Select>
                </FormControl>
                <Stack spacing={2}>
                  <Pagination
                    defaultPage={1}
                    siblingCount={0}
                    count={ceil(dataCount / rowPerPage)}
                    page={parseInt(router.query.page)}
                    onChange={handleChangePage}
                    color="primary"
                  />
                </Stack>
              </Box>
            </Box>
            {renderTransaksi()}
          </Grid>
        </Grid>
      ) : (
        <Box>
          <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
            Dalam Pengiriman
          </Typography>
          <Divider orientation="horizontal" sx={{ marginY: "40px" }} />
          <Box
            width="100%"
            height="100%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Image src={Group} />
            <Typography
              sx={{ marginTop: "20px", fontSize: "20px", color: "Brand.500" }}
            >
              Belum Ada Pesanan dalam pengiriman
            </Typography>
          </Box>
        </Box>
      )}
    </>
  );
};

// eslint-disable-next-line no-unused-vars
export const getServerSideProps = requiresAdmin((context) => {
  return {
    props: {},
  };
});

export default DalamPengirimanPage;
