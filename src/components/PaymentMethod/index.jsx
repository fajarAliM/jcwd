import { Box, Typography } from "@mui/material";
import Image from "next/image";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const PaymentMethod = ({ image, method, openBca }) => {
  return (
    <Box
      sx={{
        display: "flex",
        borderBottom: "1px solid #F5F6F9",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: "26px",
        paddingBottom: "19px",
        "&:hover": { cursor: "pointer" },
      }}
      onClick={openBca}
    >
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Image src={image} height="25px" width="85px" />
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 400,
            color: "#4F618E",
            mt: "8px",
            mb: "7px",
            ml: "34px",
          }}
        >
          {method}
        </Typography>
      </Box>
      <ArrowForwardIosIcon
        onClick={openBca}
        sx={{
          fontSize: "18px",
        }}
      />
    </Box>
  );
};

export default PaymentMethod;
