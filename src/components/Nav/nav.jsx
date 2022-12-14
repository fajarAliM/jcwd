import {
  Avatar,
  Badge,
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Menu,
  MenuItem,
  OutlinedInput,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { BsSearch } from "react-icons/bs";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSnackbar } from "notistack";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { logout } from "redux/reducer/auth";
import jsCookie from "js-cookie";
import Router, { useRouter } from "next/router";
import { search } from "../../redux/reducer/search";
import healthymed from "../../public/Images/healthymed.png";

const Nav = () => {
  const { enqueueSnackbar } = useSnackbar();

  const userSelector = useSelector((state) => state.auth);
  const cartSelector = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutBtnHandler = () => {
    dispatch(logout());

    jsCookie.remove("user_auth_token");
    Router.push("/login");
  };

  const inputHandler = (event) => {
    setSearchInput(event.target.value);
  };

  useEffect(() => {
    if (router.isReady) {
      if (router.query.searchProduk) {
        dispatch(search(router.query.searchProduk));
      }
    }
  }, []);

  const searchProdukHandler = () => {
    dispatch(search(searchInput));
    if (router.pathname === "product-list") {
      router.push({
        query: {
          searchProduk: searchInput,
        },
      });
    } else {
      router.push(`product-list?searchProduk=${searchInput}`);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
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
      <Box
        mr="20px"
        display={{ xs: "none", md: "block" }}
        sx={{ ":hover": { cursor: "pointer" } }}
      >
        <Link href="/">
          <Image src={healthymed} height="60px" width="210px" />
        </Link>
      </Box>
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
          onChange={inputHandler}
          id="outlined-search"
          sx={{ borderRadius: 2 }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                edge="end"
                sx={{ mr: 1 }}
                onClick={() => {
                  searchProdukHandler();
                }}
              >
                <BsSearch />
              </IconButton>
            </InputAdornment>
          }
          label="Cari Obat, Suplemen, Vitamin, produk Kesehatan yuk"
        />
      </FormControl>
      {userSelector.id ? (
        <>
          <IconButton
            onClick={
              !cartSelector.items.length
                ? () => {
                    enqueueSnackbar("Isi keranjang terlebih dahulu!", {
                      variant: "info",
                    });
                  }
                : () => router.push("/keranjang")
            }
            sx={{ ml: "50px" }}
          >
            <Badge
              badgeContent={cartSelector.items.length}
              color="error"
              invisible={cartSelector.items.length === 0}
            >
              <ShoppingCartIcon sx={{ color: "Brand.500", fontSize: "28px" }} />
            </Badge>
          </IconButton>
          <IconButton sx={{ ml: "50px" }}>
            <NotificationsIcon sx={{ color: "Brand.500", fontSize: "28px" }} />
          </IconButton>
          <Box sx={{ display: "flex", alignItems: "center", ml: "52px" }}>
            <Avatar
              onClick={handleClick}
              src={userSelector?.photo_profile}
              sx={{
                ":hover": { cursor: userSelector.id ? "pointer" : "default" },
                border: "1px solid #F5F6F9",
              }}
            />
            {userSelector.id ? (
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClick={handleClose}
                onClose={handleClose}
              >
                <MenuItem>
                  <Link href="/profile-page">Profil Saya</Link>
                </MenuItem>
                <MenuItem>
                  <Link href="/proses-pemesanan">Transaksi</Link>
                </MenuItem>
                <MenuItem onClick={logoutBtnHandler}>Keluar</MenuItem>
              </Menu>
            ) : null}
            <Typography sx={{ ml: "14px" }}>
              {userSelector?.nama?.length > 5
                ? `${userSelector?.nama?.slice(0, 4)}...`
                : userSelector?.nama}
            </Typography>
          </Box>
        </>
      ) : (
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="outlined"
            sx={{ height: "50px", width: "118px", mr: 3 }}
            onClick={() => {
              router.push("/login");
            }}
          >
            Login
          </Button>
          <Button
            variant="contained"
            sx={{ height: "50px", width: "118px" }}
            onClick={() => {
              router.push("/register");
            }}
          >
            Daftar
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Nav;
