/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { Box, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Timer from "components/Timer";

const Image = styled("img")({
  width: "100px",
  height: "100%",
});

const CheckOutCard = ({
  produk_image,
  produk_name,
  produk_price,
  produk_qty,
  isResep,
  product_diskon,
  produk_satuan,
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
            {isResep ? (
              <Timer />
            ) : (
              <>
                <Typography
                  sx={{
                    textDecoration: "line-through",
                    color: "#B4B9C7",
                    fontSize: "14px",
                    mr: 2,
                  }}
                >
                  {product_diskon !== "0"
                    ? `Rp ${(produk_price * produk_qty).toLocaleString()}`
                    : ""}
                </Typography>
                <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                  Rp{" "}
                  {(
                    produk_price * produk_qty -
                    (parseInt(product_diskon) / 100) *
                      (produk_price * produk_qty)
                  ).toLocaleString()}
                </Typography>
              </>
            )}
          </Stack>
        </Box>
        {produk_qty ? (
          <Typography sx={{ fontSize: "12px", color: "#213360" }}>
            {produk_qty} {produk_satuan}
          </Typography>
        ) : null}
      </Stack>
    </Box>
  );
};

export default CheckOutCard;
