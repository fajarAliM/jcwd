import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { BsSearch } from "react-icons/bs";

const Nav = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        borderBottom: 1,
        borderColor: "white",
        boxShadow: "0 0 15px -3px #FF6600",
        paddingX: 5,
        paddingY: 3,
      }}
    >
      <Box
        component="img"
        sx={{
          height: "100%",
          width: 300,
          mr: 4,
        }}
        src="https://www.freepnglogos.com/uploads/shopee-logo/logo-shopee-png-images-download-shopee-1.png"
      />
      <FormControl
        sx={{
          m: 1,
          width: 800,
        }}
        variant="outlined"
      >
        <InputLabel htmlFor="outlined-search" sx={{ ml: 2 }}>
          Cari Obat, Suplemen, Vitamin, produk Kesehatan
        </InputLabel>
        <OutlinedInput
          id="outlined-search"
          sx={{ borderRadius: 2 }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton edge="end" sx={{ mr: 1 }}>
                <BsSearch />
              </IconButton>
            </InputAdornment>
          }
          label="Cari Obat, Suplemen, Vitamin, produk Kesehatan yuk"
        />
      </FormControl>
      <Button
        variant="outlined"
        sx={{
          mr: 3,
          ml: 3,
          width: 150,
          height: 50,
        }}
      >
        Masuk
      </Button>
      <Button
        variant="contained"
        sx={{
          width: 150,
          height: 50,
          boxShadow: 0,
          "&:hover": {
            boxShadow: 0,
          },
        }}
      >
        Daftar
      </Button>
    </Box>
  );
};

export default Nav;
