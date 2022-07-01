import {
  Box,
  Button,
  Divider,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import _ from "lodash";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import ModalTambahObat from "components/Admin/ModalTambahObat";
import requiresAdmin from "config/requireAdmin";
import TableData from "components/Admin/NewTable";
import { useSnackbar } from "notistack";
import axiosInstance from "config/api";

const DaftarProduk = () => {
  const router = useRouter();

  const [namaObatFilter, setNamaObatFilter] = useState(router.query.nama_obat);
  const [tambahObat, setTambahObat] = useState(false);
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [productCategory, setProductCategory] = useState([]);
  const [sortBy, setSortBy] = useState(router.query.sort_by);
  const [sortDir, setSortDir] = useState(router.query.sort_dir);

  const { enqueueSnackbar } = useSnackbar();

  const fetchProductCategory = async () => {
    try {
      const findAllProductCategory = await axiosInstance.get(
        "/admin/product-category"
      );

      setProductCategory(findAllProductCategory?.data?.result);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProductCategory();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await axiosInstance.get("/admin/product", {
        params: {
          _limit: rowPerPage,
          _page: page,
          _sortBy: sortBy || undefined,
          _sortDir: sortDir || undefined,
        },
      });

      const data = res.data.result.rows;

      setTotalData(res.data.result.count);

      setRows(
        data.map((val, idx) => {
          return {
            id: idx + rowPerPage * page + 1,
            namaObat: val.nama_produk,
            noObat: val?.nomor_obat,
            noBpom: val?.nomor_bpom,
            kategori: val.product_category.kategori,
            stok: val.stocks.reduce((init, object) => {
              return init + object.jumlah_stok;
            }, 0),
            stokTypes: val.stocks,
            satuan: val?.satuan,
            nilaiJual: val.harga_jual,
            productId: val.id,
          };
        })
      );
    } catch (err) {
      enqueueSnackbar(err?.response?.data?.message, { variant: "error" });
    }
  };

  useEffect(() => {
    fetchProduct();

    if (typeof namaObatFilter === "string" || typeof sortDir === "string") {
      router.push({
        query: {
          nama_obat: namaObatFilter,
          sort_dir: sortDir,
          sort_by: sortBy,
        },
      });
    }
  }, [namaObatFilter, rowPerPage, page, sortBy, sortDir]);

  useEffect(() => {
    if (router.isReady) {
      if (router.query.nama_obat) {
        setNamaObatFilter(router.query.nama_obat);
      }
      if (router.query.sort_dir) {
        setSortDir(router.query.sort_dir);
      }
      if (router.query.sort_by) {
        setSortBy(router.query.sort_by);
      }
    }
  }, [router.isReady]);

  const sortButton = (val) => {
    if (val === "Highest Price") {
      setSortBy("harga_jual");
      setSortDir("DESC");
    } else if (val === "Lowest Price") {
      setSortBy("harga_jual");
      setSortDir("ASC");
    } else if (val === "name_ASC") {
      setSortBy("nama_produk");
      setSortDir("ASC");
    } else if (val === "name_DESC") {
      setSortBy("nama_produk");
      setSortDir("DESC");
    } else if (val === "") {
      setSortBy("");
      setSortDir("");
    }
    setPage(0);
  };

  const sortDefaultValue = () => {
    if (router.isReady && router.query.sort_dir && router.query.sort_by) {
      if (
        router.query.sort_dir === "DESC" &&
        router.query.sort_by === "harga_jual"
      ) {
        return "Highest Price";
      }
      if (
        router.query.sort_dir === "ASC" &&
        router.query.sort_by === "harga_jual"
      ) {
        return "Lowest Price";
      }
      if (
        router.query.sort_dir === "DESC" &&
        router.query.sort_by === "nama_produk"
      ) {
        return "name_DESC";
      }
      if (router.query.sort_dir === "ASC" && router.query.sort_by === "harga") {
        return "name_ASC";
      }
    }
    return "";
  };

  const debounce = useCallback(
    _.debounce((values, field) => {
      if (field === "namaObat") {
        setNamaObatFilter(values);
      } else if (field === "sort") {
        sortButton(values);
      }
    }, 2000),
    []
  );

  const columns = [
    { props: "No" },
    { props: "Nama Obat" },
    { props: "No.Obat" },
    { props: "No.BPOM" },
    { props: "Kategori" },
    { props: "Stok Available" },
    { props: "Stok On Freeze" },
    { props: "Stok On Delivery" },
    { props: "Total Stok" },
    { props: "Satuan" },
    { props: "Nilai Jual" },
    { props: "Atur" },
  ];

  const handleChangeRowsPerPage = (event) => {
    setRowPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Box display="flex" justifyContent="flex-end">
      <Box width="100%" height="100%">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold">
            Daftar Obat
          </Typography>
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
        <Box
          paddingLeft="32px"
          paddingY="32px"
          width="100%"
          height="772px"
          marginTop="38px"
          marginBottom="94px"
          borderRadius="8px"
          boxShadow="2"
          sx={{
            backgroundColor: "white",
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginBottom="35px"
            marginRight="32px"
          >
            <Box display="flex" alignItems="center">
              <OutlinedInput
                onChange={(e) => debounce(e.target.value, "namaObat")}
                placeholder="Cari nama obat"
                sx={{ width: "300px", height: "55px", mr: 1 }}
                defaultValue={router.query.nama_obat}
                endAdornment={
                  <InputAdornment>
                    <SearchIcon />
                  </InputAdornment>
                }
              />
              <FormControl sx={{ m: 1, minWidth: 120 }} size="medium">
                <InputLabel>Sort</InputLabel>
                <Select
                  label="Sort"
                  onChange={(e) => debounce(e.target.value, "sort")}
                  defaultValue={sortDefaultValue()}
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="Highest Price">Termahal</MenuItem>
                  <MenuItem value="Lowest Price">Termurah</MenuItem>
                  <MenuItem value="name_ASC">A - Z</MenuItem>
                  <MenuItem value="name_DESC">Z - A</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Button
              onClick={() => setTambahObat(true)}
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ width: "160px", height: "45px" }}
            >
              Tambah Obat
            </Button>
            <ModalTambahObat
              open={tambahObat}
              handleClose={() => setTambahObat(false)}
              categories={productCategory}
            />
          </Box>
          <Divider />
          <Box
            sx={{
              height: "100%",
              width: "100%",
              marginTop: "32px",
            }}
          >
            <TableData
              columns={columns}
              rows={rows}
              page={page}
              rowPerPage={rowPerPage}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              totalData={totalData}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

// eslint-disable-next-line no-unused-vars
export const getServerSideProps = requiresAdmin((context) => {
  return {
    props: {},
  };
});

export default DaftarProduk;
