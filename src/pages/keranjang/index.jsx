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
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const KeranjangPage = () => {
  const cartSelector = useSelector((state) => state.cart);
  // eslint-disable-next-line no-unused-vars
  const [cartItems, setCartItems] = useState(cartSelector.items);
  const [checkedItems, setCheckedItems] = useState([]);

  useEffect(() => {
    if (cartSelector.items) {
      setCartItems(cartSelector.items);
    }
  }, [cartSelector.items]);

  const totalPrice = () => {
    return cartItems.reduce((init, obj, idx) => {
      if (!checkedItems.includes(idx)) {
        return init;
      }
      return (
        init +
        (obj.product.harga_jual * obj.quantity -
          (parseInt(obj.product.diskon) / 100) *
            (obj.product.harga_jual * obj.quantity))
      );
    }, 0);
  };

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
                    val={item}
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
                  <Typography sx={{ fontWeight: 700 }}>
                    Rp {totalPrice().toLocaleString()}
                  </Typography>
                </Grid>

                <Grid item xs={4}>
                  <Typography sx={{ fontWeight: 700 }}>Total</Typography>
                </Grid>
                <Grid item xs={8} sx={{ textAlign: "right" }}>
                  <Typography sx={{ fontWeight: 700 }}>
                    Rp {totalPrice().toLocaleString()}
                  </Typography>
                </Grid>
              </Grid>
              <Link href="/alamat">
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
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Stack>
      {/* {cartSelector.items[0].id} */}
    </Container>
  );
};

export default KeranjangPage;
