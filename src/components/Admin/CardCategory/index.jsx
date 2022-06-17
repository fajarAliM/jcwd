import { Box, Typography, Grid } from "@mui/material";

const CardCategory = ({ title, value, column }) => {
  return (
    <Grid xs={column} item sx={{ marginTop: "16px" }}>
      <Box
        sx={{
          backgroundColor: "white",
          paddingX: "10px",
          paddingY: "10px",
          boxShadow: 2,
          borderRadius: "5px",
          width: "100%",
          maxWidth: "168px",
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
