/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  Collapse,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import CheckOutCard from "components/CheckOut";
import { RiFileCopyFill } from "react-icons/ri";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Timer from "components/Timer";
import { useSelector } from "react-redux";
import axiosInstance from "config/api";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";
import moment from "moment";
import ModalUploadPembayaran from "components/ModalUploadPembayaran";

const Image = styled("img")({
  maxWidth: "120px",
  maxHeight: "50px",
  objectFit: "scale-down",
});

const Konfirmasi = () => {
  const [uploadPembayaran, setUploadPembayaran] = useState(false);
  const priceSelector = useSelector((state) => state.price);
  const [bca, setBca] = useState(false);
  const openBca = () => setBca(true);
  const closeBca = () => setBca(false);
  const [cart, setCart] = useState(null);
  const [method, setMethod] = useState(null);
  const router = useRouter();
  const [methodId, setMethodId] = useState(router.query.paymentMethod);
  const [timer, setTimer] = useState(null);
  const [createdAt, setCreatedAt] = useState();

  const fetchCart = async () => {
    try {
      const cartData = await axiosInstance.post("/cart/get-cart-id", {
        cartId: priceSelector.checkedItems,
        show: "konfirmasi",
      });
      setCart(cartData.data.data.rows);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  // useEffect(() => {
  //   setCreatedAt(cart[0].createdAt);
  // }, [cart]);

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

  // const renderTimer = () => {
  //   return cart?.map((val) => {
  //     return <Timer timer={val?.createdAt} />;
  //   });
  // };

  const fetchPaymentMethod = async () => {
    try {
      const methodData = await axiosInstance.post(
        "/transaction/get-payment-method-id",
        {
          id: router.query.paymentMethod,
        }
      );
      setMethod(methodData.data.result);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCart();
    fetchPaymentMethod();
  }, [router.query.paymentMethod]);

  useEffect(() => {
    if (router.isReady) {
      setMethodId(router.query.paymentMethod);
    }
  }, [router.isReady]);

  const addCountDown = () => {
    moment().add(5, "minutes").format("MM/DD/YYYY, hh:mm:ss");
    setTimer(moment().add(5, "minutes").format("MM/DD/YYYY, hh:mm:ss"));
  };

  return (
    <Container
      sx={{
        mt: "56px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack sx={{ width: "800px" }}>
        <Typography sx={{ fontWeight: 700, fontSize: "24px" }}>
          Menunggu Pembayaran
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            border: "1px solid white",
            borderRadius: 3,
            boxShadow: "0 0 15px -10px black",
            p: 2,
            paddingTop: "27px",
            paddingBottom: "31px",
            paddingLeft: "42px",
            paddingRight: "40px",
            mt: "41px",
          }}
        >
          <Stack>
            <Typography sx={{ color: "#737A8D", fontSize: "14px" }}>
              Batas Akhir Pembayaran
            </Typography>
            <Typography sx={{ fontWeight: 700, fontSize: "16px", mt: "8px" }}>
              {moment(router.query.createdAt)
                .add(1, "day")
                .format("dddd, DD MMMM YYYY, hh:mm A")}
            </Typography>
          </Stack>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <Timer timer={timer} /> */}
            {/* {renderTimer()} */}
            <Timer timer={createdAt} />
          </Box>
        </Box>
        <Box sx={{ mt: "41px" }}>
          <Stack
            sx={{
              border: "1px solid white",
              borderRadius: 3,
              boxShadow: "0 0 15px -10px black",
              p: 2,
              paddingX: "40px",
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
                  Rp {priceSelector?.totalPrice.toLocaleString()}
                </Typography>
              </Box>
            </Box>
          </Stack>
          <Stack
            sx={{
              border: "1px solid white",
              borderRadius: 3,
              boxShadow: "0 0 15px -10px black",
              mt: "40px",
              paddingX: "40px",
              paddingY: "30px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "2px solid #F5F6F9",
                paddingBottom: "24px",
              }}
            >
              <Typography
                sx={{ fontWeight: 700, fontSize: "20px", color: "#213360" }}
              >
                {method?.nama_metode}
              </Typography>
              <Image src={method?.logo} />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: "36px",
                alignItems: "center",
              }}
            >
              <Stack>
                <Typography
                  sx={{ fontWeight: 400, fontSize: "14px", color: "#737A8D" }}
                >
                  Nomor Virtual Account
                </Typography>
                <Typography sx={{ fontWeight: 700, fontSize: "24px" }}>
                  80777082261130123
                </Typography>
              </Stack>
              <Button
                endIcon={<RiFileCopyFill />}
                sx={{
                  color: "Brand.500",
                  fontWeight: 700,
                  "&:hover": {
                    background: "white",
                  },
                  height: "33px",
                }}
              >
                Salin
              </Button>
            </Box>
            <Stack sx={{ mt: "32px" }}>
              <Typography
                sx={{ fontWeight: 400, fontSize: "14px", color: "#737A8D" }}
              >
                Total Pembayaran
              </Typography>
              <Typography sx={{ fontWeight: 700, fontSize: "24px" }}>
                Rp {priceSelector?.totalPrice.toLocaleString()}
              </Typography>
            </Stack>
          </Stack>
          <Box
            sx={{
              justifyContent: "center",
              alignItems: "center",
              mt: "40px",
              borderBottom: "2px solid #D5D7DD",
              paddingBottom: "84px",
            }}
          >
            <Button
              onClick={() => setUploadPembayaran(true)}
              sx={{
                height: "50px",
                width: "100%",
                mr: "8px",
                fontWeight: 700,
                fontSize: "14px",
              }}
              variant="contained"
            >
              Upload Bukti Pembayaran
            </Button>
            <ModalUploadPembayaran
              openModal={uploadPembayaran}
              handleCloseModal={() => setUploadPembayaran(false)}
              metodePembayaranId={router.query.paymentMethod}
              totalPembayaran={priceSelector?.totalPrice}
              transaksiId={router.query.transaksiId}
            />
            <Box sx={{ display: "flex", marginTop: "10px" }}>
              <Link href="/">
                <Button
                  variant="outlined"
                  sx={{
                    height: "50px",
                    width: "100%",
                    mr: "8px",
                    fontWeight: 700,
                    fontSize: "14px",
                  }}
                >
                  Kembali Ke Beranda
                </Button>
              </Link>
              <Link href="/proses-pemesanan">
                <Button
                  variant="contained"
                  sx={{
                    height: "50px",
                    width: "100%",
                    fontWeight: 700,
                    fontSize: "14px",
                    "&:hover": { border: 0 },
                  }}
                >
                  Check Status Pembayaran
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
        <Typography
          sx={{
            color: "#213360",
            fontWeight: 700,
            fontSize: "20px",
            mt: "84px",
          }}
        >
          Cara Pembayaran
        </Typography>
        {bca ? (
          <Box
            onClick={closeBca}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: "44px",
              "&:hover": { cursor: "pointer" },
            }}
          >
            <Typography sx={{ fontWeight: 700, fontSize: "16px" }}>
              {method?.nama_metode}
            </Typography>
            <KeyboardArrowUpIcon />
          </Box>
        ) : (
          <Box
            onClick={openBca}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: "44px",
              "&:hover": { cursor: "pointer" },
            }}
          >
            <Typography sx={{ fontWeight: 700, fontSize: "16px" }}>
              {method?.nama_metode}
            </Typography>
            <KeyboardArrowDownIcon />
          </Box>
        )}
        <Collapse in={bca}>
          <Stack
            sx={{
              mt: "28px",
              borderBottom: "2px solid #D5D7DD",
              paddingBottom: "36px",
            }}
          >
            <Typography>1. Masukkan Kartu ATM dan PIN.</Typography>
            <Typography>
              2. Pilih menu Transaksi Lainnya lalu Transfer lalu ke Rekening
              Online.
            </Typography>
            <Typography>
              3. Masukkan 5 angka kode perusahaan (80777) dan Nomor HP yang kamu
              daftarkan di akun (Contoh: 80777081316951940).
            </Typography>
            <Typography>
              4. Di halaman konfirmasi, pastikan detil pembayaran sudah sesuai
              seperti No Rekening, Nama, Perus/Produk dan Total Tagihan.
            </Typography>
            <Typography>
              5. Pastikan nama kamu dan Total Tagihannya benar.
            </Typography>
            <Typography>
              6. Jika sudah benar, klik Ya. Simpan struk transaksi sebagai bukti
              pembayaran.
            </Typography>
          </Stack>
        </Collapse>
      </Stack>
    </Container>
  );
};

export default Konfirmasi;
