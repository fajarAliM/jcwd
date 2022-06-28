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

const DaftarProduk = () => {
  const [namaObatFilter, setNamaObatFilter] = useState("");
  const [tambahObat, setTambahObat] = useState(false);
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(10);

  const router = useRouter();

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

  const rows = [
    {
      id: 1,
      namaObat: "Adem Sari",
      noObat: "A000321",
      noBpom: "B000521",
      kategori: "Obat Bebas",
      stok: 20,
      satuan: "Box",
      nilaiBarang: 15000,
      nilaiJual: 44000,
    },
    {
      id: 2,
      namaObat: "Adem Sari",
      noObat: "A000321",
      noBpom: "B000521",
      kategori: "Obat Bebas",
      stok: 10,
      satuan: "Box",
      nilaiBarang: 15000,
      nilaiJual: 44000,
    },
    {
      id: 3,
      namaObat: "Adem Sari",
      noObat: "A000321",
      noBpom: "B000521",
      kategori: "Obat Bebas",
      stok: 15,
      satuan: "Box",
      nilaiBarang: 15000,
      nilaiJual: 44000,
    },
  ];

  const columns = [
    "No",
    "Nama Obat",
    "No.Obat",
    "No.BPOM",
    "Kategori",
    "Stok",
    "Satuan",
    "Nilai Barang",
    "Nilai Jual",
    "Atur",
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
      <Box width="1186px" height="100%">
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
          paddingRight="32px"
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
              height: 400,
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
