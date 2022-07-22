import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MedicationIcon from "@mui/icons-material/Medication";
import ReceiptIcon from "@mui/icons-material/Receipt";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { useState } from "react";
import { useRouter } from "next/router";

const NavbarBottom = () => {
  const [page, setPage] = useState("beranda");
  const router = useRouter();

  const changePageHandler = (event, value) => {
    setPage(value);
    if (value === "beranda") {
      router.push("/");
    }
    if (value === "kategori") {
      router.push("/product-list");
    }
    if (value === "transaksi") {
      router.push("/proses-pemesanan");
    }
    if (value === "profile") {
      router.push("/profile-page");
    }
  };
  return (
    <Box
      width="100vw"
      display={{ xs: "block", md: "none" }}
      position="fixed"
      bottom={0}
      zIndex={10}
    >
      <BottomNavigation showLabels value={page} onChange={changePageHandler}>
        <BottomNavigationAction
          label="Beranda"
          value="beranda"
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          label="Kategori"
          value="kategori"
          icon={<MedicationIcon />}
        />
        <BottomNavigationAction
          label="Transaksi"
          value="transaksi"
          icon={<ReceiptIcon />}
        />
        <BottomNavigationAction
          label="Bantuan"
          value="bantuan"
          icon={<HeadsetMicIcon />}
        />
        <BottomNavigationAction
          label="Profile"
          value="profile"
          icon={<AccountCircleRoundedIcon />}
        />
      </BottomNavigation>
    </Box>
  );
};

export default NavbarBottom;
