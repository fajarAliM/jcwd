import {
  Box,
  Button,
  Container,
  Grid,
  // Modal,
  Stack,
  Typography,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CheckOutCard from "components/CheckOut";
import { useState } from "react";
import ModalIsi from "components/Modal";
import Link from "next/link";

const CheckOut = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container sx={{ mt: "56px" }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Box
            sx={{
              border: "1px solid white",
              borderRadius: 3,
              boxShadow: "0 0 15px -10px black",
              p: 2,
              mb: "26px",
            }}
          >
            <Typography
              sx={{
                borderBottom: "2px solid #F5F6F9",
                color: "#213360",
                fontWeight: 700,
                fontSize: "20px",
                paddingBottom: 1,
              }}
            >
              Alamat Pengiriman
            </Typography>
            <Box
              sx={{
                display: "flex",
                mt: "16px",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex" }}>
                <Typography
                  sx={{ mr: "2px", fontWeight: 700, fontSize: "14px" }}
                >
                  Elon Musk,
                </Typography>
                <Typography sx={{ fontWeight: 700, fontSize: "14px" }}>
                  +621234567
                </Typography>
              </Box>
              <Button
                sx={{ color: "Brand.500", fontWeight: 700, fontSize: "12px" }}
              >
                Pilih Alamat Lain
              </Button>
            </Box>
            <Stack>
              <Typography sx={{ fontSize: "14px", color: "#213360" }}>
                Space X
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#4F618E",
                  borderBottom: "2px solid #F5F6F9",
                  paddingBottom: 2,
                }}
              >
                1 Rocket Rd, Hawthorne, CA 90250, United States
              </Typography>
            </Stack>
            <Link href="/alamat">
              <Button
                startIcon={<AddBoxIcon />}
                sx={{ color: "Brand.500", fontWeight: 700, mt: "11px" }}
              >
                Tambahkan Alamat Baru
              </Button>
            </Link>
          </Box>
          <Stack
            sx={{
              border: "1px solid white",
              borderRadius: 3,
              boxShadow: "0 0 15px -10px black",
              p: 2,
            }}
          >
            <Typography
              sx={{
                color: "#213360",
                fontWeight: 700,
                fontSize: "20px",
                borderBottom: "2px solid #F5F6F9",
                mb: "15px",
              }}
            >
              Ringkasan Order
            </Typography>
            <CheckOutCard />
            <CheckOutCard />
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
                <Typography sx={{ fontWeight: 700, mt: 2 }}>
                  Rp 75.000
                </Typography>
              </Box>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <Box
            sx={{
              border: "1px solid white",
              borderRadius: 3,
              boxShadow: "0 0 15px -10px black",
              p: 2,
            }}
          >
            <Typography sx={{ mb: "32px" }}>Total</Typography>
            <Grid
              container
              rowSpacing={2}
              sx={{ mb: 1, borderBottom: "2px solid #F5F6F9" }}
            >
              <Grid item xs={4}>
                <Typography sx={{ fontSize: "14px" }}>Sub Total</Typography>
              </Grid>
              <Grid item xs={8} sx={{ textAlign: "right" }}>
                <Typography sx={{ fontWeight: 700, fontSize: "14px" }}>
                  Rp 25.000
                </Typography>
              </Grid>
              <Grid item xs={4} sx={{ mb: "24px" }}>
                <Typography sx={{ fontSize: "14px" }}>Pengiriman</Typography>
              </Grid>
              <Grid item xs={8} sx={{ textAlign: "right" }}>
                <Typography sx={{ fontWeight: 700, fontSize: "14px" }}>
                  Rp 3.000
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              rowSpacing={2}
              sx={{
                mb: 1,
                borderBottom: "2px solid #F5F6F9",
                paddingBottom: "24px",
                paddingTop: "20px",
              }}
            >
              <Grid item xs={4}>
                <Typography sx={{ fontSize: "16px", fontWeight: 700 }}>
                  Total
                </Typography>
              </Grid>
              <Grid item xs={8} sx={{ textAlign: "right" }}>
                <Typography
                  sx={{ fontWeight: 700, fontSize: "16px", color: "Brand.500" }}
                >
                  Rp 25.000
                </Typography>
              </Grid>
            </Grid>
            <Stack sx={{ mt: "24px" }}>
              <Typography sx={{ fontSize: "20px", fontWeight: 700 }}>
                Metode Pembayaran
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "#4F618E",
                  mt: "8px",
                }}
              >
                Silahkan pilih metode pembayaran anda disini
              </Typography>
              <Button
                variant="contained"
                onClick={handleOpen}
                sx={{
                  boxShadow: 0,
                  mt: "24px",
                  height: "52px",
                  fontWeight: 700,
                  fontSize: "14px",
                  "&:hover": {
                    border: 0,
                    boxShadow: 0,
                  },
                }}
              >
                Pilih Metode Pembayaran (2)
              </Button>
              <ModalIsi open={open} handleClose={handleClose} />
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CheckOut;
