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
        boxShadow: "0 0 15px 1px #009B90",
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
        src="https://upload.wikimedia.org/wikipedia/en/thumb/4/40/McLean_Hospital_logo.svg/2560px-McLean_Hospital_logo.svg.png"
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
                {<BsSearch />}
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
          color: "#009B90",
          borderColor: "#009B90",
          width: 150,
          height: 50,
          borderRadius: 3,
          textTransform: "none",
          "&:hover": {
            borderColor: "white",
            color: "white",
            backgroundColor: "#009B90",
          },
        }}
      >
        Masuk
      </Button>
      <Button
        sx={{
          color: "white",
          backgroundColor: "#009B90",
          width: 150,
          height: 50,
          borderRadius: 3,
          textTransform: "none",
          "&:hover": {
            border: 1,
            borderColor: "#009B90",
            color: "#009B90",
          },
        }}
      >
        Daftar
      </Button>
    </Box>
  );
};

export default Nav;
