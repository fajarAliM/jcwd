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
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ChatIcon from "@mui/icons-material/Chat";
import ReceiptIcon from "@mui/icons-material/Receipt";

const SemuaPesananPage = () => {
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
    <Grid container>
      {/* Heading Box */}
      <Grid item xs={12} marginBottom="58px">
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
        <Box display="flex" flexDirection="row" justifyContent="space-between">
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
          <Stack direction="row">
            <Stack direction="row">
              {/* Box Product Image */}
              <Box
                gridColumn={3}
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
                gridColumn={3}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginX: "20px",
                }}
              >
                <Typography sx={{ fontSize: "14px", fontWeight: "bolder" }}>
                  Kursi Plastik
                </Typography>
                <Typography sx={{ fontSize: "14px", color: "gray" }}>
                  2 x 20.000
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    color: "Brand.500",
                  }}
                >
                  <Typography sx={{ fontSize: "12px" }}>
                    lihat 2 obat lainnya
                  </Typography>
                  <KeyboardArrowDownIcon sx={{ size: "12px" }} />
                </Box>
              </Box>
              <Divider orientation="vertical" />

              {/* Box Nama Pembeli */}
              <Box
                gridColumn={3}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginX: "20px",
                }}
              >
                <Typography sx={{ fontSize: "14px", fontWeight: "bolder" }}>
                  Pembeli
                </Typography>
                <Typography sx={{ fontSize: "14px" }}>Elon Mas</Typography>
              </Box>

              {/* Box Alamat Pembeli */}
              <Box
                gridColumn={3}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginX: "20px",
                  maxWidth: "244px",
                }}
              >
                <Typography sx={{ fontSize: "14px", fontWeight: "bolder" }}>
                  Alamat
                </Typography>
                <Typography sx={{ fontSize: "14px" }}>
                  Jl. Erlangga XII No.25, RT.5/RW.3, Selong, Kec. Kby. Baru,
                  Kota Jakarta Selatan
                </Typography>
              </Box>

              {/* Box Kurir */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginX: "20px",
                }}
              >
                <Typography sx={{ fontSize: "14px", fontWeight: "bolder" }}>
                  Kurir
                </Typography>
                <Typography sx={{ fontSize: "14px" }}>Grab-Sameday</Typography>
              </Box>
            </Stack>
          </Stack>

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
      </Grid>
    </Grid>
  );
};

export default SemuaPesananPage;
