/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
import { Box, Button, Modal, Stack, Typography } from "@mui/material";
// import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useEffect, useState } from "react";
import PaymentMethod from "components/PaymentMethod";
import axiosInstance from "config/api";
import { styled } from "@mui/material/styles";

const Image = styled("img")({
  width: "85px",
  height: "20px",
  objectFit: "scale-down",
});

const ModalIsi = ({ open, handleClose, total, setMethod }) => {
  const [payment, setPayment] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [bca, setBca] = useState(false);
  const openBca = () => setBca(true);
  const closeBca = () => setBca(false);

  const fetchMethods = async () => {
    try {
      const methodsData = await axiosInstance.get(
        "/transaction/get-payment-method"
      );
      setPayment(methodsData.data.result.rows);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = (value) => {
    setSelectedMethod(value);
    setMethod(value);
  };

  const title = () => {
    if (selectedMethod === 1) {
      return "BCA Transfer Bank";
    } else if (selectedMethod === 2) {
      return "Mandiri Transfer Bank";
    } else if (selectedMethod === 3) {
      return "BNI Transfer Bank";
    }
  };

  const logo = () => {
    if (selectedMethod === 1) {
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/2560px-Bank_Central_Asia.svg.png";
    } else if (selectedMethod === 2) {
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Bank_Mandiri_logo_2016.svg/1200px-Bank_Mandiri_logo_2016.svg.png";
    } else if (selectedMethod === 3) {
      return "https://i.pinimg.com/600x315/07/16/e8/0716e89ab3736d1927c9f806a57d2888.jpg";
    }
  };

  const renderMethods = () => {
    return payment?.map((val) => {
      return (
        <Box onClick={() => handleClick(val?.id)}>
          <PaymentMethod
            id={val?.id}
            image={val?.logo}
            method={val?.nama_metode}
            openBca={openBca}
          />
        </Box>
      );
    });
  };

  useEffect(() => {
    fetchMethods();
  }, []);
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "500px",
          height: "650px",
          bgcolor: "white",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        {!bca ? (
          <>
            <CloseIcon
              onClick={handleClose}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            />
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "20px",
                textAlign: "center",
                mb: "24px",
              }}
            >
              Metode Pembayaran
            </Typography>
          </>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <ArrowBackIosIcon
              onClick={closeBca}
              sx={{ "&:hover": { cursor: "pointer" }, fontSize: "20px" }}
            />
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "20px",
                textAlign: "center",
                mb: "10px",
              }}
            >
              Metode Pembayaran
            </Typography>
            <CloseIcon
              onClick={handleClose}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            />
          </Box>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            border: "1px solid white",
            borderRadius: 3,
            boxShadow: "0 0 15px -10px black",
            p: 2,
          }}
        >
          <Stack>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: "14px",
                color: "#4F618E",
              }}
            >
              Total Harga
            </Typography>
            <Typography sx={{ fontWeight: 700, fontSize: "20px" }}>
              Rp {total().toLocaleString("id")}
            </Typography>
          </Stack>
          <Button
            sx={{
              color: "Brand.500",
              fontWeight: 700,
              fontSize: "14px",
            }}
          >
            Lihat Detail
          </Button>
        </Box>
        <Stack sx={{ borderTop: "2px solid #F5F6F9", mt: 5 }}>
          {!bca ? (
            <>{renderMethods()}</>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                paddingX: "20px",
                border: "1px solid white",
                borderRadius: 3,
                boxShadow: "0 0 15px -10px black",
                p: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: "18px",
                }}
              >
                <Typography sx={{ fontWeight: 700, fontSize: "16px" }}>
                  {title()}
                </Typography>
                <Image src={logo()} width="85px" height="20px" />
              </Box>
              <Typography
                sx={{ fontWeight: 700, fontSize: "14px", mt: "30px" }}
              >
                Cara Pembayaran
              </Typography>
              <Box
                sx={{
                  color: "#4F618E",
                  mt: "16px",
                }}
              >
                <Box sx={{ display: "flex", mb: "12px" }}>
                  <FiberManualRecordIcon sx={{ fontSize: "12px", mt: "5px" }} />
                  <Typography sx={{ fontSize: "14px", ml: "16px" }}>
                    Pilih opsi Transfer pada aplikasi m-banking Anda.
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", mb: "12px" }}>
                  <FiberManualRecordIcon sx={{ fontSize: "12px", mt: "5px" }} />
                  <Typography sx={{ fontSize: "14px", ml: "16px" }}>
                    Pilih bank tujuan, lalu masukkan nomor rekening penerima dan
                    nominal yang akan ditransfer.
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", mb: "12px" }}>
                  <FiberManualRecordIcon sx={{ fontSize: "12px", mt: "5px" }} />
                  <Typography sx={{ fontSize: "14px", ml: "16px" }}>
                    Masukkan pin anda. Tunggu proses transaksi. Anda akan
                    mendapat pemberitahuan apakah pengiriman saldo sukses atau
                    tidak.
                  </Typography>
                </Box>
                <Box sx={{ display: "flex" }}>
                  <FiberManualRecordIcon sx={{ fontSize: "12px", mt: "5px" }} />
                  <Typography sx={{ fontSize: "14px", ml: "16px" }}>
                    Simpan bukti transfer, lalu upload bukti transfer agar dapat
                    dikonfirmasi oleh admin.
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
          {bca ? (
            <Button
              onClick={handleClose}
              variant="contained"
              sx={{
                boxShadow: 0,
                height: "52px",
                mt: "20px",
                "&:hover": { border: 0, boxShadow: 0 },
              }}
            >
              Pilih Metode
            </Button>
          ) : (
            <Button
              disabled
              variant="contained"
              sx={{
                boxShadow: 0,
                height: "52px",
                mt: "32px",
                "&:hover": { border: 0, boxShadow: 0 },
              }}
            >
              Pilih Metode
            </Button>
          )}
        </Stack>
      </Box>
    </Modal>
  );
};

export default ModalIsi;
