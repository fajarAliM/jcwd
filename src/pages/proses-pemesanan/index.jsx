import {
  Avatar,
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import PaymentsIcon from "@mui/icons-material/Payments";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EmailIcon from "@mui/icons-material/Email";
import { useState } from "react";
import DaftarPemesanan from "components/DaftarPemesanan";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const ProsesPemesanan = () => {
  const [filter, setFilter] = useState("");
  const handleFilter = (event) => {
    setFilter(event.target.value);
  };
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Grid container sx={{ mt: "56px", ml: "96px" }}>
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
              src="https://upload.wikimedia.org/wikipedia/commons/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg"
            />
            <Typography sx={{ ml: "20px", fontWeight: 700, fontSize: "14px" }}>
              Elon Musk
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
              <Avatar sx={{ height: "30px", width: "30px", mr: "20px" }} />
              <Typography>Profil</Typography>
            </Box>
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
              <Tab label="Semua" value={0} sx={{ textTransform: "none" }} />
              <Tab label="Menunggu" value={1} sx={{ textTransform: "none" }} />
              <Tab label="Diproses" value={2} sx={{ textTransform: "none" }} />
              <Tab label="Dikirim" value={3} sx={{ textTransform: "none" }} />
              <Tab label="Selesai" value={4} sx={{ textTransform: "none" }} />
              <Tab
                label="Dibatalkan"
                value={5}
                sx={{ textTransform: "none" }}
              />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: "46px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{ fontWeight: 700, fontSize: "14px", mr: "10px" }}
                >
                  Jenis Obat
                </Typography>
                <Button
                  variant="outlined"
                  sx={{ mr: "10px", borderRadius: "17px" }}
                >
                  Semua Obat
                </Button>
                <Button
                  variant="outlined"
                  sx={{ mr: "10px", borderRadius: "17px" }}
                >
                  Obat Resep
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    "&:hover": { border: 0 },
                    mr: "10px",
                    borderRadius: "17px",
                  }}
                >
                  Obat Bebas
                </Button>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{ color: "#737A8D", fontSize: "14px", fontWeight: 400 }}
                >
                  Urutkan
                </Typography>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <Select value={filter} onChange={handleFilter}>
                    <MenuItem value="Terbaru">Terbaru</MenuItem>
                    <MenuItem value="Termahal">Termahal</MenuItem>
                    <MenuItem value="Termurah">Termurah</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <DaftarPemesanan status="Dikirim" />
            <DaftarPemesanan status="Sedang Dikirim" />
            <DaftarPemesanan status="Diproses" />
          </TabPanel>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default ProsesPemesanan;
