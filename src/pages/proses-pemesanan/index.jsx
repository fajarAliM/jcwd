/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable no-console */
import { Avatar, Box, Grid, Stack, Tab, Tabs, Typography } from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import PaymentsIcon from "@mui/icons-material/Payments";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EmailIcon from "@mui/icons-material/Email";
import { useEffect, useState } from "react";
import DaftarPemesanan from "components/DaftarPemesanan";
import axiosInstance from "config/api";
import InfiniteScroll from "react-infinite-scroll-component";
import IsiTab from "components/IsiTab";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const ProsesPemesanan = () => {
  const router = useRouter();
  const [value, setValue] = useState(0);
  const [contentList, setContentList] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [jumlahTransaksi, setJumlahTransaksi] = useState(null);
  const [status, setStatus] = useState(null);
  const [sortBy, setSortBy] = useState(router.query._sortyBy);
  const [sortDir, setSortDir] = useState(router.query._sortyDir);
  const authSelector = useSelector((state) => state.auth);
  const [dummy, setDummy] = useState(false);

  const fetchTransactions = async () => {
    try {
      const limit = 4;

      const transactionList = await axiosInstance.get("/transaction", {
        params: {
          _limit: limit,
          _page: page,
          statusTerpilih: status || undefined,
          _sortBy: sortBy ? sortBy : undefined,
          _sortDir: sortDir ? sortDir : undefined,
          userId: authSelector.id || undefined,
        },
      });
      setJumlahTransaksi(transactionList.data.result.count);
      if (page == 1) {
        setContentList(transactionList.data.result.rows);
      } else {
        setContentList((prevList) => [
          ...prevList,
          ...transactionList.data.result.rows,
        ]);
      }
      setMaxPage(Math.ceil(transactionList.data.result.count / limit));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchNextPage = () => {
    setPage(page + 1);
  };

  const statusHandler = (stat) => {
    setStatus(stat);
    setPage(1);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderTransactionList = () => {
    return contentList?.map((val) => {
      return (
        <DaftarPemesanan
          status={val?.payment_status?.status}
          total_harga={val?.total_price}
          produk={val?.transaction_details}
          detail={val}
          image_url={
            val.is_resep ? val.resep_image_url : val.transaction_details
          }
          transaksiId={val?.id}
          reRender={() => {
            setDummy(!dummy);
            setPage(1);
          }}
        />
      );
    });
  };

  useEffect(() => {
    fetchTransactions();

    if (typeof sortDir === "string") {
      router.push({
        query: {
          _sortBy: sortBy,
          _sortDir: sortDir,
        },
      });
    }
  }, [status, sortBy, sortDir, page, dummy]);

  useEffect(() => {
    if (router.isReady) {
      if (router.query._sortBy) {
        setSortBy(router.query._sortBy);
      }
      if (router.query._sortDir) {
        setSortDir(router.query._sortDir);
      }
    }
  }, [router.isReady]);

  return (
    <Box width="100vw" paddingLeft="96px">
      <Grid container sx={{ mt: "56px" }}>
        <Grid item xs={3}>
          <Stack
            sx={{
              border: "1px solid white",
              borderRadius: 3,
              boxShadow: "0 0 15px -10px black",
              display: "flex",
              paddingY: "28px",
              height: "484px",
              width: "300px",
              position: "sticky",
              top: "120px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                borderBottom: "2px solid #F5F6F9",
                paddingBottom: "30px",
                paddingX: "40px",
              }}
            >
              <Avatar
                sx={{ height: "30px", width: "30px" }}
                src={authSelector?.photo_profile}
              />
              <Typography
                sx={{ ml: "20px", fontWeight: 700, fontSize: "14px" }}
              >
                {authSelector.nama}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "inherit",
                py: "20px",
                paddingX: "40px",
              }}
            >
              <Box sx={{ display: "flex" }}>
                <FormatListBulletedIcon sx={{ mr: "26px" }} />
                <Typography sx={{ color: "Brand.500", fontWeight: 700 }}>
                  Proses Pemesanan
                </Typography>
              </Box>
              <Box sx={{ display: "flex" }}>
                <PaymentsIcon sx={{ mr: "26px" }} />
                <Typography>Metode Pembayaran</Typography>
              </Box>
              <Box sx={{ display: "flex" }}>
                <LocationOnIcon sx={{ mr: "26px" }} />
                <Typography>Alamat Pengiriman</Typography>
              </Box>
              <Box sx={{ display: "flex" }}>
                <FavoriteIcon sx={{ mr: "26px" }} />
                <Typography>Wishlist</Typography>
              </Box>
              <Box sx={{ display: "flex" }}>
                <EmailIcon sx={{ mr: "26px" }} />
                <Typography>Pesan Bantuan</Typography>
              </Box>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={9}>
          <Stack
            sx={{
              border: "1px solid white",
              borderRadius: 3,
              boxShadow: "0 0 15px -10px black",
              py: "28px",
              px: "40px",
              width: "900px",
            }}
          >
            <Typography
              sx={{ fontWeight: 700, fontSize: "20px", color: "#213360" }}
            >
              Daftar Pemesanan
            </Typography>
            <Box sx={{ borderBottom: "1px solid #F5F6F9" }}>
              <Tabs
                variant="fullWidth"
                value={value}
                onChange={handleChange}
                sx={{
                  ".MuiTabs-indicator": {
                    backgroundColor: "Brand.500",
                  },
                }}
              >
                <Tab
                  label="Semua"
                  value={0}
                  sx={{ textTransform: "none" }}
                  onClick={() => statusHandler(0)}
                />
                <Tab
                  label="Menunggu"
                  value={1}
                  sx={{ textTransform: "none" }}
                  onClick={() => statusHandler(1)}
                />
                <Tab
                  label="Diproses"
                  value={2}
                  sx={{ textTransform: "none" }}
                  onClick={() => statusHandler(2)}
                />
                <Tab
                  label="Dikirim"
                  value={3}
                  sx={{ textTransform: "none" }}
                  onClick={() => statusHandler(3)}
                />
                <Tab
                  label="Selesai"
                  value={4}
                  sx={{ textTransform: "none" }}
                  onClick={() => statusHandler(4)}
                />
                <Tab
                  label="Dibatalkan"
                  value={5}
                  sx={{ textTransform: "none" }}
                  onClick={() => statusHandler(5)}
                />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <InfiniteScroll
                dataLength={contentList.length}
                next={fetchNextPage}
                hasMore={page < maxPage}
                loader={<Typography>Loading...</Typography>}
                endMessage={
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    mt={2}
                  >
                    <Typography>No more transaction available</Typography>
                  </Box>
                }
              >
                <IsiTab
                  renderTransactionList={renderTransactionList}
                  setSortBy={setSortBy}
                  setSortDir={setSortDir}
                  setPage={setPage}
                />
              </InfiniteScroll>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <InfiniteScroll
                dataLength={contentList.length}
                next={fetchNextPage}
                hasMore={page < maxPage}
                loader={<Typography>Loading...</Typography>}
                endMessage={
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Typography>No more Product available</Typography>
                  </Box>
                }
              >
                <IsiTab
                  renderTransactionList={renderTransactionList}
                  setSortBy={setSortBy}
                  setSortDir={setSortDir}
                  setPage={setPage}
                />
              </InfiniteScroll>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <InfiniteScroll
                dataLength={contentList.length}
                next={fetchNextPage}
                hasMore={page < maxPage}
                loader={<Typography>Loading...</Typography>}
                endMessage={
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Typography>No more Product available</Typography>
                  </Box>
                }
              >
                <IsiTab
                  renderTransactionList={renderTransactionList}
                  setSortBy={setSortBy}
                  setSortDir={setSortDir}
                  setPage={setPage}
                />
              </InfiniteScroll>
            </TabPanel>
            <TabPanel value={value} index={3}>
              <InfiniteScroll
                dataLength={contentList.length}
                next={fetchNextPage}
                hasMore={page < maxPage}
                loader={<Typography>Loading...</Typography>}
                endMessage={
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Typography>No more Product available</Typography>
                  </Box>
                }
              >
                <IsiTab
                  renderTransactionList={renderTransactionList}
                  setSortBy={setSortBy}
                  setSortDir={setSortDir}
                  setPage={setPage}
                />
              </InfiniteScroll>
            </TabPanel>
            <TabPanel value={value} index={4}>
              <InfiniteScroll
                dataLength={contentList.length}
                next={fetchNextPage}
                hasMore={page < maxPage}
                loader={<Typography>Loading...</Typography>}
                endMessage={
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Typography>No more Product available</Typography>
                  </Box>
                }
              >
                <IsiTab
                  renderTransactionList={renderTransactionList}
                  setSortBy={setSortBy}
                  setSortDir={setSortDir}
                  setPage={setPage}
                />
              </InfiniteScroll>
            </TabPanel>
            <TabPanel value={value} index={5}>
              <InfiniteScroll
                dataLength={contentList.length}
                next={fetchNextPage}
                hasMore={page < maxPage}
                loader={<Typography>Loading...</Typography>}
                endMessage={
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Typography>No more Product available</Typography>
                  </Box>
                }
              >
                <IsiTab
                  renderTransactionList={renderTransactionList}
                  setSortBy={setSortBy}
                  setSortDir={setSortDir}
                  setPage={setPage}
                />
              </InfiniteScroll>
            </TabPanel>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProsesPemesanan;
