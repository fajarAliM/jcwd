import { Box, Button, Stack, Typography } from "@mui/material";
import CheckOutCard from "components/CheckOut";
import { BsFillChatDotsFill } from "react-icons/bs";

const DaftarPemesanan = ({ status }) => {
  return (
    <Stack>
      <Stack
        sx={{
          border: "1px solid white",
          borderRadius: 3,
          boxShadow: "0 0 15px -10px black",
          mt: "44px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            paddingY: "34px",
            paddingX: "40px",
            borderBottom: "2px solid #F5F6F9",
          }}
        >
          <Typography>Jumat, 5 April 2022, 15:45</Typography>
          {status === "Dikirim" || status === "Selesai" ? (
            <Box
              sx={{
                border: "1px solid #32A853",
                color: "#32A853",
                background: "#87DF9F",
                width: "156px",
                height: "26px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "3px",
              }}
            >
              <Typography sx={{ fontSize: "12px", fontWeight: 400 }}>
                {status}
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                border: "1px solid #CBAF4E",
                color: "#CBAF4E",
                background: "#FFDE6B",
                width: "156px",
                height: "26px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "3px",
              }}
            >
              <Typography sx={{ fontSize: "12px", fontWeight: 400 }}>
                {status}
              </Typography>
            </Box>
          )}
        </Box>
        <Box
          sx={{
            paddingX: "40px",
            paddingY: "12px",
            borderBottom: "1px solid #F5F6F9",
          }}
        >
          <CheckOutCard />
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Box
              sx={{
                display: "flex",
                borderTop: "3px solid #F5F6F9",
              }}
            >
              <Typography sx={{ color: "#213360", mr: 2, mt: 2 }}>
                Sub Total
              </Typography>
              <Typography sx={{ fontWeight: 700, mt: 2 }}>Rp 25.000</Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            paddingX: "42px",
            paddingY: "31px",
          }}
        >
          <Button
            startIcon={<BsFillChatDotsFill />}
            sx={{ color: "Brand.500", fontWeight: 700, fontSize: "12px" }}
          >
            Chat Customer Service
          </Button>
          <Box sx={{ display: "flex" }}>
            <Stack sx={{ textAlign: "end" }}>
              <Typography sx={{ color: "#4F618E", fontSize: "12px" }}>
                Bayar Sebelum
              </Typography>
              <Typography sx={{ color: "#4F618E", fontSize: "12px" }}>
                6 April 2022, 15:45
              </Typography>
            </Stack>
            <Button
              variant="contained"
              sx={{
                ml: "16px",
                "&:hover": { border: 0 },
                width: "157px",
                height: "30px",
              }}
            >
              Bayar Sekarang
            </Button>
          </Box>
        </Box>
      </Stack>
    </Stack>
  );
};

export default DaftarPemesanan;
