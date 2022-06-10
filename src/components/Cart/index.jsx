import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";
import KudaMesir from "../../public/Images/KudaMesir.png";

const UserCart = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", mt: "28px" }}>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                // defaultChecked
                sx={{
                  color: "Brand.500",
                  "&.Mui-checked": {
                    color: "Brand.500",
                  },
                }}
              />
            }
          />
        </FormGroup>
        <Image src={KudaMesir} height="100px" width="100px" />
        <Box
          sx={{ display: "flex", flexDirection: "column", marginLeft: "60px" }}
        >
          <Typography sx={{ fontSize: "16px" }}>
            Obat Kuat Kuda Mesir
          </Typography>
          <Typography sx={{ fontSize: "12px" }}>1 Strip</Typography>
        </Box>
        <Box
          sx={{
            marginLeft: "270px",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Box sx={{ alignItems: "center" }}>
              <Typography
                sx={{
                  textDecoration: "line-through",
                  mr: "12px",
                  color: "#B4B9C7",
                  fontSize: "14px",
                }}
              >
                Rp 30.000
              </Typography>
              <Typography sx={{ fontSize: "20px" }}>Rp 25.000</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          ml: "350px",
          display: "flex",
          alignItems: "center",
          mb: "28px",
        }}
      >
        <Button
          variant="outlined"
          sx={{
            border: "transparent",
            "&:hover": {
              border: 0,
            },
          }}
        >
          Pindahkan Ke Wishlist
        </Button>

        <IconButton sx={{ color: "black", mr: "5px" }}>
          <DeleteIcon sx={{ fontSize: "20px" }} />
        </IconButton>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            border: "1px solid #FF6600",
            maxWidth: 180,
            borderRadius: 3,
          }}
        >
          <Button
            variant="outlined"
            sx={{
              border: 0,
              fontWeight: "bold",
              "&:hover": {
                border: 0,
              },
            }}
          >
            -
          </Button>
          <Typography
            sx={{
              border: 0,
              color: "#FF6600",
              width: "50px",
              textAlign: "center",
            }}
          >
            1
          </Typography>
          <Button
            variant="outlined"
            sx={{
              border: 0,
              fontWeight: "bold",
              "&:hover": {
                border: 0,
              },
            }}
          >
            +
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
export default UserCart;
