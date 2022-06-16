import {
  Grid,
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import CardCategory from "components/Admin/CardCategory";
import CardStatistik from "components/Admin/CardStatistik";
import { useState } from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
const RingkasanStatistikPage = () => {
  const [ringkasanSort, setRingkasanSort] = useState("");
  const [sort, setSort] = useState("");
  const [sortPendapatan, setSortPendapatan] = useState("");
  const [sortPembatalan, setSortPembatalan] = useState("");

  const penjualanObatOption = {
    stroke: { width: 2, curve: "smooth" },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Des",
      ],
    },
    chart: { type: "line", height: "200px" },
  };

  const penjualanObatSeries = [
    {
      name: "Obat Bebas",
      data: [750, 800, 850, 500, 300, 400, 100, 700, 550, 1200, 850, 300],
    },
    {
      name: "Obat Racikan",
      data: [300, 200, 450, 500, 600, 550, 700, 770, 600, 800, 1250, 100],
    },
  ];

  const pendapatanOption = {
    stroke: { width: 2, curve: "smooth" },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Des",
      ],
    },
    chart: { type: "area", height: "200px" },
    fill: {
      type: "gradient",
    },
  };

  const pendapatanSeries = [
    {
      name: "Obat Bebas",
      data: [750, 800, 850, 500, 300, 400, 100, 700, 550, 1200, 850, 300],
    },
  ];

  const pembatalanOption = {
    stroke: { width: 2, curve: "stepline" },
    xaxis: {
      categories: [
        "Dibatalkan Otomatis",
        "Ditolak Apotik",
        "Permintaan Pembeli",
      ],
    },
    chart: { type: "line" },
  };

  const pembatalanSeries = [
    {
      name: "Obat Racikan",
      data: [300, 200, 450, 500, 600, 550, 700, 770, 600, 800, 1250, 100],
    },
    {
      name: "Obat Resep",
      data: [500, 600, 550],
    },
  ];

  const handleChange = (event) => {
    setRingkasanSort(event.target.value);
  };

  const sortHandle = (event) => {
    setSort(event.target.value);
  };

  const pendapatanHandle = (event) => {
    setSortPendapatan(event.target.value);
  };

  const pembatalanHandle = (event) => {
    setSortPembatalan(event.target.value);
  };

  return (
    <Grid container>
      {/* Container 1 */}
      <Grid container>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
                Ringkasan Statistik
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
            <FormControl>
              <Select
                sx={{ width: "141px", height: "24px" }}
                onChange={handleChange}
                value={ringkasanSort}
              >
                <MenuItem value="Mingguan">Mingguan</MenuItem>
                <MenuItem value="Bulanan">Bulanan</MenuItem>
                <MenuItem value="Tahunan">Tahunan</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Grid
            container
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <CardCategory title="Pesanan Baru" value={7} column={1.8} />
            <CardCategory title="Siap Dikirim" value={3} column={1.8} />
            <CardCategory title="Sedang Dikirim" value={0} column={1.8} />
            <CardCategory title="Selesai" value={7} column={1.8} />
            <CardCategory title="Dibatalkan" value={3} column={1.8} />
            <CardCategory title="Chat Baru" value={0} column={1.8} />
          </Grid>
        </Grid>
      </Grid>

      {/* Container 2 */}
      <Grid container>
        <Grid item xs={12} sx={{ marginTop: "16px" }}>
          <Box
            sx={{
              paddingX: "16px",
              paddingY: "32px",
              backgroundColor: "white",
              borderRadius: 2,
              boxShadow: 2,
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box>
                <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
                  Penjualan Obat{" "}
                </Typography>
              </Box>
              <FormControl>
                <Select
                  sx={{ width: "141px", height: "24px" }}
                  onChange={sortHandle}
                  value={sort}
                >
                  <MenuItem value="Mingguan">Mingguan</MenuItem>
                  <MenuItem value="Bulanan">Bulanan</MenuItem>
                  <MenuItem value="Tahunan">Tahunan</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Chart
              height="218px"
              options={penjualanObatOption}
              series={penjualanObatSeries}
            />
          </Box>
        </Grid>
      </Grid>

      {/* Container 3 */}
      <Grid container spacing={2}>
        <CardStatistik
          cardTitle="Tren Pendapatan"
          column={6}
          chartOption={pendapatanOption}
          chartSeries={pendapatanSeries}
          selectHandle={pendapatanHandle}
          selectValue={sortPendapatan}
          chartSort={[
            { sortValue: "Mingguan", sortTitle: "Mingguan" },
            { sortValue: "Bulanan", sortTitle: "Bulanan" },
            { sortValue: "Tahunan", sortTitle: "Tahunan" },
          ]}
        />
        <CardStatistik
          cardTitle="Tren Pembatalan"
          column={6}
          chartOption={pembatalanOption}
          chartSeries={pembatalanSeries}
          selectHandle={pembatalanHandle}
          selectValue={sortPembatalan}
          chartSort={[
            { sortValue: "Jan", sortTitle: "Jan" },
            { sortValue: "Feb", sortTitle: "Feb" },
            { sortValue: "Mar", sortTitle: "Mar" },
            { sortValue: "Apr", sortTitle: "Apr" },
            { sortValue: "May", sortTitle: "May" },
            { sortValue: "Jun", sortTitle: "Jun" },
            { sortValue: "Jul", sortTitle: "Jul" },
            { sortValue: "Aug", sortTitle: "Aug" },
            { sortValue: "Sep", sortTitle: "Sep" },
            { sortValue: "Oct", sortTitle: "Oct" },
            { sortValue: "Nov", sortTitle: "Nov" },
            { sortValue: "Des", sortTitle: "Des" },
          ]}
        />
      </Grid>
    </Grid>
  );
};

export default RingkasanStatistikPage;
