import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
} from "@mui/material";
import UserCart from "components/Cart";

const KeranjangPage = () => {
  return (
    <Box sx={{ ml: "96px", mt: "56px", width: "1290px" }}>
      <Typography fontSize="24px" fontWeight={700}>
        Keranjang Saya
      </Typography>
      <Box
        sx={{
          mt: "36px",
          mb: "15px",
          display: "flex",
        }}
      >
        {/* LEFT SIDE */}
        <Container
          sx={{
            border: "1px solid white",
            borderRadius: 3,
            boxShadow: "0 0 15px -6px #FF6600",
            // mt: "36px",
            mr: "60px",
          }}
        >
          <Box
            sx={{
              borderBottom: "2px solid #D5D7DD",
              marginTop: "30px",
              paddingBottom: "20px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
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
                  // label="Pilih Semua"
                />
              </FormGroup>
              <Typography>Pilih Semua</Typography>
            </Box>
          </Box>
          <UserCart />
          <UserCart />
          <UserCart />
          <UserCart />
        </Container>
        <Box
          sx={{
            maxWidth: "410px",
            maxHeight: "250px",
            border: "1px solid white",
            borderRadius: 3,
            boxShadow: "0 0 15px -6px #FF6600",
            padding: "28px",
            position: "sticky",
            top: 1,
          }}
        >
          <Typography sx={{ fontSize: "20px", fontWeight: 700, mb: "32px" }}>
            Total
          </Typography>
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ md: "190px" }}
            sx={{ mb: 1 }}
          >
            <Grid item xs={6} sx={{ color: "#737A8D" }}>
              <Typography sx={{ fontWeight: 700 }}>Sub Total</Typography>
            </Grid>
            <Grid item xs={6} sx={{ color: "#737A8D" }}>
              <Typography sx={{ fontWeight: 700 }}>Rp 25.000</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography sx={{ fontWeight: 700 }}>Total</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ fontWeight: 700 }}>Rp 25.000</Typography>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            sx={{
              width: "350px",
              mt: "30px",
              "&:hover": {
                border: 0,
              },
            }}
          >
            Bayar(4)
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default KeranjangPage;
