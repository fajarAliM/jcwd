import { Box } from "@mui/material";
import { CgFormatSlash } from "react-icons/cg";

const Timer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          background: "#FF6B6B",
          // mr: 2,
          color: "white",
          width: "32px",
          height: "32px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 1,
          fontWeight: 700,
          fontSize: "14px",
        }}
      >
        24
      </Box>
      <CgFormatSlash fontSize="30px" color="#FF6B6B" />
      <Box
        sx={{
          background: "#FF6B6B",
          color: "white",
          width: "32px",
          height: "32px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 1,
          fontWeight: 700,
          fontSize: "14px",
        }}
      >
        45
      </Box>
      <CgFormatSlash fontSize="30px" color="#FF6B6B" />

      <Box
        sx={{
          background: "#FF6B6B",
          // mr: 2,
          color: "white",
          width: "32px",
          height: "32px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 1,
          fontWeight: 700,
          fontSize: "14px",
        }}
      >
        28
      </Box>
    </Box>
  );
};

export default Timer;
