import {
  Box,
  Button,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import DataTable from "components/Admin/table";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import _ from "lodash";
import moment from "moment";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const columns = [
  { field: "id", headerName: "No", width: 70 },
  { field: "tanggal", headerName: "Tanggal", width: 130 },
  { field: "aktifitas", headerName: "Aktifitas", width: 350, sortable: false },
  {
    field: "masuk",
    headerName: "Masuk (Rp.)",
    width: 120,
    type: "number",
  },
  {
    field: "keluar",
    headerName: "Keluar (Rp.)",
    width: 120,
    type: "number",
  },
  { field: "saldo", headerName: "Saldo", width: 120, type: "number" },
  {
    field: "atur",
    headerName: "Atur",
    width: 130,
    renderCell: () => {
      return <Button variant="outlined">Batalkan</Button>;
    },
  },
];

const rows = [
  {
    id: 1,
    tanggal: moment("2022-04-05 07:25:48").format("DD/MM/YYYY"),
    aktifitas: "Penjualan dengan nomer faktur:  220103412531",
    masuk: 8000000,
    keluar: 8000000,
    saldo: 68000000,
  },
];

const KartuStok = () => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const router = useRouter();

  const handleButtonFilter = () => {
    router.push({
      query: {
        month: moment(month).format("MMMM") || undefined,
        year: year || undefined,
      },
    });

    // tinggal mskin function untuk fetch ke API dan set state
  };

  // Debounce untuk fetch API dan push ke Query

  return (
    <Box
      height="100vh"
      sx={{
        backgroundColor: "#D6F5F3",
      }}
    >
      <Box
        height="64px"
        display="flex"
        alignItems="center"
        paddingX="20px"
        paddingRight="40px"
        paddingLeft="40px"
        justifyContent="space-between"
        boxShadow={1}
        sx={{ backgroundColor: "#FFFFFF" }}
      >
        <Box display="flex" alignItems="center">
          <Link href="/admin/daftar_obat">
            <IconButton>
              <ArrowBackIosNewIcon />
            </IconButton>
          </Link>
          <Typography marginLeft="25px" fontWeight="bold" variant="h6">
            Detail Obat: Actived
          </Typography>
        </Box>
        <Button
          variant="outlined"
          sx={{ width: "105px", height: "40px" }}
          startIcon={<InsertDriveFileIcon />}
        >
          Excel
        </Button>
      </Box>
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
        }}
        marginX="48px"
        marginTop="60px"
        marginBottom="124px"
        borderRadius="16px"
        paddingBottom="40px"
      >
        <Box display="flex">
          <Box
            display="flex"
            flexDirection="column"
            marginLeft="32px"
            mt="30px"
            mr="24px"
          >
            <Typography sx={{ mb: "5px" }}>Bulan</Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                views={["month"]}
                value={month}
                inputFormat="MMMM"
                renderInput={(params) => (
                  <TextField {...params} helperText={null} />
                )}
                onChange={(date) => {
                  setMonth(date);
                }}
              />
            </LocalizationProvider>
          </Box>
          <Box display="flex" flexDirection="column" mt="30px" mr="24px">
            <Typography sx={{ mb: "5px" }}>Tahun</Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                views={["year"]}
                value={year}
                onChange={(date) => {
                  setYear(moment(date).format("YYYY"));
                }}
                renderInput={(params) => (
                  <TextField {...params} helperText={null} placeholder="Year" />
                )}
              />
            </LocalizationProvider>
          </Box>
          <Box display="flex" flexDirection="column" mt="30px" mr="24px">
            <Typography sx={{ mb: "5px" }}>&nbsp;</Typography>
            <Button
              variant="contained"
              sx={{ width: "80px", height: "40px" }}
              onClick={handleButtonFilter}
            >
              Filter
            </Button>
          </Box>
        </Box>
        <Divider
          sx={{
            marginY: "30px",
          }}
        />
        <Box
          marginTop="32px"
          // marginBottom="39px"
          marginX="86px"
          sx={{
            height: 400,
            // width: "100%",
          }}
        >
          <DataTable columns={columns} rows={rows} />
        </Box>
      </Box>
    </Box>
  );
};

export default KartuStok;
