import {
  Box,
  Button,
  Divider,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import DataTable from "components/Admin/table";
import _ from "lodash";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import ModalTambahObat from "components/Admin/ModalTambahObat";

const columns = [
  { field: "id", headerName: "No", width: 70 },
  { field: "namaObat", headerName: "Nama Obat", width: 130 },
  { field: "noObat", headerName: "No Obat", width: 130 },
  {
    field: "noBpom",
    headerName: "No.BPOM",
    width: 130,
  },
  {
    field: "kategori",
    headerName: "Kategori",
    sortable: false,
    width: 130,
  },
  { field: "stok", headerName: "Stok", width: 90, type: "number" },
  { field: "satuan", headerName: "Satuan", width: 130, sortable: false },
  { field: "nilaiBarang", headerName: "Nilai Barang", width: 130 },
  { field: "nilaiJual", headerName: "Nilai Jual", width: 130 },
  {
    field: "atur",
    headerName: "Atur",
    width: 130,
    renderCell: () => {
      return <Button variant="outlined">Lihat Detail</Button>;
    },
  },
];

// hasil map dari state yg dpt dari API
const rows = [
  {
    id: 1,
    namaObat: "Adem Sari",
    noObat: "A000321",
    noBpom: "B000521",
    kategori: "Obat Bebas",
    stok: 20,
    satuan: "Box",
    nilaiBarang: "Rp. 15.000",
    nilaiJual: "Rp. 44.000",
  },
  {
    id: 2,
    namaObat: "Adem Sari",
    noObat: "A000321",
    noBpom: "B000521",
    kategori: "Obat Bebas",
    stok: 10,
    satuan: "Box",
    nilaiBarang: "Rp. 15.000",
    nilaiJual: "Rp. 44.000",
  },
  {
    id: 3,
    namaObat: "Adem Sari",
    noObat: "A000321",
    noBpom: "B000521",
    kategori: "Obat Bebas",
    stok: 15,
    satuan: "Box",
    nilaiBarang: "Rp. 15.000",
    nilaiJual: "Rp. 44.000",
  },
];

const DaftarProduk = () => {
  const [namaObatFilter, setNamaObatFilter] = useState("");
  const [tambahObat, setTambahObat] = useState(false);

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
            <DataTable columns={columns} rows={rows} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DaftarProduk;
