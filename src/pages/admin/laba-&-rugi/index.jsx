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
import { useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import requiresAdmin from "config/requireAdmin";

const LabaDanRugiPage = () => {
  const [periode, setPeriode] = useState("Bulanan");
  const [bulan, setBulan] = useState("Januari");
  const [tahun, setTahun] = useState("2022");

  const periodeHandle = (event) => {
    setPeriode(event.target.value);
  };
  const bulanHandle = (event) => {
    setBulan(event.target.value);
  };
  const tahunHandle = (event) => {
    setTahun(event);
  };
  return (
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
                20 Januari 2022, 14.30 WIB
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
              <MenuItem value="Bulanan">Bulanan</MenuItem>
              <MenuItem value="Tahunan">Tahunan</MenuItem>
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
              <MenuItem value="Januari">Januari</MenuItem>
              <MenuItem value="Februari">Februari</MenuItem>
              <MenuItem value="Maret">Maret</MenuItem>
              <MenuItem value="April">April</MenuItem>
              <MenuItem value="Mei">Mei</MenuItem>
              <MenuItem value="Juni">Juni</MenuItem>
              <MenuItem value="Juli">Juli</MenuItem>
              <MenuItem value="Agustus">Agustus</MenuItem>
              <MenuItem value="September">September</MenuItem>
              <MenuItem value="Oktober">Oktober</MenuItem>
              <MenuItem value="November">November</MenuItem>
              <MenuItem value="Desember">Desember</MenuItem>
            </Select>
          </FormControl>

          {/* Filter Urutkan */}
          <FormControl>
            <FormLabel>Tahun</FormLabel>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                views={["year"]}
                value={tahun}
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
                    helperText={null}
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
          Periode Bulan Januari Tahun 2022
        </Typography>
        <Typography textAlign="center">
          Terbit: Minggu 13 Februari, 2022 pukul 18.14 (GMT +07.00)
        </Typography>
      </Box>
    </Grid>
  );
};

// eslint-disable-next-line no-unused-vars
export const getServerSideProps = requiresAdmin((context) => {
  return {
    props: {},
  };
});

export default LabaDanRugiPage;
