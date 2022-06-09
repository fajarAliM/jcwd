import { Paper, Box, Typography } from "@mui/material";
import Image from "next/image";

const BannerJaminanBox = ({ imgUrl, imgAlt, title, caption }) => {
  return (
    <Paper
      sx={{
        width: "33%",
        mx: "8px",
        height: "181px",
        backgroundColor: "#F6FAFB",
        display: "flex",
        alignItems: "center",
      }}
      elevation={1}
    >
      <Box
        display="flex"
        height="100%"
        justifyContent="center"
        alignItems="center"
        ml="46px"
      >
        <Image
          src={imgUrl}
          alt={imgAlt}
          width="100px"
          height="92px"
          objectFit="scale-down"
        />
      </Box>
      <Box mx="45px">
        <Typography variant="subtitle1" fontWeight="bold">
          {title}
        </Typography>
        <Typography variant="body2">{caption}</Typography>
      </Box>
    </Paper>
  );
};

export default BannerJaminanBox;
