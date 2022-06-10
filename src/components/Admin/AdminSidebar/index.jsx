import { Box, Drawer, Typography } from "@mui/material";
import Image from "next/image";
import Healthymed from "public/Images/Healthymed.png";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { MdHomeFilled } from "react-icons/md";
import { GiMedicines } from "react-icons/gi";
import { BsGraphUp } from "react-icons/bs";
import { useRouter } from "next/router";
import Link from "next/link";
import MainMenu from "./MainMenu";

const AdminSidebar = () => {
  const router = useRouter();

  return (
    <Drawer
      sx={{
        maxWidth: "256px",
        boxSizing: "border-box",
      }}
      variant="permanent"
      anchor="left"
    >
      <Box sx={{ paddingX: "20px", paddingY: "30px" }}>
        <Box
          paddingX="56px"
          alignContent="center"
          height="64px"
          marginBottom="30px"
        >
          <Image src={Healthymed} />
        </Box>

        {/* Dashboard */}
        <Box marginBottom={2}>
          <Box
            sx={{
              ":hover": {
                cursor: "pointer",
                color: "Brand.500",
              },
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: "14px",
              paddingX: "20px",
              paddingY: 1,
              color: router.pathname === "/" ? "Brand.500" : "Sidebar.500",
            }}
          >
            <Link href="/">
              <Box display="flex" flexDirection="row">
                <MdHomeFilled fontSize="27px" />
                <Typography fontWeight="bold" marginLeft="12px">
                  Dashboard
                </Typography>
              </Box>
            </Link>
          </Box>
        </Box>

        <MainMenu
          title="Produk"
          iconTag={<GiMedicines fontSize="27px" />}
          subMenus={[
            { submenuTitle: "Daftar Produk", href: "/product" },
            { submenuTitle: "Tambah Produk", href: "#" },
          ]}
        />
        <MainMenu
          title="Transaksi"
          iconTag={<ReceiptIcon />}
          subMenus={[
            { submenuTitle: "Semua Pesanan", href: "#" },
            { submenuTitle: "Pesanan Baru", href: "#" },
            { submenuTitle: "Siap Dikirim", href: "#" },
            { submenuTitle: "Dalam Pengiriman", href: "#" },
            { submenuTitle: "Selesai", href: "#" },
            { submenuTitle: "Dibatalkan", href: "#" },
          ]}
        />
        <MainMenu
          title="Sales & Revenue"
          iconTag={<BsGraphUp fontSize="27px" />}
          subMenus={[
            { submenuTitle: "Ringkasan Statistik", href: "#" },
            { submenuTitle: "Buku Kas", href: "#" },
            { submenuTitle: "Laba & Rugi", href: "#" },
          ]}
        />
      </Box>
    </Drawer>
  );
};

export default AdminSidebar;
