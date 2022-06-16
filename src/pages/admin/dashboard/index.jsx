/* eslint-disable react/jsx-no-useless-fragment */
import { Box, Typography, Grid } from "@mui/material";
import CardCategory from "components/Admin/CardCategory";
import CardWithCircularBar from "components/Admin/CardWithCircularBar";
import { useState } from "react";
import CardStatistik from "components/Admin/CardStatistik";

const DashboardPage = () => {
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

  const profitOption = {
    xaxis: {
      categories: [
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jumat",
        "Sabtu",
        "Minggu",
      ],
    },
  };

  const profitSeries = [
    {
      name: "series-1",
      data: [3, 5, 6, 4, 8, 7, 9],
    },
  ];

  const [sort, setSort] = useState("");

  const handleChange = (event) => {
    setSort(event.target.value);
  };

  return (
    <Grid container>
      {/* Container 1 */}
      <Grid container sx={{ marginBottom: "32px" }}>
        <Grid item>
          <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
            Analisis Produk & Toko
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

          <Grid container spacing={2}>
            <CardWithCircularBar
              title="Profit Hari Ini"
              amount="Rp 10.000.000"
              value="+5.700.000"
              percentage={25}
              notation="+"
            />
            <CardWithCircularBar
              title="Total Pemesanan Hari Ini"
              amount="110"
              value="-60"
              percentage={62}
              notation="-"
            />
            <CardWithCircularBar
              title="Sisa Hari Ini"
              amount="110"
              value="+30"
              percentage={30}
              notation="+"
            />
          </Grid>
        </Grid>
      </Grid>

      {/* Container 2 */}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
            Penting Hari Ini
          </Typography>
          <Typography sx={{ color: "Sidebar.500", fontSize: "14px" }}>
            Aktivitas yang perlu kamu ketahui untuk menjaga kepuasan pelanggan
          </Typography>
          <Grid
            container
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <CardCategory title="Pesanan Baru" value={7} column={3} />
            <CardCategory title="Siap Dikirim" value={3} column={3} />
            <CardCategory title="Sedang Dikirim" value={0} column={3} />
            <CardCategory title="Selesai" value={7} column={3} />
            <CardCategory title="Dibatalkan" value={3} column={3} />
            <CardCategory title="Chat Baru" value={0} column={3} />
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
            Kedaluwarsa Obat
          </Typography>
          <Typography sx={{ color: "Sidebar.500", fontSize: "14px" }}>
            Cek tanggal kedaluwarsa untuk mengorganisir stok obat
          </Typography>
          <Grid
            xs={7}
            item
            sx={{ marginRight: "16px", marginTop: "16px", maxHeight: "198px" }}
          >
            <Box
              sx={{
                backgroundColor: "white",
                paddingX: "16px",
                paddingY: "38px",
                boxShadow: 2,
                borderRadius: "5px",
                maxHeight: "198px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                >
                  Telah Kadaluwarsa
                </Typography>
                <Typography
                  sx={{ fontWeight: "bold", fontSize: "24px", color: "red" }}
                >
                  17
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                >
                  Kadaluwarse Bulan Ini
                </Typography>
                <Typography
                  sx={{ fontWeight: "bold", fontSize: "24px", color: "yellow" }}
                >
                  0
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                >
                  Kadaluwarsa 3 Bulan Ke Depan
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "24px",
                    color: "#21CDC0",
                  }}
                >
                  3
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      {/* Container 3 Graph */}
      <Grid container spacing={2}>
        {/* Statistik Profit */}

        <CardStatistik
          cardTitle="Profit"
          cardCaption="Data dinyatakan dalam jutaan rupiah"
          column={6}
          chartOption={profitOption}
          chartSeries={profitSeries}
          selectHandle={handleChange}
          selectValue={sort}
          chartSort={[
            { sortValue: "Mingguan", sortTitle: "Mingguan" },
            { sortValue: "Bulanan", sortTitle: "Bulanan" },
            { sortValue: "Tahunan", sortTitle: "Tahunan" },
          ]}
          chartType="bar"
        />

        <CardStatistik
          cardTitle="Penjualan Obat"
          column={6}
          chartOption={penjualanObatOption}
          chartSeries={penjualanObatSeries}
          selectHandle={handleChange}
          selectValue={sort}
          chartSort={[
            { sortValue: "Mingguan", sortTitle: "Mingguan" },
            { sortValue: "Bulanan", sortTitle: "Bulanan" },
            { sortValue: "Tahunan", sortTitle: "Tahunan" },
          ]}
          chartType="line"
        />
      </Grid>
    </Grid>
  );
};

export default DashboardPage;
