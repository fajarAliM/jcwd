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
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import requiresAdmin from "config/requireAdmin";
import axiosInstance from "config/api";
import moment from "moment";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
const RingkasanStatistikPage = () => {
  const [ringkasanSort, setRingkasanSort] = useState(undefined);
  const [sort, setSort] = useState("");
  const [sortPendapatan, setSortPendapatan] = useState("");
  const [sortPembatalan, setSortPembatalan] = useState("");
  const [pemesanan, setPemesanan] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(moment());
  const [penjualan, setPenjualan] = useState([]);
  const [categoryPenjualan, setCategoryPenjualan] = useState([]);
  const [dataPenjualan, setDataPenjualan] = useState([]);
  const [earningData, setEarningData] = useState({});
  const [earningCategory, setEarningCategory] = useState([]);
  const [earning, setEarnings] = useState([]);
  const [cancelationData, setCancelationData] = useState([]);
  const [cancelationCategory, setCancelationCategory] = useState([]);
  const [cancelation, setCancelation] = useState([]);

  const penjualanObatOption = {
    stroke: { width: 2, curve: "smooth" },
    xaxis: {
      categories: categoryPenjualan,
    },
    chart: { type: "line", height: "200px" },
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
    if (sort === "Bulanan" || !sort) {
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
    if (sort === "Bulanan" || sort === "") {
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

  const pendapatanOption = {
    stroke: { width: 2, curve: "smooth" },
    xaxis: {
      categories: earningCategory,
    },
    chart: { type: "area", height: "200px" },
    fill: {
      type: "gradient",
    },
  };

  const pendapatanSeries = earning;

  const converProfitDataByMonth = () => {
    const { revenue } = earningData;
    const dataArr = new Array(parseInt(moment().format("MM"))).fill(0);
    revenue?.forEach((val) => {
      dataArr[parseInt(moment(val.month).format("MM")) - 1] = val.sum;
    });

    const data = [
      {
        name: "profit",
        data: dataArr,
      },
    ];

    setEarningCategory(Month);
    setEarnings(data);
  };

  const pembatalanOption = {
    stroke: { width: 2, curve: "stepline" },
    xaxis: {
      categories: cancelationCategory,
    },
    chart: { type: "line" },
  };

  const pembatalanSeries = cancelation;

  const convertDataPembatalan = () => {
    if (sortPembatalan === "Bulanan" || !sortPembatalan) {
      return;
    }
    const category = [];
    const data = [];
    cancelationData.forEach((val) => {
      if (val.week) {
        category.push(moment(val.week).format("DD MMM"));
        data.push(val.count);
      }
      if (val.year) {
        category.push(moment(val.year).format("YYYY"));
        data.push(val.count);
      }
    });

    const arrayOfData = [
      {
        name: "Obat Bebas",
        data,
      },
    ];

    setCancelationCategory(category);
    setCancelation(arrayOfData);
  };

  const covertDataPembatalanByMonth = () => {
    if (sortPembatalan === "Bulanan" || sortPembatalan === "") {
      const arr = new Array(parseInt(moment().format("MM"))).fill(0);
      cancelationData.forEach((val) => {
        arr[parseInt(moment(val.month).format("MM")) - 1] = val.count;
      });

      const arrayOfData = [
        {
          name: "Obat Bebas",
          data: arr,
        },
      ];

      setCancelationCategory(Month);
      setCancelation(arrayOfData);
    }
  };

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

  const fetchPemesananDataCount = async () => {
    try {
      const res = await axiosInstance.post("/report/get-transaction-count", {
        stateOfDate: ringkasanSort,
      });
      setPemesanan(res.data.result);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const fetchPenjualan = async () => {
    try {
      const res = await axiosInstance.post("/report/get-penjualan", {
        stateOfDate: sort || "Bulanan",
      });
      setPenjualan(res.data.result);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const fetchEarnings = async () => {
    try {
      const res = await axiosInstance.post("/report/get-profit");
      setEarningData(res.data.result);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const fetchCancelation = async () => {
    try {
      const res = await axiosInstance.post("/report/get-pembatalan", {
        stateOfDate: sortPembatalan || "Bulanan",
      });
      setCancelationData(res.data.result);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPemesananDataCount();
    setLastUpdated(moment());
  }, [ringkasanSort]);

  useEffect(() => {
    fetchPenjualan();
    setLastUpdated(moment());
  }, [sort]);

  useEffect(() => {
    if (penjualan.length) {
      convertDataPenjualan();
      covertDataPenjualanByMonth();
    }
  }, [penjualan]);

  useEffect(() => {
    fetchEarnings();
    setLastUpdated(moment());
  }, []);

  useEffect(() => {
    fetchCancelation();
    setLastUpdated(moment());
  }, [sortPembatalan]);

  useEffect(() => {
    if (Object.keys(earningData).length) {
      converProfitDataByMonth();
    }
  }, [earningData]);

  useEffect(() => {
    if (cancelationData?.length) {
      convertDataPembatalan();
      covertDataPembatalanByMonth();
    }
  }, [cancelationData]);

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
                  {moment(lastUpdated).format("LLL")}
                </Typography>
              </Typography>
            </Box>
            <FormControl>
              <Select
                sx={{ width: "161px", height: "24px" }}
                onChange={handleChange}
                value={ringkasanSort}
              >
                <MenuItem value="Harian">1 Hari Terakhir</MenuItem>
                <MenuItem value="Mingguan">1 Minggu Terakhir</MenuItem>
                <MenuItem value="Bulanan">1 Bulan Terakhir</MenuItem>
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
            <CardCategory
              title="Menunggu Pembayaran"
              value={pemesanan.reduce((init, val) => {
                if (val.paymentStatusId === 1) {
                  return init + val.count;
                }

                return init;
              }, 0)}
              column={1.8}
            />
            <CardCategory
              title="Pesanan Baru"
              value={pemesanan.reduce((init, val) => {
                if (val.paymentStatusId === 2) {
                  return init + val.count;
                }

                return init;
              }, 0)}
              column={1.8}
            />
            <CardCategory
              title="Dikirim"
              value={pemesanan.reduce((init, val) => {
                if (val.paymentStatusId === 3) {
                  return init + val.count;
                }

                return init;
              }, 0)}
              column={1.8}
            />
            <CardCategory
              title="Selesai"
              value={pemesanan.reduce((init, val) => {
                if (val.paymentStatusId === 4) {
                  return init + val.count;
                }

                return init;
              }, 0)}
              column={1.8}
            />
            <CardCategory
              title="Dibatalkan"
              value={pemesanan.reduce((init, val) => {
                if (val.paymentStatusId === 5) {
                  return init + val.count;
                }

                return init;
              }, 0)}
              column={1.8}
            />
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
          showSelectOption={false}
        />
        <CardStatistik
          cardTitle="Tren Pembatalan"
          column={6}
          chartOption={pembatalanOption}
          chartSeries={pembatalanSeries}
          selectHandle={pembatalanHandle}
          selectValue={sortPembatalan}
          chartSort={[
            { sortValue: "Mingguan", sortTitle: "Mingguan" },
            { sortValue: "Bulanan", sortTitle: "Bulanan" },
            { sortValue: "Tahunan", sortTitle: "Tahunan" },
          ]}
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

export default RingkasanStatistikPage;
