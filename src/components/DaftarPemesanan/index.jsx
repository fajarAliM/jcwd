import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import CheckOutCard from "components/CheckOut";
import { useState } from "react";
import { BsFillChatDotsFill } from "react-icons/bs";

const DaftarPemesanan = () => {
  const [filter, setFilter] = useState("");
  const handleChange = (event) => {
    setFilter(event.target.value);
  };
  return (
    <Stack>
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
          <Typography sx={{ fontWeight: 700, fontSize: "14px", mr: "10px" }}>
            Jenis Obat
          </Typography>
          <Button variant="outlined" sx={{ mr: "10px", borderRadius: "17px" }}>
            Semua Obat
          </Button>
          <Button variant="outlined" sx={{ mr: "10px", borderRadius: "17px" }}>
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
            <Select value={filter} onChange={handleChange}>
              <MenuItem value="Terbaru">Terbaru</MenuItem>
              <MenuItem value="Termahal">Termahal</MenuItem>
              <MenuItem value="Termurah">Termurah</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Stack
        sx={{
          border: "1px solid white",
          borderRadius: 3,
          boxShadow: "0 0 15px -10px black",
          mt: "44px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            paddingY: "34px",
            paddingX: "40px",
            borderBottom: "2px solid #F5F6F9",
          }}
        >
          <Typography>Jumat, 5 April 2022, 15:45</Typography>
          <Box
            sx={{
              border: "1px solid #FFDE6B",
              color: "#CBAF4E",
              width: "156px",
              height: "26px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "3px",
            }}
          >
            <Typography sx={{ fontSize: "12px", fontWeight: 400 }}>
              Menunggu Pembayaran
            </Typography>
            {/* <Typography>Menunggu Konfirmasi</Typography>
          <Typography>Sedang Pengiriman</Typography>
          <Typography>Pesanan Diterima</Typography> */}
          </Box>
        </Box>
        <Box
          sx={{
            paddingX: "40px",
            paddingY: "12px",
            borderBottom: "1px solid #F5F6F9",
          }}
        >
          <CheckOutCard />
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Box
              sx={{
                display: "flex",
                borderTop: "3px solid #F5F6F9",
              }}
            >
              <Typography sx={{ color: "#213360", mr: 2, mt: 2 }}>
                Sub Total
              </Typography>
              <Typography sx={{ fontWeight: 700, mt: 2 }}>Rp 25.000</Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            paddingX: "42px",
            paddingY: "31px",
          }}
        >
          <Button
            startIcon={<BsFillChatDotsFill />}
            sx={{ color: "Brand.500", fontWeight: 700, fontSize: "12px" }}
          >
            Chat Customer Service
          </Button>
          <Box sx={{ display: "flex" }}>
            <Stack sx={{ textAlign: "end" }}>
              <Typography sx={{ color: "#4F618E", fontSize: "12px" }}>
                Bayar Sebelum
              </Typography>
              <Typography sx={{ color: "#4F618E", fontSize: "12px" }}>
                6 April 2022, 15:45
              </Typography>
            </Stack>
            <Button
              variant="contained"
              sx={{
                ml: "16px",
                "&:hover": { border: 0 },
                width: "157px",
                height: "30px",
              }}
            >
              Bayar Sekarang
            </Button>
          </Box>
        </Box>
      </Stack>
    </Stack>
  );
};

export default DaftarPemesanan;
