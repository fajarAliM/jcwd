/* eslint-disable no-unused-vars */
import { Box, Button, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import ModalSalinanResep from "../ModalSalinanResep";

const Image = styled("img")({
  width: "73px",
  height: "100%",
});

const ProductCardItems = ({
  image,
  nama,
  jumlah,
  harga,
  isObatResep,
  productAdded,
  buyersName,
  orderCode,
  transaksiId,
  orderTime,
}) => {
  const [salinanResep, setSalinanResep] = useState(false);

  return (
    <>
      <Grid item xs={5}>
        <Image src={image} />
      </Grid>
      <Grid item xs={4}>
        <Typography sx={{ fontSize: "14px", fontWeight: "bolder" }}>
          {nama}
        </Typography>
        {isObatResep && productAdded === false ? (
          <>
            <Button
              variant="contained"
              onClick={() => setSalinanResep(true)}
              sx={{
                maxHeight: "32px",
                fontSize: "12px",
                "&:hover": { border: 0 },
                width: "100%",
              }}
            >
              Salin Resep
            </Button>
            <ModalSalinanResep
              open={salinanResep}
              handleClose={() => setSalinanResep(false)}
              namaPembeli={buyersName}
              kodeOrder={orderCode}
              fotoResep={image}
              transaksiId={transaksiId}
              waktuOrder={orderTime}
            />
          </>
        ) : null}
        {!isObatResep ? (
          <Typography sx={{ fontSize: "14px", color: "gray" }}>
            {jumlah} x Rp {harga?.toLocaleString("id")}
          </Typography>
        ) : null}
      </Grid>
    </>
  );
};

export default ProductCardItems;
