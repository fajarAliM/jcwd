/* eslint-disable react/jsx-no-useless-fragment */
import { Box, Typography } from "@mui/material";
import {
  BsFillArrowUpRightCircleFill,
  BsFillArrowDownRightCircleFill,
} from "react-icons/bs";

const DashboardPage = () => {
  return (
    <>
      <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
        Analisis Produk & Toko
      </Typography>
      <Typography sx={{ color: "Sidebar.500", fontSize: "14px" }}>
        Update terakhir:{" "}
        <Typography
          component="span"
          sx={{ fontSize: "14px", fontWeight: "bold" }}
        >
          20 Januari 202, 14.30 WIB
        </Typography>
      </Typography>
      <Box
        sx={{
          spacing: "15px",
          display: "flex",
          flexDirection: "row",
          marginTop: "16px",
        }}
      >
        <Box
          sx={{
            maxWidth: "353px",
            maxHeight: "122px",
            borderRadius: "5px",
            backgroundColor: "white",
            marginRight: "15px",
            boxShadow: 1,
            padding: "10px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: "12px",
                color: "Sidebar.500",
                marginBottom: "12px",
              }}
            >
              Profit Hari Ini
            </Typography>
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "12px",
              }}
            >
              Rp 10.000.000
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                color: "blue",
                alignItems: "center",
              }}
            >
              <BsFillArrowUpRightCircleFill fontSize="10px" />
              <BsFillArrowDownRightCircleFill fontSize="10px" />
              <Typography sx={{ fontSize: "10px", marginLeft: "4px" }}>
                +5.700.000
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default DashboardPage;
