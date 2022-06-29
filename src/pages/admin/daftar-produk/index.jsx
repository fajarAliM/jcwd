import {
  Box,
  Button,
  Divider,
  InputAdornment,
  OutlinedInput,
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
  const [namaObatFilter, setNamaObatFilter] = useState("");
  const [tambahObat, setTambahObat] = useState(false);
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [totalData, setTotalData] = useState(0);

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const debounceNamaObatFilter = useCallback(
    _.debounce((values) => {
      setNamaObatFilter(values);
    }, 2000),
    []
  );

  useEffect(() => {
    router.push({
      query: {
        nama_obat: namaObatFilter === "" ? undefined : namaObatFilter,
      },
    });
  }, [namaObatFilter]);

  useEffect(() => {
    if (router.isReady) {
      if (router.query.nama_obat) {
        setNamaObatFilter(router.query.nama_obat);
      }
    }
  }, [router.isReady]);

  const columns = [
    { props: "No", width: 10 },
    { props: "Nama Obat", width: 125 },
    { props: "No.Obat", width: 75 },
    { props: "No.BPOM", width: 75 },
    { props: "Kategori", width: 75 },
    { props: "Stok Available", width: 155 },
    { props: "Stok On Freeze", width: 155 },
    { props: "Stok On Delivery", width: 75 },
    { props: "Total Stok", width: 75 },
    { props: "Satuan", width: 75 },
    { props: "Nilai Barang", width: 75 },
    { props: "Nilai Jual", width: 75 },
    { props: "Atur", width: 75 },
  ];

  const handleChangeRowsPerPage = (event) => {
    setRowPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const fetchProduct = async () => {
    try {
      const res = await axiosInstance.get("/admin/product", {
        params: {
          _limit: rowPerPage,
          _page: page,
        },
      });

      const data = res.data.result.rows;

      setTotalData(res.data.result.count);

      setRows(
        data.map((val, idx) => {
          return {
            id: idx + rowPerPage * page + 1,
            namaObat: val.nama_produk,
            noObat: val?.no_obat,
            noBpom: val?.noBpom,
            kategori: val.product_category.kategori,
            stok: val.stocks.reduce((init, object) => {
              return init + object.jumlah_stok;
            }, 0),
            stokTypes: val.stocks,
            satuan: val?.satuan,
            nilaiBarang: val.harga_modal,
            nilaiJual: val.harga,
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
  }, [rowPerPage, page]);

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
            <OutlinedInput
              onChange={(e) => debounceNamaObatFilter(e.target.value)}
              placeholder="Cari nama obat"
              sx={{ width: "328px", height: "42px" }}
              endAdornment={
                <InputAdornment>
                  <SearchIcon />
                </InputAdornment>
              }
            />
            <Button
              onClick={() => setTambahObat(true)}
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ width: "160px" }}
            >
              Tambah Obat
            </Button>
            <ModalTambahObat
              open={tambahObat}
              handleClose={() => setTambahObat(false)}
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
