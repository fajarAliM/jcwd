import {
  Avatar,
  Box,
  // Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { BsSearch } from "react-icons/bs";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Link from "next/link";
import shopee from "../../public/Images/shopee.png";

const Nav = () => {
  const userName = "Elon Musk";

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
        paddingY: 1,
        position: "sticky",
        top: 0,
        zIndex: 999,
        background: "rgb(255, 255, 255, 0.9)",
      }}
    >
      <Image src={shopee} height="80px" width="210px" />
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

      {/* USER NOT LOGGED IN */}

      {/* <Button
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
      </Button> */}

      {/* USER LOGGED IN */}
      <Link href="/keranjang">
        <IconButton sx={{ ml: "50px" }}>
          <ShoppingCartIcon sx={{ color: "Brand.500" }} />
        </IconButton>
      </Link>
      <IconButton sx={{ ml: "50px" }}>
        <NotificationsIcon sx={{ color: "Brand.500" }} />
      </IconButton>
      <Box sx={{ display: "flex", alignItems: "center", ml: "52px" }}>
        <Avatar src="https://upload.wikimedia.org/wikipedia/commons/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg" />
        <Typography sx={{ ml: "14px" }}>
          {userName.length > 5 ? `${userName.slice(0, 4)}...` : userName}
        </Typography>
      </Box>
    </Box>
  );
};

export default Nav;
