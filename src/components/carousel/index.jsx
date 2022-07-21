import React from "react";
import Carousel from "react-material-ui-carousel";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { MdOutlineNavigateNext, MdNavigateBefore } from "react-icons/md";
import imageCarousel from "public/Images/imageCarousel.png";

const CarouselCard = () => {
  const items = [
    {
      name: "Selamat Datang di ShopeeMed",
      description: "APOTEK ONLINE TERPERCAYA",
      subDescription: "100% Asli, Produk BPOM, Uang Dijamin Kembali",
      image: imageCarousel,
    },
    {
      name: "Obat 100% ASLI",
      description: "DIJAMIN SEHAT",
      image: imageCarousel,
    },
  ];

  return (
    <Carousel
      sx={{
        width: "100%",
        height: "100%",
        my: 5,
        borderRadius: "16px",
      }}
      NextIcon={<MdOutlineNavigateNext />}
      PrevIcon={<MdNavigateBefore />}
    >
      {items.map((val) => (
        <Item
          name={val.name}
          description={val.description}
          subDescription={val.subDescription}
          image={val.image}
        />
      ))}
    </Carousel>
  );
};

const Item = ({ name, description, image, subDescription }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        backgroundColor: "#92C3D1",
        height: "232px",
      }}
    >
      <Box sx={{ maxWidth: "100%", maxHeight: "100%", p: 5, flex: 1 }}>
        <Typography sx={{ fontSize: "20px", fontWeight: "700" }}>
          {name}
        </Typography>
        <Typography sx={{ fontSize: "30px", fontWeight: "900" }}>
          {description}
        </Typography>
        <Typography sx={{ fontSize: "15px", fontWeight: "700" }}>
          {subDescription}
        </Typography>
      </Box>
      <Box sx={{ height: "100%", marginRight: "-55px" }}>
        <Image style={{ objectFit: "cover" }} src={image} />
      </Box>
    </Box>
  );
};

export default CarouselCard;
