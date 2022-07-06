/* eslint-disable camelcase */
import { Box, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const Image = styled("img")({
  width: "100px",
  height: "100%",
});

const CheckOutCard = ({
  produk_image,
  produk_name,
  produk_price,
  produk_qty,
}) => {
  return (
    <Box sx={{ display: "flex", mb: "8px" }}>
      <Image src={produk_image} width="100px" height="100%" />
      <Stack width="100%" pl={4}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography sx={{ fontSize: "16px" }}>{produk_name}</Typography>
          <Stack direction="row" alignItems="center" alignSelf="start">
            <Typography
              sx={{
                textDecoration: "line-through",
                color: "#B4B9C7",
                fontSize: "14px",
                mr: 2,
              }}
            >
              Rp {produk_price.toLocaleString()}
            </Typography>
            <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
              Rp {produk_price.toLocaleString()}
            </Typography>
          </Stack>
        </Box>
        <Typography sx={{ fontSize: "12px", color: "#213360" }}>
          {produk_qty} Strip
        </Typography>
      </Stack>
    </Box>
  );
};

export default CheckOutCard;
