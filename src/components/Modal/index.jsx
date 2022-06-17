/* eslint-disable no-console */
import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import Image from "next/image";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useState } from "react";
import Link from "next/link";
import BCA from "../../public/Images/BCA.png";
import Gopay from "../../public/Images/Gopay.png";
import ShopeePay from "../../public/Images/ShopeePay.png";
import OVO from "../../public/Images/OVO.png";

const ModalIsi = ({ open, handleClose }) => {
  const [bca, setBca] = useState(false);
  const openBca = () => setBca(true);
  const closeBca = () => setBca(false);
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
                mb: "24px",
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
              Rp 75.000
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
            <>
              <Box
                onClick={openBca}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mt: "26px",
                  borderBottom: "2px solid #F5F6F9",
                  paddingBottom: "19px",
                  "&:hover": { cursor: "pointer" },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Image src={BCA} height="25px" width="86px" />
                  <Typography sx={{ ml: "34px" }}>
                    BCA Virtual Account
                  </Typography>
                </Box>
                <ArrowForwardIosIcon
                  onClick={openBca}
                  sx={{
                    fontSize: "18px",
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mt: "26px",
                  borderBottom: "2px solid #F5F6F9",
                  paddingBottom: "19px",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Image src={Gopay} height="25px" width="90px" />
                  <Typography sx={{ ml: "34px" }}>Gopay</Typography>
                </Box>
                <ArrowForwardIosIcon
                  sx={{
                    fontSize: "18px",
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mt: "10px",
                  borderBottom: "2px solid #F5F6F9",
                  paddingBottom: "14px",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Image src={ShopeePay} height="50px" width="90px" />
                  <Typography sx={{ ml: "34px" }}>ShopeePay</Typography>
                </Box>
                <ArrowForwardIosIcon
                  sx={{
                    fontSize: "18px",
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mt: "10px",
                  borderBottom: "2px solid #F5F6F9",
                  paddingBottom: "13px",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Image src={OVO} height="40px" width="70px" />
                  <Typography sx={{ ml: "34px" }}>OVO</Typography>
                </Box>
                <ArrowForwardIosIcon
                  sx={{
                    fontSize: "18px",
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                />
              </Box>
            </>
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
                  BCA Virtual Account
                </Typography>
                <Image src={BCA} width="85px" height="20px" />
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
                    Tagihan ini akan otomatis menggantikan tagihan BCA Virtual
                    Account yang belum terbayar.
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", mb: "12px" }}>
                  <FiberManualRecordIcon sx={{ fontSize: "12px", mt: "5px" }} />
                  <Typography sx={{ fontSize: "14px", ml: "16px" }}>
                    Tagihan ini akan otomatis menggantikan tagihan BCA Virtual
                    Account yang belum terbayar.
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", mb: "12px" }}>
                  <FiberManualRecordIcon sx={{ fontSize: "12px", mt: "5px" }} />
                  <Typography sx={{ fontSize: "14px", ml: "16px" }}>
                    Tagihan ini akan otomatis menggantikan tagihan BCA Virtual
                    Account yang belum terbayar.
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
          {bca ? (
            <Link href="/konfirmasi">
              <Button
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
            </Link>
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
