/* eslint-disable no-unused-vars */
import { Box, Drawer, MenuItem, Typography } from "@mui/material";
import Image from "next/image";
import Healthymed from "public/Images/Healthymed.png";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState } from "react";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { MdHomeFilled } from "react-icons/md";
import { GiMedicines } from "react-icons/gi";
import { BsGraphUp } from "react-icons/bs";
/* eslint-disable react/jsx-no-useless-fragment */
const Sidebar = () => {
  const [menu, setMenu] = useState("dashboard");
  const [subMenu, setSubMenu] = useState("");
  const handleChange = (event, newMenu, newSubMenu) => {
    setMenu(newMenu);
    setSubMenu(newSubMenu);
  };

  return (
    <Drawer
      sx={{
        width: "256px",
        boxSizing: "border-box",
      }}
      variant="permanent"
      anchor="left"
    >
      <Box sx={{ paddingX: "20px", paddingY: "30px" }}>
        <Box paddingX="56px" alignContent="center" height="64px">
          <Image src={Healthymed} />
        </Box>

        {/* Dashboard */}
        <Box
          color={menu === "dashboard" ? "Brand.500" : "#B4B9C7"}
          sx={{
            paddingX: "20px",
            paddingY: "30px",
            ":hover": {
              cursor: "pointer",
              border: "2px solid",
              borderColor: "Brand.500",
              borderRadius: "10px",
              color: "Brand.500",
            },
          }}
          height="80px"
          display="flex"
          flexDirection="column"
        >
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            onClick={(e) => handleChange(e, "dashboard", "")}
          >
            <Box display="flex" flexDirection="row">
              <MdHomeFilled fontSize="27px" />
              <Typography marginLeft="12px">Dashboard</Typography>
            </Box>
          </Box>
        </Box>

        {/* Produk */}
        <Box
          sx={{
            paddingX: "20px",
            paddingY: "30px",
            ":hover": {
              cursor: "pointer",
              border: "2px solid",
              borderColor: "Brand.500",
              borderRadius: "10px",
              color: "Brand.500",
            },
          }}
          height="80px"
          display="flex"
          flexDirection="column"
        >
          <Box
            color={menu === "produk" ? "Brand.500" : "#B4B9C7"}
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            onClick={(e) => handleChange(e, "produk", "daftar produk")}
          >
            <Box display="flex" flexDirection="row">
              <GiMedicines fontSize="27px" />
              <Typography marginLeft="12px">Produk</Typography>
            </Box>
            {menu === "produk" ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </Box>
        </Box>
        {/* Produk Sub-Menu */}
        {menu === "produk" && (
          <Box marginLeft="40px">
            <MenuItem
              onClick={() => setSubMenu("daftar produk")}
              sx={{
                color: subMenu === "daftar produk" ? "Brand.500" : "#B4B9C7",
                ":hover": {
                  cursor: "pointer",
                  border: "2px solid",
                  borderColor: "Brand.500",
                  borderRadius: "10px",
                  paddingY: "10px",
                  color: "Brand.500",
                },
              }}
            >
              Daftar Produk
            </MenuItem>
            <MenuItem
              onClick={() => setSubMenu("tambahproduk")}
              color={subMenu === "tambahproduk" ? "Brand.500" : "#B4B9C7"}
              sx={{
                color: subMenu === "tambahproduk" ? "Brand.500" : "#B4B9C7",
                ":hover": {
                  cursor: "pointer",
                  border: "2px solid",
                  borderColor: "Brand.500",
                  borderRadius: "10px",
                  paddingY: "10px",
                  color: "Brand.500",
                },
              }}
            >
              Tambah Produk
            </MenuItem>
          </Box>
        )}

        {/* Transaksi */}
        <Box
          color={menu === "transaksi" ? "Brand.500" : "#B4B9C7"}
          sx={{
            paddingX: "20px",
            paddingY: "30px",
            ":hover": {
              cursor: "pointer",
              border: "2px solid",
              borderColor: "Brand.500",
              borderRadius: "10px",
              color: "Brand.500",
            },
          }}
          height="80px"
          display="flex"
          flexDirection="column"
        >
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            onClick={(e) => handleChange(e, "transaksi", "semua pesanan")}
          >
            <Box display="flex" flexDirection="row">
              <ReceiptIcon />
              <Typography marginLeft="12px">Transaksi</Typography>
            </Box>
            {menu === "transaksi" ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </Box>
        </Box>
        {/* Transaksi Sub-Menu */}
        {menu === "transaksi" && (
          <Box marginLeft="40px">
            <MenuItem
              onClick={() => setSubMenu("semua pesanan")}
              sx={{
                color: subMenu === "semua pesanan" ? "Brand.500" : "#B4B9C7",
                ":hover": {
                  cursor: "pointer",
                  border: "2px solid",
                  borderColor: "Brand.500",
                  borderRadius: "10px",
                  paddingY: "10px",
                  color: "Brand.500",
                },
              }}
            >
              Semua Pesanan
            </MenuItem>
            <MenuItem
              onClick={() => setSubMenu("pesanan baru")}
              sx={{
                color: subMenu === "pesanan baru" ? "Brand.500" : "#B4B9C7",
                ":hover": {
                  cursor: "pointer",
                  border: "2px solid",
                  borderColor: "Brand.500",
                  borderRadius: "10px",
                  paddingY: "10px",
                  color: "Brand.500",
                },
              }}
            >
              Pesanan Baru
            </MenuItem>
            <MenuItem
              onClick={() => setSubMenu("siap dikirim")}
              sx={{
                color: subMenu === "siap dikirim" ? "Brand.500" : "#B4B9C7",
                ":hover": {
                  cursor: "pointer",
                  border: "2px solid",
                  borderColor: "Brand.500",
                  borderRadius: "10px",
                  paddingY: "10px",
                  color: "Brand.500",
                },
              }}
            >
              Siap Dikirim
            </MenuItem>
            <MenuItem
              onClick={() => setSubMenu("dalam pengiriman")}
              sx={{
                color: subMenu === "dalam pengiriman" ? "Brand.500" : "#B4B9C7",
                ":hover": {
                  cursor: "pointer",
                  border: "2px solid",
                  borderColor: "Brand.500",
                  borderRadius: "10px",
                  paddingY: "10px",
                  color: "Brand.500",
                },
              }}
            >
              Dalam Pengiriman
            </MenuItem>
            <MenuItem
              onClick={() => setSubMenu("selesai")}
              sx={{
                color: subMenu === "selesai" ? "Brand.500" : "#B4B9C7",
                ":hover": {
                  cursor: "pointer",
                  border: "2px solid",
                  borderColor: "Brand.500",
                  borderRadius: "10px",
                  paddingY: "10px",
                  color: "Brand.500",
                },
              }}
            >
              Selesai
            </MenuItem>
            <MenuItem
              onClick={() => setSubMenu("dibatalkan")}
              sx={{
                color: subMenu === "dibatalkan" ? "Brand.500" : "#B4B9C7",
                ":hover": {
                  cursor: "pointer",
                  border: "2px solid",
                  borderColor: "Brand.500",
                  borderRadius: "10px",
                  paddingY: "10px",
                  color: "Brand.500",
                },
              }}
            >
              Dibatalkan
            </MenuItem>
          </Box>
        )}

        {/* Sales dan Revenue */}
        <Box
          color={menu === "sales" ? "Brand.500" : "#B4B9C7"}
          sx={{
            paddingX: "20px",
            paddingY: "30px",
            ":hover": {
              cursor: "pointer",
              border: "2px solid",
              borderColor: "Brand.500",
              borderRadius: "10px",
              color: "Brand.500",
            },
          }}
          height="80px"
          display="flex"
          flexDirection="column"
          onClick={(e) => handleChange(e, "sales", "ringkasan statistik")}
        >
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            onClick={
              menu === "sales" ? () => setMenu("") : () => setMenu("sales")
            }
          >
            <Box display="flex" flexDirection="row">
              <BsGraphUp fontSize="27px" />
              <Typography marginLeft="12px">Sales & Revenue</Typography>
            </Box>
            {menu === "sales" ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </Box>
        </Box>
        {/* Transaksi Sub-Menu */}
        {menu === "sales" && (
          <Box marginLeft="40px">
            <MenuItem
              onClick={() => setSubMenu("ringkasan statistik")}
              sx={{
                color:
                  subMenu === "ringkasan statistik" ? "Brand.500" : "#B4B9C7",
                ":hover": {
                  cursor: "pointer",
                  border: "2px solid",
                  borderColor: "Brand.500",
                  borderRadius: "10px",
                  paddingY: "10px",
                  color: "Brand.500",
                },
              }}
            >
              Ringkasan Statistik
            </MenuItem>
            <MenuItem
              onClick={() => setSubMenu("buku kas")}
              sx={{
                color: subMenu === "buku kas" ? "Brand.500" : "#B4B9C7",
                ":hover": {
                  cursor: "pointer",
                  border: "2px solid",
                  borderColor: "Brand.500",
                  borderRadius: "10px",
                  paddingY: "10px",
                  color: "Brand.500",
                },
              }}
            >
              Buku Kas
            </MenuItem>
            <MenuItem
              onClick={() => setSubMenu("laba dan rugi")}
              sx={{
                color: subMenu === "laba dan rugi" ? "Brand.500" : "#B4B9C7",
                ":hover": {
                  cursor: "pointer",
                  border: "2px solid",
                  borderColor: "Brand.500",
                  borderRadius: "10px",
                  paddingY: "10px",
                  color: "Brand.500",
                },
              }}
            >
              Laba dan Rugi
            </MenuItem>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default Sidebar;
