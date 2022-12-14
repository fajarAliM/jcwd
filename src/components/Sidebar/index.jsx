/* eslint-disable no-console */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import {
  Box,
  Collapse,
  Stack,
  TextField,
  Typography,
  InputAdornment,
  FormControl,
  Button,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useEffect, useState } from "react";
import axiosInstance from "config/api";
import { useRouter } from "next/router";

const Sidebar = ({
  setHargaMinimum,
  setHargaMaksimum,
  setPage,
  setKategoriTerpilih,
}) => {
  const router = useRouter();
  const [kategori, setKategori] = useState(false);
  const openKategori = () => setKategori(true);
  const closeKategori = () => setKategori(false);
  const [harga, setHarga] = useState(false);
  const openHarga = () => setHarga(true);
  const closeHarga = () => setHarga(false);
  const [hargaMin, setHargaMin] = useState(router.query.hargaMinimum);
  const [hargaMaks, setHargaMaks] = useState(router.query.hargaMaksimum);
  const [pilihKategori, setPilihKategori] = useState(null);
  const [category, setCategory] = useState(router.query.setKategoriTerpilih);

  const fetchCategory = async () => {
    try {
      const categoryList = await axiosInstance.get("/admin/product-category");

      setCategory(categoryList.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  const kategoriHandler = (value) => {
    setPilihKategori(value);
    setKategoriTerpilih(value);
    setPage(1);
  };

  const setHandler = () => {
    setHargaMinimum(hargaMin);
    setHargaMaksimum(hargaMaks);
    setPage(1);
  };

  const renderCategory = () => {
    return category?.map((val) => {
      return (
        <Typography
          onClick={() => kategoriHandler(val.id)}
          sx={{
            fontSize: "14px",
            color: val.id == pilihKategori ? "Brand.500" : "black",
            mb: "12px",
            "&:hover": {
              cursor: "pointer",
              color: "Brand.500",
              fontWeight: 700,
            },
          }}
        >
          {val.kategori}
        </Typography>
      );
    });
  };

  useEffect(() => {
    fetchCategory();
  }, []);
  return (
    <Box
      display="flex"
      flexDirection={{ xs: "row", md: "column" }}
      alignItems="center"
      justifyContent="center"
      mb={{ xs: 4, md: 0 }}
    >
      <Stack
        sx={{
          width: { xs: "30%", md: "300px" },
          paddingX: "28px",
          paddingY: "29px",
          border: "1px solid white",
          borderRadius: 3,
          boxShadow: "0 0 15px -10px black",
          mb: { xs: 0, md: "32px" },
          display: "flex",
          height: "auto",
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
            sx={{
              fontWeight: { xs: 400, md: 700 },
              fontSize: "16px",
              color: "Brand.500",
            }}
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
                fontWeight: { xs: 400, md: 700 },
                fontSize: "25px",
                color: "#213360",
                "&:hover": { cursor: "pointer" },
              }}
            />
          )}
        </Box>
        <Collapse in={kategori}>
          <Stack sx={{ mt: "16px" }}>{renderCategory()}</Stack>
        </Collapse>
      </Stack>
      <Stack
        sx={{
          width: { xs: "30%", md: "300px" },
          paddingX: "28px",
          paddingY: "29px",
          border: "1px solid white",
          borderRadius: 3,
          boxShadow: "0 0 15px -10px black",
          height: "auto",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            sx={{
              fontWeight: { xs: 400, md: 700 },
              fontSize: "16px",
              color: "Brand.500",
            }}
          >
            HARGA
          </Typography>
          {!harga ? (
            <KeyboardArrowDownIcon
              onClick={openHarga}
              sx={{
                fontWeight: { xs: 400, md: 700 },
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
              defaultValue={router.query.hargaMinimum}
              onChange={(e) => setHargaMin(e.target.value)}
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
              defaultValue={router.query.hargaMaksimum}
              onChange={(e) => setHargaMaks(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Rp</InputAdornment>
                ),
              }}
              label="Harga Maksimum"
            />
          </FormControl>
          <Button
            fullWidth
            onClick={setHandler}
            variant="contained"
            sx={{ "&:hover": { border: 0 }, mt: 2 }}
          >
            SET
          </Button>
        </Collapse>
      </Stack>
    </Box>
  );
};
export default Sidebar;
