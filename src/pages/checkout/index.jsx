/* eslint-disable no-unused-vars */
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CheckOutCard from "components/CheckOut";
import { useEffect, useState } from "react";
import ModalIsi from "components/Modal";
import Link from "next/link";
import axiosInstance from "config/api";
import ModalAlamat from "components/ModalAlamat";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { addToCart } from "redux/reducer/cart";
import { cumulatedPrice, price } from "../../redux/reducer/price";

const CheckOut = () => {
  const priceSelector = useSelector((state) => state.price);
  const [method, setMethod] = useState(null);
  const [open, setOpen] = useState(false);
  const [openAlamat, setOpenAlamat] = useState(false);
  const [alamatUtama, setAlamatUtama] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenAlamat = () => setOpenAlamat(true);
  const handleCloseAlamat = () => setOpenAlamat(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [ongkir, setOngkir] = useState(null);
  const [totalHarga, setTotalHarga] = useState(null);
  const [cart, setCart] = useState(null);
  const router = useRouter();
  const [selectedCart, setSelectedCart] = useState([]);
  const [hargaProducts, setHargaProducts] = useState(null);

  const dispatch = useDispatch();

  const fetchMainAddress = async () => {
    try {
      const mainAddress = await axiosInstance.get("/address/get-main-address");

      setAlamatUtama(mainAddress.data.result);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const fetchCart = async () => {
    try {
      const cartData = await axiosInstance.post("/cart/get-cart-id", {
        cartId: selectedCart,
      });
      setCart(cartData.data.data.rows);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const addNewTransaction = async () => {
    try {
      const newData = {
        total_price: totalHarga,
        cartId: selectedCart,
        paymentMethodId: method,
        addressId: selectedAddress.id,
      };
      const res = await axiosInstance.post(
        "/transaction/add-new-transaction",
        newData
      );

      const fetchNewCart = await axiosInstance.get("/cart/get-cart");

      const CartData = fetchNewCart.data;

      dispatch(addToCart(CartData.data));
      dispatch(cumulatedPrice(totalHarga));

      localStorage.clear();
      router.push(`detail-transaksi/${res.data.data.id}`);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const renderCart = () => {
    return cart?.map((val) => {
      return (
        <CheckOutCard
          produk_image={val?.product?.produk_image_url[0]}
          produk_name={val?.product?.nama_produk}
          produk_price={val?.product?.harga_jual}
          produk_qty={val?.quantity}
          product_diskon={val?.product?.diskon}
        />
      );
    });
  };
  useEffect(() => {
    fetchMainAddress();
  }, [selectedAddress]);

  useEffect(() => {
    if (selectedCart.length) {
      fetchCart();
    }
  }, [selectedCart, totalHarga]);

  useEffect(() => {
    if (
      localStorage.getItem("selectedItems") ||
      localStorage.getItem("totalPrice")
    ) {
      setSelectedCart(JSON.parse(localStorage.getItem("selectedItems")));
      setHargaProducts(localStorage.getItem("totalPrice"));
    }
  }, []);

  useEffect(() => {
    if (hargaProducts || selectedCart) {
      // eslint-disable-next-line no-shadow
      const totalHarga = hargaProducts;
      const checkedItems = selectedCart;
      dispatch(price({ totalHarga, checkedItems }));
    }
  }, [selectedCart, hargaProducts]);

  const fetchOngkir = async () => {
    try {
      const dataOngkir = await axiosInstance.post("/address/cost", {
        origin: "153",
        destination:
          selectedAddress.kota_kabupaten_id || alamatUtama.kota_kabupaten_id,
        weight: 200,
        courier: "jne",
      });
      setOngkir(dataOngkir.data.result[0].costs[0].cost[0].value);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const total = () => {
    return parseInt(hargaProducts) + ongkir;
  };

  // const buttonHandler = () => {};

  useEffect(() => {
    if (selectedAddress || alamatUtama) {
      fetchOngkir();
    }
  }, [selectedAddress, alamatUtama]);

  useEffect(() => {
    setTotalHarga(total());
  }, [total]);

  return (
    <Container sx={{ mt: "56px" }}>
      <Grid container spacing={2} columns={{ xs: 6, md: 12 }}>
        <Grid item xs={6} md={8}>
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
                  {selectedAddress?.nama_penerima || alamatUtama?.nama_penerima}
                  ,
                </Typography>
                <Typography sx={{ fontWeight: 700, fontSize: "14px" }}>
                  {selectedAddress?.no_telepon_penerima ||
                    alamatUtama?.no_telepon_penerima}
                </Typography>
              </Box>
              <Button
                onClick={handleOpenAlamat}
                sx={{ color: "Brand.500", fontWeight: 700, fontSize: "12px" }}
              >
                Pilih Alamat Lain
              </Button>
              <ModalAlamat
                open={openAlamat}
                handleClose={handleCloseAlamat}
                setSelectedAddress={setSelectedAddress}
              />
            </Box>
            <Stack>
              <Typography sx={{ fontSize: "14px", color: "#213360" }}>
                {selectedAddress?.label_alamat || alamatUtama?.label_alamat}
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#4F618E",
                  borderBottom: "2px solid #F5F6F9",
                  paddingBottom: 2,
                }}
              >
                {selectedAddress?.alamat_lengkap || alamatUtama?.alamat_lengkap}
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
            {renderCart()}
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
                  Rp {hargaProducts}
                </Typography>
              </Box>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={6} md={4}>
          <Box
            width={{ xs: "100%", md: "100%" }}
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
                  Rp {hargaProducts?.toLocaleString()}
                </Typography>
              </Grid>
              <Grid item xs={4} sx={{ mb: "24px" }}>
                <Typography sx={{ fontSize: "14px" }}>Pengiriman</Typography>
              </Grid>
              <Grid item xs={8} sx={{ textAlign: "right" }}>
                <Typography sx={{ fontWeight: 700, fontSize: "14px" }}>
                  Rp {ongkir?.toLocaleString()}
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
                  Rp {total().toLocaleString()}
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
                disabled={!priceSelector.totalPrice}
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
              <ModalIsi
                open={open}
                handleClose={handleClose}
                total={total}
                setMethod={setMethod}
              />
              <Button
                onClick={addNewTransaction}
                disabled={!method}
                variant="contained"
                sx={{
                  boxShadow: 0,
                  mt: "10px",
                  height: "45px",
                  fontWeight: 700,
                  fontSize: "14px",
                  "&:hover": {
                    border: 0,
                    boxShadow: 0,
                  },
                }}
              >
                Check Out
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CheckOut;
