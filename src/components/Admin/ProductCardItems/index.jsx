/* eslint-disable no-unused-vars */
import { Box, Button, Typography } from "@mui/material";
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
      <Box
        sx={{
          height: "75px",
          width: "75px",
          borderRadius: "1px",
          border: "1px solid #B4B9C7",
          display: "flex",
          justifyContent: "space-between",
          mr: 2,
        }}
      >
        <Box>
          <Image src={image} />
        </Box>
        <Box sx={{ ml: 2 }}>
          <Typography sx={{ fontSize: "14px", fontWeight: "bolder" }}>
            {nama}
          </Typography>
          {isObatResep && !productAdded ? (
            <>
              <Button
                variant="contained"
                onClick={() => setSalinanResep(true)}
                sx={{
                  maxHeight: "32px",
                  fontSize: "12px",
                  "&:hover": { border: 0 },
                  mt: 2,
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
        </Box>
        {!isObatResep ? (
          <Box sx={{ ml: 2 }}>
            <Typography sx={{ fontSize: "14px", color: "gray" }}>
              {jumlah} x Rp {harga?.toLocaleString()}
            </Typography>
          </Box>
        ) : null}
      </Box>

      {/* Box Product Title, Qty, etc */}
      {/* <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          // marginX: "50px",
          width: "100%",
        }}
      > */}

      {/* </Box> */}
    </>
  );
};

export default ProductCardItems;
