/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
/* eslint-disable no-nested-ternary */
import {
  Grid,
  Box,
  Typography,
  Button,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ChatIcon from "@mui/icons-material/Chat";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { useState } from "react";
import moment from "moment";
import "moment/locale/id";
import ProductCardItems from "components/Admin/ProductCardItems";
import ModalTerimaPesanan from "components/Admin/ModalTerimaPesanan";
import { useSnackbar } from "notistack";
import axiosInstance from "config/api";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import ModalBuktiPembayaran from "../ModalBuktiPembayaran";

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
  reRender,
}) => {
  const [open, setOpen] = useState(false);
  const [buktiPembayaran, setBuktiPembayaran] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [showAllProduct, setShowAllProduct] = useState(false);
  const [decline, setDecline] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const declineTransaction = async (transactionId) => {
    try {
      await axiosInstance.post("/admin/decline-transaction", {
        transactionId,
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const askDelivery = async (transactionId) => {
    try {
      await axiosInstance.post("/admin/ask-for-delivery", {
        transactionId,
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const declineHandler = (value) => {
    declineTransaction(value);
    enqueueSnackbar("Pesanan Telah Ditolak", { variant: "success" });
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
          productAdded={detail.productAdded}
          isObatResep={detail.is_resep}
          buyersName={detail.user.username}
          transaksiId={transaksiId}
          orderCode={orderCode}
          addressDetail={detail.address}
        />
      );
    }
    if (showAllProduct) {
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
    }

    return (
      <ProductCardItems
        image={product[0]?.product?.produk_image_url[0]}
        nama={product[0]?.product?.nama_produk}
        jumlah={product[0]?.quantity}
        harga={product[0]?.price_when_sold}
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
              {moment(orderTime).format("DD MMMM YYYY, HH:mm")}
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
                    .format("DD MMMM YYYY, HH:mm")}
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
          <Grid item container xs={4}>
            {renderProduct()}
            {!isObatResep && product.length > 1 && !showAllProduct ? (
              <Box
                display="flex"
                alignItems="center"
                sx={{
                  color: "Brand.500",
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
                onClick={() => {
                  setShowAllProduct(true);
                }}
              >
                <Typography marginLeft={2} my={1}>
                  Lihat {product.length - 1} obat lainnya{" "}
                </Typography>
                <KeyboardArrowDownRoundedIcon />
              </Box>
            ) : undefined}
            {!isObatResep && product.length > 1 && showAllProduct ? (
              <Box
                display="flex"
                alignItems="center"
                sx={{
                  color: "Brand.500",
                  width: "100%",
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
                onClick={() => {
                  setShowAllProduct(false);
                }}
              >
                <Typography marginLeft={2} my={1}>
                  Tutup
                </Typography>
                <KeyboardArrowUpRoundedIcon />
              </Box>
            ) : undefined}
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

        {isObatResep && totalPrice === 0 ? null : (
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
              Rp {totalPrice.toLocaleString("id")}
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
            {detail?.proof_of_payment ? (
              <>
                <ReceiptIcon
                  onClick={() => {
                    setBuktiPembayaran(true);
                  }}
                  sx={{
                    marginRight: "10px",
                    ":hover": {
                      cursor: "pointer",
                    },
                  }}
                />
                <Typography
                  onClick={() => {
                    setBuktiPembayaran(true);
                  }}
                  sx={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    ":hover": {
                      cursor: "pointer",
                    },
                  }}
                >
                  Lihat Bukti Pembayaran
                </Typography>
              </>
            ) : null}
            <ModalBuktiPembayaran
              open={buktiPembayaran}
              handleClose={() => setBuktiPembayaran(false)}
              gambarBuktiPembayaran={detail?.proof_of_payment?.bukti_transfer}
            />
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
                onClick={async () => {
                  await deliveryHandler(transaksiId);
                  reRender();
                }}
              >
                Minta Penjemputan
              </Button>
            ) : status === 3 ? (
              <Button variant="contained">Lihat Rincian</Button>
            ) : status === 1 ? (
              <>
                <Button
                  onClick={() => setDecline(true)}
                  sx={{ color: "Brand.500" }}
                >
                  Tolak Pesanan
                </Button>
                <Dialog open={decline} onClose={() => setDecline(false)}>
                  <DialogTitle>Alert!</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Apakah anda yakin Menolak Pesanan?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      variant="outlined"
                      onClick={() => setDecline(false)}
                    >
                      Kembali
                    </Button>
                    <Button
                      variant="contained"
                      onClick={async () => {
                        await declineHandler(transaksiId);
                        reRender();
                        setDecline(false);
                      }}
                      autoFocus
                    >
                      Yakin
                    </Button>
                  </DialogActions>
                </Dialog>
                {(isObatResep && !productAdded && !detail.proof_of_payment) ||
                !detail.proof_of_payment ? (
                  <Tooltip title="Menunggu Pembayaran" placement="top">
                    <span>
                      <Button variant="contained" disabled>
                        Terima Pesanan
                      </Button>
                    </span>
                  </Tooltip>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleOpen}
                    sx={{ "&:hover": { border: 0 } }}
                  >
                    Terima Pesanan
                  </Button>
                )}
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
                  productsData={product}
                  reRender={reRender}
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
