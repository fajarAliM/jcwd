/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
import { Grid, Box, Typography, Button, Stack } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ChatIcon from "@mui/icons-material/Chat";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { useState } from "react";
import moment from "moment";
import { styled } from "@mui/material/styles";
import ProductCardItems from "components/Admin/ProductCardItems";
import ModalTerimaPesanan from "components/Admin/ModalTerimaPesanan";
import axiosInstance from "config/api";

const Image = styled("img")({
  width: "73px",
  height: "100%",
  objectFit: "scale-down",
});

const CardOrder = ({
  status,
  orderCode,
  orderTime,
  productAdded,
  productImage,
  isObatResep,
  productName,
  productQty,
  productPrice,
  productOrderQty,
  buyersName,
  buyersAddress,
  courier,
  transaksiId,
  totalPrice,
  product,
  detail,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [salinanResep, setSalinanResep] = useState(false);
  const [obatLain, setObatLain] = useState(false);

  const declineTransaction = async (transactionId) => {
    try {
      await axiosInstance.post("/admin/decline-transaction", {
        transactionId,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const askDelivery = async (transactionId) => {
    try {
      await axiosInstance.post("/admin/ask-for-delivery", {
        transactionId,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const declineHandler = (value) => {
    declineTransaction(value);
  };

  const deliveryHandler = (value) => {
    askDelivery(value);
  };

  const color = () => {
    if (status === 1 || status === 2 || status === 3) {
      return "white";
    } else if (status === 4) {
      return "#14C38E";
    } else if (status === 5) {
      return "#FF5C5C";
    }
  };

  const renderProduct = () => {
    if (detail.is_resep) {
      return (
        <ProductCardItems
          image={detail.resep_image_url}
          nama={detail.nomor_resep}
          harga={detail.total_price}
          isObatResep={detail.is_resep}
        />
      );
    }
    return product?.map((valo) => {
      return (
        <ProductCardItems
          image={valo?.product?.produk_image_url[0]}
          nama={valo?.product?.nama_produk}
          jumlah={valo?.quantity}
          harga={valo?.price_when_sold}
          productImage={productImage}
          productName={productName}
          productQty={productQty}
          productPrice={productPrice}
          isObatResep={isObatResep}
          productAdded={productAdded}
          buyersName={buyersName}
          orderCode={orderCode}
          transaksiId={transaksiId}
          orderTime={orderTime}
        />
      );
    });
  };

  return (
    <>
      {/* Product Component */}

      {/* Box 1 */}

      <Box
        sx={{
          marginTop: "32px",
          borderTopRightRadius: "10px",
          borderTopLeftRadius: "10px",
          boxShadow: 2,
          width: "100%",
          paddingX: "32px",
          paddingY: "16px",
        }}
        backgroundColor={color()}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            fontSize: "16px",
            justifyContent: "space-between",
          }}
        >
          {/* Check Box */}
          <Box display="flex" alignItems="center" flexDirection="row">
            <Typography sx={{ fontWeight: "bold" }}>
              {status === 1
                ? "Pesanan Baru"
                : status === 2
                ? "Siap Dikirim"
                : status === 3
                ? "Dalam Pengiriman"
                : status === 4
                ? "Selesai"
                : "Dibatalkan"}
            </Typography>
            <Typography sx={{ color: "Sidebar.700", marginLeft: "10px" }}>
              /
            </Typography>
            <Typography sx={{ fontWeight: "bold", marginLeft: "10px" }}>
              {orderCode}
            </Typography>
            <Typography sx={{ color: "Sidebar.700", marginLeft: "10px" }}>
              /
            </Typography>
            <AccessTimeIcon sx={{ marginLeft: "10px", color: "gray" }} />
            <Typography sx={{ color: "gray" }}>
              {moment(orderTime).format("DD MMMM YYYY, hh:mm A")}
            </Typography>
          </Box>

          {/* Countdown Box */}
          {status === 3 || status === 4 || status === 5 ? null : (
            <Box display="flex" alignItems="center" flexDirection="row">
              <Typography sx={{ fontWeight: "bold", marginRight: "6px" }}>
                Respon Sebelum
              </Typography>
              <Box
                sx={{
                  paddingX: "8px",
                  paddingY: "5px",
                  backgroundColor: "#FFDE6B4D",
                  border: "1px solid #FF6600",
                  borderRadius: "5px",
                  color: "Brand.500",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <AccessTimeIcon />
                <Typography>
                  {moment(orderTime)
                    .add(2, "days")
                    .format("DD MMMM YYYY, hh:mm A")}
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Box>

      {/* Box 2 */}
      <Box
        sx={{
          borderBottomLeftRadius: "10px",
          borderBottomRightRadius: "10px",
          boxShadow: 2,
          width: "100%",
          paddingX: "32px",
          paddingY: "16px",
          backgroundColor: "white",
        }}
      >
        {/* Detail Pemesanan */}
        <Grid container>
          {/* Box Product Image */}
          <Grid item container xs={3}>
            <Stack>{renderProduct()}</Stack>
          </Grid>

          {/* Box Detail Pengiriman */}
          <Grid item container xs={8}>
            {/* Box Nama Pembeli */}
            <Grid item xs={3}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography sx={{ fontSize: "14px", fontWeight: "bolder" }}>
                  Pembeli
                </Typography>
                <Typography sx={{ fontSize: "14px" }}>{buyersName}</Typography>
              </Box>
            </Grid>

            {/* Box Alamat Pembeli */}
            <Grid item xs={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography sx={{ fontSize: "14px", fontWeight: "bolder" }}>
                  Alamat
                </Typography>
                <Typography sx={{ fontSize: "14px" }}>
                  {buyersAddress}
                </Typography>
              </Box>
            </Grid>

            {/* Box Kurir */}
            <Grid item xs={3}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography sx={{ fontSize: "14px", fontWeight: "bolder" }}>
                  Kurir
                </Typography>
                <Typography sx={{ fontSize: "14px" }}>{courier}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        {isObatResep ? null : (
          <Box
            sx={{
              marginTop: "14px",
              marginBottom: "20px",
              borderRadius: "5px",
              backgroundColor: "#faf0e8",
              padding: "16px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  marginRight: "8px",
                }}
              >
                Total Harga
              </Typography>
            </Box>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                marginRight: "8px",
              }}
            >
              Rp {totalPrice.toLocaleString()},-
            </Typography>
          </Box>
        )}

        {/* Kategori Footer */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              color: "Brand.500",
            }}
          >
            <ChatIcon sx={{ marginRight: "10px" }} />
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "bold",
                marginRight: "30px",
              }}
            >
              Chat Pembeli
            </Typography>
            <ReceiptIcon sx={{ marginRight: "10px" }} />
            <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
              Detail Pemesanan
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            {status === 2 ? (
              <Button
                variant="contained"
                onClick={() => deliveryHandler(transaksiId)}
              >
                Minta Penjemputan
              </Button>
            ) : status === 3 ? (
              <Button variant="contained">Lihat Rincian</Button>
            ) : status === 1 ? (
              <>
                <Button
                  onClick={() => declineHandler(transaksiId)}
                  sx={{ color: "Brand.500" }}
                >
                  Tolak Pesanan
                </Button>
                <Button
                  variant="contained"
                  onClick={handleOpen}
                  disabled={isObatResep && !productAdded}
                  sx={{ "&:hover": { border: 0 } }}
                >
                  Terima Pesanan
                </Button>
                <ModalTerimaPesanan
                  transaksiId={transaksiId}
                  open={open}
                  handleClose={handleClose}
                  hargaProduk={productPrice}
                  jumlahProduk={productQty}
                  jumlahProdukOrder={productOrderQty}
                  kodeOrder={orderCode}
                  namaPembeli={buyersName}
                  namaProduk={productName}
                  totalHarga={totalPrice}
                  waktuOrder={orderTime}
                />
              </>
            ) : null}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CardOrder;
