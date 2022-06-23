import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import moment from "moment";
import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DataTable from "components/Admin/table";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import requiresAdmin from "config/requireAdmin";

const columns = [
  { field: "id", headerName: "No", width: 70 },
  { field: "tanggal", headerName: "Tanggal", width: 130 },
  { field: "aktifitas", headerName: "Aktifitas", width: 200, sortable: false },
  {
    field: "petugas",
    headerName: "Petugas",
    sortable: false,
    width: 130,
  },
  {
    field: "keluar",
    headerName: "Keluar",
    width: 90,
    type: "number",
  },
  { field: "masuk", headerName: "Masuk", width: 90, type: "number" },
  { field: "sisa", headerName: "Sisa", width: 90, type: "number" },
  { field: "tglKadaluarsa", headerName: "Tgl.Kadaluwarsa", width: 130 },
];

const rows = [
  {
    id: 1,
    tanggal: moment("2022-04-05 07:25:48").format("DD MMMM YYYY"),
    aktifitas: "Penerimaan Barang",
    petugas: "Mike",
    keluar: 10,
    masuk: 20,
    sisa: 10,
    tglKadaluarsa: moment("2022-04-05 07:25:48").format("DD MMMM YYYY"),
  },
  {
    id: 2,
    tanggal: moment("2022-04-05 07:25:48").format("DD MMMM YYYY"),
    aktifitas: "Penjualan Barang",
    petugas: "Yuyu",
    keluar: 20,
    masuk: 30,
    sisa: 10,
    tglKadaluarsa: moment("2022-04-05 07:25:48").format("DD MMMM YYYY"),
  },
  {
    id: 3,
    tanggal: moment("2022-04-05 07:25:48").format("DD MMMM YYYY"),
    aktifitas: "Penjualan Barang",
    petugas: "Jer",
    keluar: 50,
    masuk: 50,
    sisa: 0,
    tglKadaluarsa: moment("2022-04-05 07:25:48").format("DD MMMM YYYY"),
  },
  {
    id: 4,
    tanggal: moment("2022-04-05 07:25:48").format("DD MMMM YYYY"),
    aktifitas: "Penjualan Barang",
    petugas: "Yuyu",
    keluar: 20,
    masuk: 30,
    sisa: 10,
    tglKadaluarsa: moment("2022-04-05 07:25:48").format("DD MMMM YYYY"),
  },
];

const KartuStok = () => {
  const [namaObatFilter, setNamaObatFilter] = useState("");
  const [dateRange, setDateRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const router = useRouter();

  // const debounceNamaObatFilter = useCallback(
  //   _.debounce((values) => {
  //     setNamaObatFilter(values);
  //   }, 2000),
  //   []
  // );

  const handleFilter = () => {
    // didalam sini juga ada fetching API dan dimskin ke dalam state
    router.push({
      query: {
        nama_obat: namaObatFilter,
        start_date: moment(dateRange[0]?.startDate).format("DD-MM-YYYY"),
        end_date: moment(dateRange[0]?.endDate).format("DD-MM-YYYY"),
      },
    });
  };

  useEffect(() => {
    if (router.isReady) {
      if (router.query.nama_obat) {
        setNamaObatFilter(router.query.nama_obat);
      }
    }
  }, [router.isReady]);

  return (
    <Box paddingTop="38px" width="1186px" height="100%" paddingX="48px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" fontWeight="bold">
          Buku Kas
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
          alignItems="center"
          marginBottom="35px"
          marginRight="32px"
        >
          <Box
            display="flex"
            flexDirection="column"
            // marginLeft="32px"
            // mt="30px"
            mr="24px"
          >
            <Typography sx={{ mb: "5px" }}>Akun Kas</Typography>
            <Typography>BCA xxxxxxxxxxxx</Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            // marginLeft="32px"
            // mt="30px"
            mr="24px"
          >
            <Typography sx={{ mb: "5px" }}>Tanggal</Typography>
            <OutlinedInput
              onClick={handleClickOpen}
              sx={{ width: "328px", height: "42px" }}
              value={
                dateRange[0].startDate
                  ? `${moment(dateRange[0].startDate).format("l")} - ${moment(
                      dateRange[0].endDate
                    ).format("l")}`
                  : undefined
              }
            />
            <Dialog open={open} onClose={handleClose}>
              <DialogContent>
                <DateRange
                  ranges={dateRange}
                  editableDateInputs
                  moveRangeOnFirstSelection={false}
                  onChange={(date) => setDateRange([date.selection])}
                />
              </DialogContent>
            </Dialog>
          </Box>
          <Box display="flex" flexDirection="column" justifyContent="end">
            <Typography sx={{ mb: "5px" }}>&nbsp;</Typography>
            <OutlinedInput
              onChange={(e) => setNamaObatFilter(e.target.value)}
              placeholder="Cari nama obat"
              sx={{ width: "328px", height: "42px" }}
              endAdornment={
                <InputAdornment>
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="end"
            marginLeft="18px"
          >
            <Typography sx={{ mb: "5px" }}>&nbsp;</Typography>
            <Button
              variant="contained"
              sx={{ width: "70px" }}
              onClick={handleFilter}
            >
              Filter
            </Button>
          </Box>
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
  );
};

// eslint-disable-next-line no-unused-vars
export const getServerSideProps = requiresAdmin((context) => {
  return {
    props: {},
  };
});

export default KartuStok;
