import {
  Box,
  Button,
  Divider,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import _ from "lodash";
import moment from "moment";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import StockHistoryTable from "components/Admin/StockHistoryTable";
import axiosInstance from "config/api";
import { useSnackbar } from "notistack";

const KartuStok = () => {
  const [month, setMonth] = useState("");
  const [rowPerPage, setRowPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [dataCount, setDataCount] = useState([]);
  const [year, setYear] = useState("");
  const [activity, setActivity] = useState("");
  const [dataTable, setDataTable] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();

  const fetchProductStock = async () => {
    try {
      const { productId } = router.query;
      const res = await axiosInstance.get(
        `/admin/stock-history/product/${productId}`,
        {
          params: {
            _limit: rowPerPage,
            _page: page,
            filterByMonth: month || undefined,
            filterByYear: year || undefined,
            filterByActivity: activity || undefined,
          },
        }
      );

      const data = res.data.result.rows;
      setDataCount(res.data.result.count);

      setDataTable(
        data.map((val, idx) => {
          return {
            nomor: idx + rowPerPage * (page - 1) + 1,
            createdAt: val?.createdAt,
            aktivitas: val?.aktivitas,
            expDate: val?.stock?.exp_date,
            jumlahStok: val?.jumlah,
          };
        })
      );
    } catch (err) {
      enqueueSnackbar(err?.response?.data?.message, { variant: "error" });
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowPerPage(event.target.value);
    setPage(1);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    if (router.query.productId) {
      fetchProductStock();
    }
  }, [router.query.productId, rowPerPage, page, year, month, activity]);

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
          <Link href="/admin/daftar-produk">
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
            <Typography sx={{ mb: "5px", fontWeight: "bold" }}>
              Bulan
            </Typography>
            <Select
              size="small"
              displayEmpty
              value={month}
              onChange={(e) => {
                setMonth(e.target.value);
                setPage(1);
              }}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value={1}>January</MenuItem>
              <MenuItem value={2}>February</MenuItem>
              <MenuItem value={3}>March</MenuItem>
              <MenuItem value={4}>April</MenuItem>
              <MenuItem value={5}>May</MenuItem>
              <MenuItem value={6}>June</MenuItem>
              <MenuItem value={7}>July</MenuItem>
              <MenuItem value={8}>August</MenuItem>
              <MenuItem value={9}>September</MenuItem>
              <MenuItem value={10}>October</MenuItem>
              <MenuItem value={11}>November</MenuItem>
              <MenuItem value={12}>Desember</MenuItem>
            </Select>
          </Box>
          <Box display="flex" flexDirection="column" mt="30px" mr="24px">
            <Typography sx={{ mb: "5px", fontWeight: "bold" }}>
              Tahun
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                views={["year"]}
                value={year || null}
                onChange={(date) => {
                  setYear(moment(date).format("YYYY"));
                  setPage(1);
                }}
                renderInput={(params) => (
                  <TextField
                    size="small"
                    {...params}
                    inputProps={{
                      ...params.inputProps,
                      placeholder: "Year",
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </Box>
          <Box display="flex" flexDirection="column" mt="30px" mr="24px">
            <Typography sx={{ mb: "5px", fontWeight: "bold" }}>
              Aktivitas
            </Typography>
            <Select
              size="small"
              displayEmpty
              value={activity}
              onChange={(e) => {
                setActivity(e.target.value);
                setPage(1);
              }}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="Penerimaan Barang">Penerimaan Barang</MenuItem>
              <MenuItem value="Penjualan Barang">Penjualan Barang</MenuItem>
            </Select>
          </Box>
          {activity || month || year ? (
            <Box display="flex" flexDirection="column" mt="30px" mr="24px">
              <Typography sx={{ mb: "5px" }}>&nbsp;</Typography>
              <Button
                size="medium"
                variant="outlined"
                onClick={() => {
                  setActivity("");
                  setMonth("");
                  setYear("");
                }}
              >
                Clear Filter
              </Button>
            </Box>
          ) : null}
        </Box>
        <Divider
          sx={{
            marginY: "30px",
          }}
        />
        <Box padding={5}>
          <StockHistoryTable
            rows={dataTable}
            count={dataCount}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            handleChangePage={handleChangePage}
            page={page}
            rowPerPage={rowPerPage}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default KartuStok;
