/* eslint-disable no-unused-vars */
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
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { price } from "../../redux/reducer/price";

const KeranjangPage = () => {
  const cartSelector = useSelector((state) => state.cart);
  // eslint-disable-next-line no-unused-vars
  const [cartItems, setCartItems] = useState(cartSelector.items);
  const [checkedItems, setCheckedItems] = useState([]);
  const [totalHarga, setTotalHarga] = useState(null);
  const authSelector = useSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    if (cartSelector.items) {
      setCartItems(cartSelector.items);
    }
  }, [cartSelector.items]);

  const totalPrice = () => {
    return cartItems.reduce((init, obj, idx) => {
      if (!checkedItems.includes(obj.id)) {
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

  useEffect(() => {
    if (!authSelector.id) {
      router.push("/");
    }
  }, []);

  const buttonHandler = () => {
    localStorage.setItem("selectedItems", JSON.stringify(checkedItems));
    localStorage.setItem("totalPrice", JSON.stringify(totalHarga));
    dispatch(price({ totalHarga, checkedItems }));

    router.push("/checkout");
  };

  useEffect(() => {
    setTotalHarga(totalPrice());
  }, [totalPrice]);

  return (
    <Container sx={{ mt: "56px" }}>
      <Stack sx={{ flexGrow: 1 }}>
        <Typography fontSize="24px" fontWeight={700}>
          Keranjang Saya
        </Typography>
        <Grid container spacing={2} columns={12} sx={{ mt: 2 }}>
          {/* LEFT SIDE */}
          <Grid item xs={12} md={8}>
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
                            cartItems.forEach((val) => dupItems.push(val.id));
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

                      if (dupItems.includes(item.id)) {
                        dupItems = dupItems.filter(
                          (oldItem) => oldItem !== item.id
                        );
                      } else {
                        dupItems.push(item.id);
                      }
                      setCheckedItems(dupItems);
                    }}
                    checked={checkedItems.includes(item.id)}
                    val={item}
                    indexInRedux={idx}
                  />
                );
              })}
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                border: "1px solid white",
                borderRadius: 3,
                boxShadow: "0 0 15px -10px black",
                padding: "28px",
                position: "sticky",
                top: 125,
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
              <Button
                onClick={buttonHandler}
                variant="contained"
                disabled={!totalHarga}
                sx={{
                  width: "100%",
                  mt: "30px",
                  "&:hover": {
                    border: 0,
                  },
                }}
              >
                Bayar
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
};

export default KeranjangPage;
