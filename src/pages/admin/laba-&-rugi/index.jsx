/* eslint-disable no-nested-ternary */
import {
  Grid,
  Box,
  Typography,
  Button,
  Divider,
  FormControl,
  MenuItem,
  Select,
  FormLabel,
  TextField,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { useState, useEffect } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import requiresAdmin from "config/requireAdmin";
import moment from "moment";
import IncomeStatement from "components/Admin/IncomeStatement";
import { useSnackbar } from "notistack";
import axiosInstance from "config/api";
import Page from "components/Page";

const LabaDanRugiPage = () => {
  const [periode, setPeriode] = useState("Bulanan");
  const [bulan, setBulan] = useState();
  const [tahun, setTahun] = useState();
  const [income, setIncome] = useState();
  const [outcome, setOutcome] = useState();
  const { enqueueSnackbar } = useSnackbar();

  const periodeHandle = (event) => {
    setPeriode(event.target.value);
  };
  const bulanHandle = (event) => {
    setBulan(event.target.value);
  };
  const tahunHandle = (event) => {
    setTahun(moment(event).format("YYYY"));
  };

  const fetchRevenue = async () => {
    try {
      const res = await axiosInstance.get("/admin/revenue", {
        params: {
          filterByMonth: bulan || undefined,
          filterByYear: tahun || undefined,
        },
      });

      setIncome(res.data.result.income);
      setOutcome(res.data.result.outcome);
    } catch (err) {
      enqueueSnackbar(err?.response?.data?.message, { variant: "error" });
    }
  };

  useEffect(() => {
    if (income || !income || outcome || !outcome) {
      fetchRevenue();
    }
  }, [bulan, tahun, income, outcome]);

  return (
    <Page title="Laporan Laba Rugi">
      <Grid container>
        {/* Heading Box */}
        <Grid item xs={12} marginBottom="32px">
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
                Laporan Laba & Rugi
              </Typography>
              <Typography sx={{ color: "Sidebar.500", fontSize: "14px" }}>
                Update terakhir:{" "}
                <Typography
                  component="span"
                  sx={{ fontSize: "14px", fontWeight: "bold" }}
                >
                  {moment().format("DD MMMM YYYY, HH:mm")}
                </Typography>
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
            <FormControl sx={{ marginRight: "16px" }}>
              <FormLabel>Periode</FormLabel>
              <Select
                sx={{
                  borderRadius: "10px",
                  minWidth: "156px",
                  height: "42px",
                  backgroundColor: "white",
                }}
                onChange={periodeHandle}
                value={periode}
                displayEmpty
                autoWidth
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem
                  value="Bulanan"
                  onClick={() => {
                    setTahun();
                  }}
                >
                  Bulanan
                </MenuItem>
                <MenuItem
                  value="Tahunan"
                  onClick={() => {
                    setBulan();
                    setTahun("2022");
                  }}
                >
                  Tahunan
                </MenuItem>
              </Select>
            </FormControl>
            {/* Filter Obat */}
            <FormControl sx={{ marginRight: "16px" }}>
              <FormLabel>Bulan</FormLabel>
              <Select
                sx={{
                  borderRadius: "10px",
                  minWidth: "156px",
                  height: "42px",
                  backgroundColor: "white",
                }}
                onChange={bulanHandle}
                value={bulan}
                displayEmpty
                autoWidth
              >
                <MenuItem value={1}>Januari</MenuItem>
                <MenuItem value={2}>Februari</MenuItem>
                <MenuItem value={3}>Maret</MenuItem>
                <MenuItem value={4}>April</MenuItem>
                <MenuItem value={5}>Mei</MenuItem>
                <MenuItem value={6}>Juni</MenuItem>
                <MenuItem value={7}>Juli</MenuItem>
                <MenuItem value={8}>Agustus</MenuItem>
                <MenuItem value={9}>September</MenuItem>
                <MenuItem value={10}>Oktober</MenuItem>
                <MenuItem value={11}>November</MenuItem>
                <MenuItem value={12}>Desember</MenuItem>
              </Select>
            </FormControl>

            {/* Filter Urutkan */}
            <FormControl>
              <FormLabel>Tahun</FormLabel>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  views={["year"]}
                  value={tahun || null}
                  onChange={tahunHandle}
                  renderInput={(params) => (
                    <TextField
                      size="small"
                      sx={{
                        backgroundColor: "white",
                        borderRadius: "10px",
                        width: "auto",
                      }}
                      {...params}
                      inputProps={{
                        ...params.inputProps,
                        placeholder: "Year",
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </FormControl>
          </Box>
        </Grid>

        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: "10px",
            padding: "32px 27px",
            width: "100%",
          }}
        >
          <Typography variant="h4" textAlign="center">
            Laporan Laba & Rugi
          </Typography>
          <Typography textAlign="center">
            Periode{" "}
            {bulan
              ? `Bulan ${
                  bulan === 1
                    ? "Januari"
                    : bulan === 2
                    ? "Februari"
                    : bulan === 3
                    ? "Maret"
                    : bulan === 4
                    ? "April"
                    : bulan === 5
                    ? "Mei"
                    : bulan === 6
                    ? "Juni"
                    : bulan === 7
                    ? "Juli"
                    : bulan === 8
                    ? "Agustus"
                    : bulan === 9
                    ? "September"
                    : bulan === 10
                    ? "Oktober"
                    : bulan === 11
                    ? "November"
                    : bulan === 12
                    ? "Desember"
                    : null
                }`
              : null}{" "}
            Tahun {moment(tahun).format("YYYY")}
          </Typography>
          <Typography textAlign="center">
            Terbit: {moment().format("dddd DD MMMM, YYYY")} Pukul{" "}
            {moment().format("HH.mm")} (GMT +07.00)
          </Typography>
          <Box marginTop="20px">
            <IncomeStatement
              title1="Penjualan"
              title2="dalam rupiah"
              kategori={[
                {
                  kategoriName: "Penjualan Barang",
                  value: income?.toLocaleString("id"),
                },
                { kategoriName: "Total Service", value: 0 },
                { kategoriName: "Total Embalance", value: 0 },
                { kategoriName: "Ongkos Kirim", value: 0 },
                { kategoriName: "Diskon Penjualan", value: 0 },
                { kategoriName: "Retur Penjualan", value: 0 },
              ]}
              footer="Penjualan Bersih"
              footerValue={income?.toLocaleString("id")}
            />
            <IncomeStatement
              title1="Harga Pokok Penjualan"
              kategori={[
                {
                  kategoriName: "Persediaan Awal",
                  value: outcome?.toLocaleString("id"),
                },
                { kategoriName: "Pembelian Kotor", value: 0 },
                { kategoriName: "Retur Pembelian Kotor", value: 0 },
                { kategoriName: "Mutasi Barang Masuk", value: 0 },
                { kategoriName: "Mutasi Barang Keluar", value: 0 },
                { kategoriName: "Persediaan Akhir", value: 0 },
              ]}
              footer="Harga Pokok Penjualan"
              footerValue={outcome?.toLocaleString("id")}
            />
            <IncomeStatement
              title1="Pengeluaran Operasional"
              kategori={[
                { kategoriName: "Gaji Karyawan", value: 0 },
                { kategoriName: "Listrik", value: 0 },
                { kategoriName: "Air", value: 0 },
                { kategoriName: "Telepon", value: 0 },
                { kategoriName: "Internet", value: 0 },
                { kategoriName: "Sewa Tempat", value: 0 },
                { kategoriName: "Peralatan Kantor", value: 0 },
                { kategoriName: "Biaya Pengadaan", value: 0 },
                { kategoriName: "Biaya Operasional Lainnya", value: 0 },
              ]}
              footer="Pengeluaran Operasional"
              footerValue={0}
            />
            <IncomeStatement
              title1="Pendapatan Lainnya"
              kategori={[
                { kategoriName: "Cashback Pembelian", value: 0 },
                { kategoriName: "Keuntungan Konsiyasi", value: 0 },
              ]}
              footer="Pendapatan Lainnya"
              footerValue={0}
            />
            <IncomeStatement
              title1="Laba Bersih"
              kategori={[
                { kategoriName: "Laba Kotor", value: 0 },
                { kategoriName: "Pengeluaran Operasional", value: 0 },
                { kategoriName: "Pendapatan Lainnya", value: 0 },
              ]}
              footer="Laba Bersih"
              footerValue={(income - outcome).toLocaleString("id")}
            />
          </Box>
        </Box>
      </Grid>
    </Page>
  );
};

// eslint-disable-next-line no-unused-vars
export const getServerSideProps = requiresAdmin((context) => {
  return {
    props: {},
  };
});

export default LabaDanRugiPage;
