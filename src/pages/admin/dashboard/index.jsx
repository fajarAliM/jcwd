/* eslint-disable no-restricted-globals */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/jsx-no-useless-fragment */
import { Box, Typography, Grid } from "@mui/material";
import CardCategory from "components/Admin/CardCategory";
import CardWithCircularBar from "components/Admin/CardWithCircularBar";
import { useState, useEffect } from "react";
import CardStatistik from "components/Admin/CardStatistik";
import requiresAdmin from "config/requireAdmin";
import axiosInstance from "config/api";
import moment from "moment";

const DashboardPage = () => {
  const [pemesanan, setPemesanan] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(moment());
  const [expStok, setExpStok] = useState({});
  const [todayTransaction, setTodayTransaction] = useState({});
  const [todayStok, setTodayStok] = useState({});
  const [penjualan, setPenjualan] = useState([]);
  const [categoryPenjualan, setCategoryPenjualan] = useState([]);
  const [dataPenjualan, setDataPenjualan] = useState([]);
  const [sortPenjualan, setSortPenjualan] = useState("");
  const [sortProfit, setSortProfit] = useState("");
  const [todayRevenue, setTodayRevenue] = useState({});
  const [profitData, setProfitData] = useState({});
  const [categoryProfit, setCategoryProfit] = useState([]);
  const [profit, setProfit] = useState([]);

  const penjualanObatOption = {
    stroke: { width: 2, curve: "smooth" },
    xaxis: {
      categories: categoryPenjualan,
    },
  };

  const penjualanObatSeries = dataPenjualan;

  const Month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const convertDataPenjualan = () => {
    if (sortPenjualan === "Bulanan" || !sortPenjualan) {
      return;
    }
    const category = [];
    const data = [];
    penjualan.forEach((val) => {
      if (val.week) {
        category.push(moment(val.week).format("DD MMM"));
        data.push(val.sum);
      }
      if (val.year) {
        category.push(moment(val.year).format("YYYY"));
        data.push(val.sum);
      }
    });

    const arrayOfData = [
      {
        name: "Obat Bebas",
        data,
      },
    ];

    setCategoryPenjualan(category);
    setDataPenjualan(arrayOfData);
  };

  const covertDataPenjualanByMonth = () => {
    if (sortPenjualan === "Bulanan" || sortPenjualan === "") {
      const arr = new Array(parseInt(moment().format("MM"))).fill(0);
      penjualan.forEach((val) => {
        arr[parseInt(moment(val.month).format("MM")) - 1] = val.sum;
      });

      const arrayOfData = [
        {
          name: "Obat Bebas",
          data: arr,
        },
      ];

      setCategoryPenjualan(Month);
      setDataPenjualan(arrayOfData);
    }
  };

  const profitOption = {
    xaxis: {
      categories: categoryProfit,
    },
  };

  const profitSeries = profit;

  const converProfitDataByMonth = () => {
    const { revenue, capital } = profitData;
    const dataArr = new Array(parseInt(moment().format("MM"))).fill(0);
    revenue?.forEach((val) => {
      dataArr[parseInt(moment(val.month).format("MM")) - 1] = val.sum;
    });

    capital?.forEach((val) => {
      dataArr[parseInt(moment(val.month).format("MM")) - 1] -= val.sum;
    });

    const data = [
      {
        name: "profit",
        data: dataArr,
      },
    ];

    setCategoryProfit(Month);
    setProfit(data);
  };

  const handleChangePenjualan = (event) => {
    setSortPenjualan(event.target.value);
  };

  const handleChangeProfit = (event) => {
    setSortProfit(event.target.value);
  };

  const fetchPemesananDataCount = async () => {
    try {
      const res = await axiosInstance.post("/report/get-transaction-count");
      setPemesanan(res.data.result);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const fetchExpStok = async () => {
    try {
      const res = await axiosInstance.get("/report/get-exp-product");
      setExpStok(res.data.result);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const fetchTodayTransaction = async () => {
    try {
      const res = await axiosInstance.get("/report/get-today-transaction");
      setTodayTransaction(res.data.result);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const fetchTodayStok = async () => {
    try {
      const res = await axiosInstance.get("/report/get-today-stok");
      const stokInfo = {
        todayStok: res.data.result.todayStok.sum,
        yesterdayStok: res.data.result.yesterdayStok.sum,
      };
      setTodayStok(stokInfo);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const fetchPenjualan = async () => {
    try {
      const res = await axiosInstance.post("/report/get-penjualan", {
        stateOfDate: sortPenjualan || "Bulanan",
      });
      setPenjualan(res.data.result);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const fetchRevenue = async () => {
    try {
      const res = await axiosInstance.get("/report/get-today-revenue");
      setTodayRevenue(res.data.result);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const fetchProfit = async () => {
    try {
      const res = await axiosInstance.post("/report/get-profit");
      setProfitData(res.data.result);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPemesananDataCount();
    setLastUpdated(moment());
    fetchExpStok();
    fetchTodayTransaction();
    fetchTodayStok();
    fetchRevenue();
    fetchProfit();
  }, []);

  useEffect(() => {
    fetchPenjualan();
    setLastUpdated(moment());
  }, [sortPenjualan]);

  useEffect(() => {
    if (penjualan.length) {
      convertDataPenjualan();
      covertDataPenjualanByMonth();
    }
  }, [penjualan]);

  useEffect(() => {
    if (Object.keys(profitData).length) {
      converProfitDataByMonth();
    }
  }, [profitData]);

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
              {moment(lastUpdated).format("LLL")}
            </Typography>
          </Typography>

          <Grid container spacing={2}>
            <CardWithCircularBar
              title="Revenue Hari Ini"
              amount={`Rp. ${todayRevenue?.todayRevenue?.result || 0}`}
              value={Math.abs(
                todayRevenue?.todayRevenue?.result -
                  todayRevenue?.yesterdayRevenue?.result
              ).toLocaleString()}
              percentage={
                isNaN(
                  Math.abs(
                    ((todayRevenue?.todayRevenue?.result -
                      todayRevenue?.yesterdayRevenue?.result) /
                      todayRevenue?.yesterdayRevenue?.result) *
                      100
                  ).toFixed(1)
                )
                  ? 0
                  : Math.abs(
                      ((todayRevenue?.todayRevenue?.result -
                        todayRevenue?.yesterdayRevenue?.result) /
                        todayRevenue?.yesterdayRevenue?.result) *
                        100
                    ).toFixed(1)
              }
              notation={
                todayRevenue?.todayRevenue?.result -
                  todayRevenue?.yesterdayRevenue?.result <
                0
                  ? "-"
                  : "+"
              }
            />
            <CardWithCircularBar
              title="Total Pemesanan Hari Ini"
              amount={todayTransaction.todayOrder}
              value={Math.abs(
                todayTransaction.todayOrder - todayTransaction.yesterdayOrder
              )}
              percentage={
                isNaN(
                  Math.abs(
                    ((todayTransaction.todayOrder -
                      todayTransaction.yesterdayOrder) /
                      todayTransaction.yesterdayOrder) *
                      100
                  ).toFixed(1)
                )
                  ? 0
                  : Math.abs(
                      ((todayTransaction.todayOrder -
                        todayTransaction.yesterdayOrder) /
                        todayTransaction.yesterdayOrder) *
                        100
                    ).toFixed(1)
              }
              notation={
                todayTransaction.todayOrder - todayTransaction.yesterdayOrder <
                0
                  ? "-"
                  : "+"
              }
            />
            <CardWithCircularBar
              title="Sisa Stok Hari Ini"
              amount={todayStok.todayStok}
              value={Math.abs(todayStok.todayStok - todayStok.yesterdayStok)}
              percentage={
                isNaN(
                  Math.abs(
                    ((todayStok.todayStok - todayStok.yesterdayStok) /
                      todayStok.yesterdayStok) *
                      100
                  ).toFixed(1)
                )
                  ? 0
                  : Math.abs(
                      ((todayStok.todayStok - todayStok.yesterdayStok) /
                        todayStok.yesterdayStok) *
                        100
                    ).toFixed(1)
              }
              notation={
                todayStok.todayStok - todayStok.yesterdayStok < 0 ? "-" : "+"
              }
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
            <CardCategory
              title="Menunggu Pembayaran"
              value={pemesanan.reduce((init, val) => {
                if (val.paymentStatusId === 1) {
                  return init + val.count;
                }

                return init;
              }, 0)}
              column={4}
            />
            <CardCategory
              title="Pesanan Baru"
              value={pemesanan.reduce((init, val) => {
                if (val.paymentStatusId === 2) {
                  return init + val.count;
                }

                return init;
              }, 0)}
              column={4}
            />
            <CardCategory
              title="Dikirim"
              value={pemesanan.reduce((init, val) => {
                if (val.paymentStatusId === 3) {
                  return init + val.count;
                }

                return init;
              }, 0)}
              column={4}
            />
            <CardCategory
              title="Selesai"
              value={pemesanan.reduce((init, val) => {
                if (val.paymentStatusId === 4) {
                  return init + val.count;
                }

                return init;
              }, 0)}
              column={4}
            />
            <CardCategory
              title="Dibatalkan"
              value={pemesanan.reduce((init, val) => {
                if (val.paymentStatusId === 5) {
                  return init + val.count;
                }

                return init;
              }, 0)}
              column={4}
            />
            {/* <CardCategory title="Chat Baru" value={0} column={4} /> */}
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
                  {expStok?.expStok?.sum || "-"}
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
                  Kadaluwarsa Bulan Ini
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "24px",
                    color: "#F4BB44",
                  }}
                >
                  {expStok?.expSoon?.sum || "-"}
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
                  {expStok?.expIn3Months?.sum || "-"}
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
          column={6}
          chartOption={profitOption}
          chartSeries={profitSeries}
          selectHandle={handleChangeProfit}
          selectValue={sortProfit}
          chartSort={[
            { sortValue: "Mingguan", sortTitle: "Mingguan" },
            { sortValue: "Bulanan", sortTitle: "Bulanan" },
            { sortValue: "Tahunan", sortTitle: "Tahunan" },
          ]}
          chartType="bar"
          showSelectOption={false}
        />

        <CardStatistik
          cardTitle="Penjualan Obat"
          column={6}
          chartOption={penjualanObatOption}
          chartSeries={penjualanObatSeries}
          selectHandle={handleChangePenjualan}
          selectValue={sortPenjualan}
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

// eslint-disable-next-line no-unused-vars
export const getServerSideProps = requiresAdmin((context) => {
  return {
    props: {},
  };
});

export default DashboardPage;
