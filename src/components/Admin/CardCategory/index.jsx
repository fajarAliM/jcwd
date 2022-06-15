import { Box, Typography, Grid } from "@mui/material";

const CardCategory = ({ title, value }) => {
  return (
    <Grid xs={3} item sx={{ marginRight: "16px", marginTop: "16px" }}>
      <Box
        sx={{
          backgroundColor: "white",
          paddingX: "10px",
          paddingY: "10px",
          boxShadow: 2,
          borderRadius: "5px",
        }}
      >
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "bold",
            color: "Sidebar.500",
          }}
        >
          {title}
        </Typography>
        <Typography sx={{ fontSize: "28px", fontWeight: "bold" }}>
          {value}
        </Typography>
      </Box>
    </Grid>
  );
};

export default CardCategory;
