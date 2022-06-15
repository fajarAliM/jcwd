import { Box, CircularProgress, Typography, Grid } from "@mui/material";
import {
  BsFillArrowUpRightCircleFill,
  BsFillArrowDownRightCircleFill,
} from "react-icons/bs";

const CardWithCircularBar = ({
  title,
  amount,
  value,
  percentage,
  notation,
}) => {
  return (
    <Grid
      item
      xs={4}
      sx={{ width: "400px", height: "122px", marginTop: "16px" }}
    >
      <Box
        sx={{
          borderRadius: "5px",
          backgroundColor: "white",
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: 2,
        }}
      >
        <Box sx={{ marginRight: "90px" }}>
          <Typography
            sx={{
              fontSize: "12px",
              color: "Sidebar.500",
              marginBottom: "12px",
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "12px",
            }}
          >
            {amount}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              color: notation === "+" ? "blue" : "red",
              alignContent: "center",
            }}
          >
            {notation === "+" ? (
              <BsFillArrowUpRightCircleFill fontSize="10px" />
            ) : (
              <BsFillArrowDownRightCircleFill fontSize="10px" />
            )}
            <Typography sx={{ fontSize: "10px", marginLeft: "4px" }}>
              {value.toLocaleString()}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ width: "65px", height: "65px" }}>
          <Box sx={{ position: "relative", display: "inline-flex" }}>
            <CircularProgress
              variant="determinate"
              value={percentage}
              thickness={6}
              size={65}
              color={notation === "+" ? undefined : "error"}
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                component="div"
                color="text.secondary"
              >
                {`${notation}${percentage}%`}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default CardWithCircularBar;
