/* eslint-disable no-console */
/* eslint-disable camelcase */
import {
  Box,
  Button,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import CheckOutCard from "components/CheckOut";
import axiosInstance from "config/api";
import { useSnackbar } from "notistack";
import moment from "moment";
import "moment/locale/id";
import { useRouter } from "next/router";
import { useState } from "react";
import { BsFillChatDotsFill } from "react-icons/bs";

const DaftarPemesanan = ({
  status,
  total_harga,
  produk,
  detail,
  transaksiId,
  reRender,
  time,
  id,
}) => {
  const router = useRouter();
  const [batalkan, setBatalkan] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const renderProduk = () => {
    if (detail.is_resep) {
      return (
        <CheckOutCard
          produk_image={detail.resep_image_url}
          produk_name={detail.nomor_resep}
          produk_price={detail.total_price}
          isResep={detail.is_resep}
          time={time}
          id={id}
          status={status}
          buktiPembayaran={detail.proof_of_payment}
        />
      );
    }
    return produk?.map((valo) => {
      return (
        <CheckOutCard
          produk_image={valo?.product?.produk_image_url[0]}
          produk_name={valo?.product?.nama_produk}
          produk_satuan={valo?.product?.satuan}
          produk_price={valo?.product?.harga_jual}
          produk_qty={valo?.quantity}
          product_diskon={valo?.product?.diskon}
          time={time}
          id={id}
        />
      );
    });
  };

  const finishTransaction = async (transactionId) => {
    try {
      await axiosInstance.post("/transaction/finish-transaction", {
        transactionId,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const finishHandler = (value) => {
    finishTransaction(value);
  };

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

  const declineHandler = (value) => {
    declineTransaction(value);
    enqueueSnackbar("Pesanan Telah Dibatalkan", { variant: "success" });
  };

  return (
    <Stack>
      <Stack
        sx={{
          border: "1px solid transparent",
          borderRadius: 3,
          boxShadow: "0 0 15px -10px black",
          mt: "44px",
          background: "#F7F7F7",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            paddingY: "34px",
            paddingX: "40px",
            borderBottom: "2px solid white",
          }}
        >
          <Typography>
            {moment(detail?.createdAt)
              .locale("in")
              .format("dddd, DD MMMM YYYY, HH:mm")}
          </Typography>
          {status === "Dikirim" ||
          status === "Selesai" ||
          status === "Menunggu" ||
          status === "Diproses" ? (
            <Box
              sx={{
                border:
                  status === "Dikirim" || status === "Selesai"
                    ? "1px solid #32A853"
                    : "1px solid #CBAF4E",
                color:
                  status === "Dikirim" || status === "Selesai"
                    ? "#32A853"
                    : "#CBAF4E",
                background:
                  status === "Dikirim" || status === "Selesai"
                    ? "#87DF9F"
                    : "#FFDE6B",
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
                border: "1px solid #999999",
                color: "#666666",
                background: "#cccccc",
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
            borderBottom: "1px solid white",
          }}
        >
          {renderProduk()}
          {!detail.is_resep ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  borderTop: "2px solid #C9CCD5",
                }}
              >
                <Typography sx={{ color: "#213360", mr: 2, mt: 2 }}>
                  Sub Total
                </Typography>
                <Typography sx={{ fontWeight: 700, mt: 2 }}>
                  Rp {total_harga.toLocaleString("id")}
                </Typography>
              </Box>
            </Box>
          ) : null}
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
          {detail.proof_of_payment ||
          detail.paymentStatusId === 4 ||
          total_harga === 0 ||
          detail.paymentStatusId === 3 ||
          detail.paymentStatusId === 5 ? null : (
            <Box sx={{ display: "flex" }}>
              <Stack sx={{ textAlign: "end" }}>
                <Typography sx={{ color: "#4F618E", fontSize: "12px" }}>
                  Bayar Sebelum
                </Typography>
                <Typography sx={{ color: "#4F618E", fontSize: "12px" }}>
                  {moment(detail?.createdAt)
                    .add(1, "day")
                    .format("dddd, DD MMMM YYYY, HH:MM")}
                </Typography>
              </Stack>
              <Button
                onClick={() => setBatalkan(true)}
                variant="outlined"
                sx={{ height: "30px", ml: "10px" }}
              >
                Batalkan
              </Button>

              {/* Modal Pembatalan */}
              <Dialog open={batalkan} onClose={() => setBatalkan(false)}>
                <DialogTitle>Alert!</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Apakah anda yakin Membatalkan Pesanan?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button variant="outlined" onClick={() => setBatalkan(false)}>
                    Kembali
                  </Button>
                  <Button
                    variant="contained"
                    onClick={async () => {
                      await declineHandler(transaksiId);
                      reRender();
                      setBatalkan(false);
                    }}
                    autoFocus
                  >
                    Yakin
                  </Button>
                </DialogActions>
              </Dialog>
              <Button
                onClick={() => router.push(`/detail-transaksi/${detail.id}`)}
                variant="contained"
                sx={{
                  ml: "5px",
                  "&:hover": { border: 0 },
                  width: "157px",
                  height: "30px",
                }}
              >
                Bayar Sekarang
              </Button>
            </Box>
          )}
          {status === "Dikirim" ? (
            <Button
              variant="contained"
              onClick={async () => {
                await finishHandler(transaksiId);
                reRender();
              }}
            >
              Selesaikan Pesanan
            </Button>
          ) : null}
        </Box>
      </Stack>
    </Stack>
  );
};

export default DaftarPemesanan;
