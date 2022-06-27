import {
  Box,
  Collapse,
  Stack,
  TextField,
  Typography,
  InputAdornment,
  FormControl,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState } from "react";

const Sidebar = () => {
  const [kategori, setKategori] = useState(false);
  const openKategori = () => setKategori(true);
  const closeKategori = () => setKategori(false);

  const [harga, setHarga] = useState(false);
  const openHarga = () => setHarga(true);
  const closeHarga = () => setHarga(false);
  return (
    <Box display="flex" flexDirection={{ xs: "row", md: "column" }}>
      <Stack
        sx={{
          maxWidth: "300px",
          paddingX: "28px",
          paddingY: "29px",
          border: "1px solid white",
          borderRadius: 3,
          boxShadow: "0 0 15px -10px black",
          mb: "32px",
          display: "flex",
          minHeight: "75px",
        }}
        flexDirection={{ xs: "row", md: "column" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{ fontWeight: 700, fontSize: "16px", color: "Brand.500" }}
          >
            KATEGORI
          </Typography>
          {!kategori ? (
            <KeyboardArrowDownIcon
              onClick={openKategori}
              sx={{
                fontWeight: 700,
                fontSize: "25px",
                color: "#213360",
                "&:hover": { cursor: "pointer" },
              }}
            />
          ) : (
            <KeyboardArrowUpIcon
              onClick={closeKategori}
              sx={{
                fontWeight: 700,
                fontSize: "25px",
                color: "#213360",
                "&:hover": { cursor: "pointer" },
              }}
            />
          )}
        </Box>
        <Collapse in={kategori}>
          <Stack sx={{ mt: "16px" }}>
            <Typography
              sx={{
                fontSize: "14px",
                mb: "12px",
                "&:hover": {
                  cursor: "pointer",
                  color: "Brand.500",
                  fontWeight: 700,
                },
              }}
            >
              Obat-Obatan
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                mb: "12px",
                "&:hover": {
                  cursor: "pointer",
                  color: "Brand.500",
                  fontWeight: 700,
                },
              }}
            >
              Nutrisi
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                mb: "12px",
                "&:hover": {
                  cursor: "pointer",
                  color: "Brand.500",
                  fontWeight: 700,
                },
              }}
            >
              Herbal
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                mb: "12px",
                "&:hover": {
                  cursor: "pointer",
                  color: "Brand.500",
                  fontWeight: 700,
                },
              }}
            >
              Vitamin & Suplemen
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                mb: "12px",
                "&:hover": {
                  cursor: "pointer",
                  color: "Brand.500",
                  fontWeight: 700,
                },
              }}
            >
              Alat Kesehatan
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                mb: "12px",
                "&:hover": {
                  cursor: "pointer",
                  color: "Brand.500",
                  fontWeight: 700,
                },
              }}
            >
              Perawatan Tubuh
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                mb: "12px",
                "&:hover": {
                  cursor: "pointer",
                  color: "Brand.500",
                  fontWeight: 700,
                },
              }}
            >
              Ibu & Anak
            </Typography>
          </Stack>
        </Collapse>
      </Stack>
      <Stack
        sx={{
          maxWidth: "300px",
          paddingX: "28px",
          paddingY: "29px",
          border: "1px solid white",
          borderRadius: 3,
          boxShadow: "0 0 15px -10px black",
          minHeight: "75px",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            sx={{ fontWeight: 700, fontSize: "16px", color: "Brand.500" }}
          >
            HARGA
          </Typography>
          {!harga ? (
            <KeyboardArrowDownIcon
              onClick={openHarga}
              sx={{
                fontWeight: 700,
                fontSize: "25px",
                color: "#213360",
                "&:hover": { cursor: "pointer" },
              }}
            />
          ) : (
            <KeyboardArrowUpIcon
              onClick={closeHarga}
              sx={{
                fontWeight: 700,
                fontSize: "25px",
                color: "#213360",
                "&:hover": { cursor: "pointer" },
              }}
            />
          )}
        </Box>
        <Collapse in={harga}>
          <FormControl variant="outlined" sx={{ mt: "16px" }}>
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Rp</InputAdornment>
                ),
              }}
              label="Harga Minimum"
            />
          </FormControl>
          <FormControl variant="outlined" sx={{ mt: "16px" }}>
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Rp</InputAdornment>
                ),
              }}
              label="Harga Maksimum"
            />
          </FormControl>
        </Collapse>
      </Stack>
    </Box>
  );
};

export default Sidebar;
