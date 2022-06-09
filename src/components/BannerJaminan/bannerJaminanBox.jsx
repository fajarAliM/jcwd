import { Paper, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const Image = styled("img")({
  maxWidth: "100px",
  maxHeight: "92px",
  minHeight: "60px",
  minWidth: "66px",
  objectFit: "scale-down",
});

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
        <Image src={imgUrl} alt={imgAlt} />
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
