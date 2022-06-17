/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-useless-fragment */
import {
  Grid,
  Box,
  Typography,
  Button,
  OutlinedInput,
  FormControl,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Stack,
  Pagination,
  Divider,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Kursiplastik from "public/Images/kursiplastik.png";
import Image from "next/image";
import ChatIcon from "@mui/icons-material/Chat";
import ReceiptIcon from "@mui/icons-material/Receipt";
import CardOrder from "components/Admin/CardOrder";
import Group from "public/Images/Group.png";

const DibatalkanPage = () => {
  const [order, setOrder] = useState([]);
  const [sortFilter, setSortFilter] = useState("");
  const [urutkan, setUrutkan] = useState("");
  const [cardPerPage, setCardPerPage] = useState("5");

  const filterHandle = (event) => {
    setSortFilter(event.target.value);
  };

  const urutkanHandle = (event) => {
    setUrutkan(event.target.value);
  };

  const cardHandle = (event) => {
    setCardPerPage(event.target.value);
  };
  return (
    <>
      {order.length ? (
        <Grid container>
          {/* Heading Box */}
          <Grid item xs={12} marginBottom="32px">
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box>
                <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
                  Semua Pesanan
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
              <OutlinedInput
                sx={{
                  borderRadius: "10px",
                  width: "328px",
                  height: "42px",
                  backgroundColor: "white",
                  marginRight: "16px",
                }}
                placeholder="Cari nama obat"
                endAdornment={<SearchIcon htmlColor="gray" />}
              />
              {/* Filter Obat */}
              <FormControl sx={{ marginRight: "16px" }}>
                <Select
                  sx={{
                    borderRadius: "10px",
                    minWidth: "156px",
                    height: "42px",
                    backgroundColor: "white",
                  }}
                  onChange={filterHandle}
                  value={sortFilter}
                  displayEmpty
                  autoWidth
                >
                  <MenuItem disabled value="">
                    Filter
                  </MenuItem>
                  <MenuItem value="Obat Resep">Obat Resep</MenuItem>
                  <MenuItem value="Obat Racik">Obat Racik</MenuItem>
                </Select>
              </FormControl>

              {/* Filter Urutkan */}
              <FormControl>
                <Select
                  sx={{
                    borderRadius: "10px",
                    minWidth: "156px",
                    height: "42px",
                    backgroundColor: "white",
                  }}
                  onChange={urutkanHandle}
                  value={urutkan}
                  autoWidth
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Urutkan
                  </MenuItem>
                  <MenuItem value="Terbaru">Terbaru</MenuItem>
                  <MenuItem value="Harga Tertinggi">Harga Tertinggi</MenuItem>
                  <MenuItem value="Harga Terendah">Harga Terendah</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>

          {/* Body Box */}
          <Grid item xs={12}>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
            >
              <Box>
                <FormControlLabel control={<Checkbox />} label="Pilih Semua" />
              </Box>
              <Box display="flex" flexDirection="row" alignContent="center">
                <Typography sx={{ marginRight: "5px" }}>
                  Kartu per halaman
                </Typography>
                <FormControl sx={{ marginRight: "30px" }}>
                  <Select
                    sx={{
                      borderRadius: "5px",
                      minWidth: "68px",
                      height: "28px",
                      backgroundColor: "white",
                      borderColor: "Brand.500",
                    }}
                    onChange={cardHandle}
                    value={cardPerPage}
                    autoWidth
                    displayEmpty
                  >
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                  </Select>
                </FormControl>
                <Stack spacing={2}>
                  <Pagination count={10} color="primary" siblingCount={0} />
                </Stack>
              </Box>
            </Box>

            {/* Product Component */}

            {/* Box 1 */}
            <Box
              sx={{
                marginTop: "32px",
                borderTopRightRadius: "10px",
                borderTopLeftRadius: "10px",
                boxShadow: 2,
                width: "100%",
                paddingX: "32px",
                paddingY: "16px",
                backgroundColor: "white",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  fontSize: "16px",
                  justifyContent: "space-between",
                }}
              >
                {/* Check Box */}
                <Box display="flex" alignItems="center" flexDirection="row">
                  <FormControlLabel
                    sx={{ marginRight: 0 }}
                    control={<Checkbox />}
                  />
                  <Typography sx={{ fontWeight: "bold" }}>
                    Pesanan Selesai
                  </Typography>
                  <Typography sx={{ color: "Sidebar.700", marginLeft: "10px" }}>
                    /
                  </Typography>
                  <Typography sx={{ fontWeight: "bold", marginLeft: "10px" }}>
                    HTMED129X
                  </Typography>
                  <Typography sx={{ color: "Sidebar.700", marginLeft: "10px" }}>
                    /
                  </Typography>
                  <AccessTimeIcon sx={{ marginLeft: "10px", color: "gray" }} />
                  <Typography sx={{ color: "gray" }}>
                    10 Jan 2022, 10:45 WIB
                  </Typography>
                </Box>

                {/* Countdown Box */}
                <Box display="flex" alignItems="center" flexDirection="row">
                  <Typography sx={{ fontWeight: "bold", marginRight: "6px" }}>
                    Respon Sebelum
                  </Typography>
                  <Box
                    sx={{
                      paddingX: "8px",
                      paddingY: "5px",
                      backgroundColor: "#FFDE6B4D",
                      border: "1px solid #FF6600",
                      borderRadius: "5px",
                      color: "Brand.500",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <AccessTimeIcon />
                    <Typography>10 Jan 2022, 10:45 WIB</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Box 2 */}
            <Box
              sx={{
                borderBottomLeftRadius: "10px",
                borderBottomRightRadius: "10px",
                boxShadow: 2,
                width: "100%",
                paddingX: "32px",
                paddingY: "16px",
                backgroundColor: "white",
              }}
            >
              {/* Detail Pemesanan */}
              <Grid container>
                {/* Box Product Image */}
                <Grid item container xs={3}>
                  <Stack direction="row">
                    <Box
                      sx={{
                        height: "75px",
                        width: "75px",
                        borderRadius: "5px",
                        border: "1px solid #B4B9C7",
                      }}
                    >
                      <Image src={Kursiplastik} layout="responsive" />
                    </Box>

                    {/* Box Product Title, Qty, etc */}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        marginX: "20px",
                      }}
                    >
                      <Typography
                        sx={{ fontSize: "14px", fontWeight: "bolder" }}
                      >
                        Resep Dokter
                      </Typography>
                      <Button
                        variant="contained"
                        sx={{
                          maxHeight: "32px",
                          fontSize: "12px",
                        }}
                      >
                        Buat Salinan Resep
                      </Button>
                    </Box>
                  </Stack>
                  <Divider orientation="vertical" />
                </Grid>

                {/* Box Detail Pengiriman */}
                <Grid item container xs={8}>
                  {/* Box Nama Pembeli */}
                  <Grid item xs={3}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Typography
                        sx={{ fontSize: "14px", fontWeight: "bolder" }}
                      >
                        Pembeli
                      </Typography>
                      <Typography sx={{ fontSize: "14px" }}>
                        Elon Mas
                      </Typography>
                    </Box>
                  </Grid>

                  {/* Box Alamat Pembeli */}
                  <Grid item xs={6}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Typography
                        sx={{ fontSize: "14px", fontWeight: "bolder" }}
                      >
                        Alamat
                      </Typography>
                      <Typography sx={{ fontSize: "14px" }}>
                        Jl. Erlangga XII No.25, RT.5/RW.3, Selong, Kec. Kby.
                        Baru, Kota Jakarta Selatan
                      </Typography>
                    </Box>
                  </Grid>

                  {/* Box Kurir */}
                  <Grid item xs={3}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Typography
                        sx={{ fontSize: "14px", fontWeight: "bolder" }}
                      >
                        Kurir
                      </Typography>
                      <Typography sx={{ fontSize: "14px" }}>
                        Grab-Sameday
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>

              {/* Total Harga */}
              <Box
                sx={{
                  marginTop: "14px",
                  marginBottom: "20px",
                  borderRadius: "5px",
                  backgroundColor: "#faf0e8",
                  padding: "16px",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      marginRight: "8px",
                    }}
                  >
                    Total Harga
                  </Typography>
                  <Typography sx={{ fontSize: "12px", fontWeight: "bold" }}>
                    (4 Obat)
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    marginRight: "8px",
                  }}
                >
                  Rp 50.000,-
                </Typography>
              </Box>

              {/* Kategori Footer */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    color: "Brand.500",
                  }}
                >
                  <ChatIcon sx={{ marginRight: "10px" }} />
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      marginRight: "30px",
                    }}
                  >
                    Chat Pembeli
                  </Typography>
                  <ReceiptIcon sx={{ marginRight: "10px" }} />
                  <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
                    Detail Pemesanan
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Button sx={{ color: "Brand.500" }}>Tolak Pesanan</Button>
                  <Button variant="contained">Terima Pesanan</Button>
                </Box>
              </Box>
            </Box>
            <CardOrder />
          </Grid>
        </Grid>
      ) : (
        <Box>
          <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
            Pesanan Dibatalkan
          </Typography>
          <Divider orientation="horizontal" sx={{ marginY: "40px" }} />
          <Box
            width="100%"
            height="100%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Image src={Group} />
            <Typography
              sx={{ marginTop: "20px", fontSize: "20px", color: "Brand.500" }}
            >
              Belum Ada yang dibatalkan
            </Typography>
          </Box>
        </Box>
      )}
    </>
  );
};

export default DibatalkanPage;
