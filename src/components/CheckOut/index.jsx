import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import KudaMesir from "../../public/Images/KudaMesir.png";

const CheckOutCard = () => {
  return (
    <Box sx={{ display: "flex", mb: "8px" }}>
      <Image src={KudaMesir} width="100px" height="100%" />
      <Stack width="100%" pl={4}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography sx={{ fontSize: "16px" }}>
            Obat Kuat Kuda Mesir
          </Typography>
          <Stack direction="row" alignItems="center" alignSelf="start">
            <Typography
              sx={{
                textDecoration: "line-through",
                color: "#B4B9C7",
                fontSize: "14px",
                mr: 2,
              }}
            >
              Rp 30.000
            </Typography>
            <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
              Rp 25.000
            </Typography>
          </Stack>
        </Box>
        <Typography sx={{ fontSize: "12px", color: "#213360" }}>
          1 Strip
        </Typography>
      </Stack>
    </Box>
  );
};

export default CheckOutCard;
