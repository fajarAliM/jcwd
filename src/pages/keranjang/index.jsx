import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import UserCart from "components/Cart";
import { useState } from "react";

const cartDummy = [1, 2, 3, 4, 5];

const KeranjangPage = () => {
  const [cartItems, setCartItems] = useState(cartDummy);
  const [checkedItems, setCheckedItems] = useState([]);

  return (
    <Container sx={{ mt: "56px" }}>
      <Stack sx={{ flexGrow: 1 }}>
        <Typography fontSize="24px" fontWeight={700}>
          Keranjang Saya
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {/* LEFT SIDE */}
          <Grid item xs={8}>
            <Box
              sx={{
                border: "1px solid white",
                borderRadius: 3,
                boxShadow: "0 0 15px -10px black",
                p: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  borderBottom: "2px solid #D5D7DD",
                  paddingBottom: "20px",
                }}
              >
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={({ target: { checked } }) => {
                          let dupItems = [...checkedItems];
                          if (checked) {
                            cartItems.forEach((val, idx) => dupItems.push(idx));
                          } else {
                            dupItems = [];
                          }

                          setCheckedItems(dupItems);
                        }}
                        sx={{
                          color: "Brand.500",
                          "&.Mui-checked": {
                            color: "Brand.500",
                          },
                        }}
                      />
                    }
                    label="Pilih Semua"
                  />
                </FormGroup>
                {/* <Typography>Pilih Semua</Typography> */}
              </Box>
              {cartItems.map((item, idx) => {
                return (
                  <UserCart
                    setCartChecked={() => {
                      let dupItems = [...checkedItems];

                      if (dupItems.includes(idx)) {
                        dupItems = dupItems.filter(
                          (oldItem) => oldItem !== idx
                        );
                      } else {
                        dupItems.push(idx);
                      }
                      setCheckedItems(dupItems);
                    }}
                    checked={checkedItems.includes(idx)}
                  />
                );
              })}
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box
              sx={{
                border: "1px solid white",
                borderRadius: 3,
                boxShadow: "0 0 15px -10px black",
                padding: "28px",
                position: "sticky",
                top: 10,
              }}
            >
              <Typography
                sx={{ fontSize: "20px", fontWeight: 700, mb: "32px" }}
              >
                Total
              </Typography>
              <Grid container rowSpacing={2} sx={{ mb: 1 }}>
                <Grid item xs={4} sx={{ color: "#737A8D" }}>
                  <Typography sx={{ fontWeight: 700 }}>Sub Total</Typography>
                </Grid>
                <Grid item xs={8} sx={{ color: "#737A8D", textAlign: "right" }}>
                  <Typography sx={{ fontWeight: 700 }}>Rp 25.000</Typography>
                </Grid>

                <Grid item xs={4}>
                  <Typography sx={{ fontWeight: 700 }}>Total</Typography>
                </Grid>
                <Grid item xs={8} sx={{ textAlign: "right" }}>
                  <Typography sx={{ fontWeight: 700 }}>Rp 25.000</Typography>
                </Grid>
              </Grid>
              <Button
                variant="contained"
                sx={{
                  width: "100%",
                  mt: "30px",
                  "&:hover": {
                    border: 0,
                  },
                }}
              >
                Bayar(4)
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
};

export default KeranjangPage;
