/* eslint-disable no-restricted-globals */
import {
  Autocomplete,
  Box,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axiosInstance from "config/api";
import requiresAdmin from "config/requireAdmin";
import { useEffect, useState } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CardStatistik from "components/Admin/CardStatistik";
import moment from "moment";

const ReportCart = ({ title, data = 0, percentange = "0", notation = "+" }) => {
  return (
    <Box
      sx={{ backgroundColor: "white" }}
      padding={2}
      height="120px"
      display="flex"
      justifyContent="space-between"
    >
      <Box width="50%">
        <Typography>{title}</Typography>
        <Typography variant="h3" marginTop={1}>
          {data}
        </Typography>
      </Box>
      <Box
        width="50%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {notation === "+" ? (
          <ArrowUpwardIcon sx={{ fontSize: "50px" }} color="success" />
        ) : (
          <ArrowDownwardIcon sx={{ fontSize: "50px" }} color="error" />
        )}
        <Typography variant="h4" marginLeft={1}>
          {percentange}%
        </Typography>
      </Box>
    </Box>
  );
};

const ProductDetails = () => {
  const [sort, setSort] = useState("");
  const [allProduct, setAllProduct] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [qtySold, setQtySold] = useState({});
  const [viewCount, setViewCount] = useState({});
  const [productSoldCount, setProductSoldCount] = useState({});
  const [revenueRawData, setRevenueRawData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [revenueCategory, setRevenueCategory] = useState([]);

  // ada bug, klo di datanya ada yg null, percentagenya jadi infinity
  // count product di transaction detail trus dibagi sama viewednya buat dptin conversion rate

  const fetchAllProduct = async () => {
    try {
      const res = await axiosInstance.get("/product/product-name");
      const products = res.data.result;

      const modifiedProduct = products.map((val) => {
        return { label: val.nama_produk, id: val.id };
      });
      setAllProduct(modifiedProduct);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

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

  const penjualanObatOption = {
    stroke: { width: 2, curve: "smooth" },
    xaxis: {
      categories: revenueCategory,
    },
  };

  const penjualanObatSeries = revenueData;

  const convertRevenueDataByMonth = () => {
    if (sort === "Bulanan" || sort === "") {
      const arr = new Array(parseInt(moment().format("MM"))).fill(0);
      revenueRawData.forEach((val) => {
        arr[parseInt(moment(val.month).format("MM")) - 1] = val.sum;
      });

      const arrayOfData = [
        {
          name: "Obat Bebas",
          data: arr,
        },
      ];

      setRevenueCategory(Month);
      setRevenueData(arrayOfData);
    }
  };

  const convertRevenueNotByMonth = () => {
    if (sort === "Bulanan" || sort === "") {
      return;
    }

    const category = [];
    const data = [];

    revenueRawData.forEach((val) => {
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

    setRevenueCategory(category);
    setRevenueData(arrayOfData);
  };

  const handleChange = (event) => {
    setSort(event.target.value);
  };

  const fetchQtySold = async () => {
    try {
      const res = await axiosInstance.post("/report/get-product-qty-sold", {
        stateOfDate: sort || "Bulanan",
        productId: selectedProduct,
      });

      setQtySold(res.data.result);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const fetchItemViewedCount = async () => {
    try {
      const res = await axiosInstance.post("/report/get-product-viewed-count", {
        stateOfDate: sort || "Bulanan",
        productId: selectedProduct,
      });

      setViewCount(res.data.result);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const fetchRevenuePerProduct = async () => {
    try {
      const res = await axiosInstance.post("/report/get-product-revenue", {
        stateOfDate: sort || "Bulanan",
        productId: selectedProduct,
      });

      setRevenueRawData(res.data.result);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const fetchItemsSoldCount = async () => {
    try {
      const res = await axiosInstance.post("/report/get-product-sold-count", {
        stateOfDate: sort || "Bulanan",
        productId: selectedProduct,
      });

      setProductSoldCount(res.data.result);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  useEffect(() => {
    if (selectedProduct) {
      fetchQtySold();
      fetchItemViewedCount();
      fetchItemsSoldCount();
      fetchRevenuePerProduct();
    }
  }, [selectedProduct, sort]);

  useEffect(() => {
    if (revenueRawData.length) {
      convertRevenueDataByMonth();
      convertRevenueNotByMonth();
    }
  }, [revenueRawData]);

  return (
    <Box>
      <Typography variant="h4" marginBottom={4}>
        Product Performance Report
      </Typography>
      <Box display="flex" justifyContent="space-between">
        <Autocomplete
          disablePortal
          options={allProduct}
          getOptionLabel={(val) => val.label}
          sx={{ width: 300 }}
          onChange={(event, value) => {
            if (value) {
              setSelectedProduct(value.id);
            } else {
              setSelectedProduct(null);
            }
          }}
          renderInput={(params) => (
            <TextField {...params} label="Select Product" />
          )}
        />
        <Box>
          <FormControl sx={{ width: "125px" }}>
            <Select
              sx={{ height: "25px" }}
              onChange={handleChange}
              defaultValue={sort}
            >
              <MenuItem value="Mingguan">Mingguan</MenuItem>
              <MenuItem value="Bulanan">Bulanan</MenuItem>
              <MenuItem value="Tahunan">Tahunan</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box marginTop={4} marginBottom={2}>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <ReportCart
              title="Quantity Sold"
              data={qtySold.data}
              percentange={
                isNaN(
                  Math.abs(
                    ((qtySold.data - qtySold.prevData) / qtySold.prevData) * 100
                  ).toFixed(1)
                )
                  ? 0
                  : Math.abs(
                      ((qtySold.data - qtySold.prevData) / qtySold.prevData) *
                        100
                    ).toFixed(1)
              }
              notation={qtySold.data - qtySold.prevData < 0 ? "-" : "+"}
            />
          </Grid>
          <Grid item xs={4}>
            <ReportCart
              title="Item Viewed"
              data={viewCount.data}
              percentange={
                isNaN(
                  Math.abs(
                    ((viewCount.data - viewCount.prevData) /
                      viewCount.prevData) *
                      100
                  ).toFixed(1)
                )
                  ? 0
                  : Math.abs(
                      ((viewCount.data - viewCount.prevData) /
                        viewCount.prevData) *
                        100
                    ).toFixed(1)
              }
              notation={viewCount.data - viewCount.prevData < 0 ? "-" : "+"}
            />
          </Grid>
          <Grid item xs={4}>
            <ReportCart
              title="Conversion Rate"
              data={
                isNaN((productSoldCount.data / viewCount.data) * 100)
                  ? "0%"
                  : `${Math.round(
                      (productSoldCount.data / viewCount.data) * 100
                    )}%`
              }
              percentange={
                isNaN(
                  Math.abs(
                    ((productSoldCount.data / viewCount.data -
                      productSoldCount.prevData / viewCount.prevData) /
                      (productSoldCount.prevData / viewCount.prevData)) *
                      100
                  ).toFixed(1)
                )
                  ? 0
                  : Math.abs(
                      ((viewCount.data - viewCount.prevData) /
                        viewCount.prevData) *
                        100
                    ).toFixed(1)
              }
              notation={
                productSoldCount.data / viewCount.data -
                  productSoldCount.prevData / viewCount.prevData <
                0
                  ? "-"
                  : "+"
              }
            />
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={2}>
        {/* Statistik Profit */}

        <CardStatistik
          cardTitle="Revenue"
          column={12}
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
          showSelectOption={false}
          chartHeight="258px"
        />
      </Grid>
      {/* <Typography variant="h5">revenue of this product</Typography>
        <Typography variant="h5">percentage of revenue</Typography> */}
    </Box>
  );
};

// eslint-disable-next-line no-unused-vars
export const getServerSideProps = requiresAdmin((context) => {
  return {
    props: {},
  };
});

export default ProductDetails;
