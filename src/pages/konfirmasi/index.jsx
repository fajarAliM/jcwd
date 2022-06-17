import {
  Box,
  Button,
  Collapse,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import CheckOutCard from "components/CheckOut";
import Image from "next/image";
import { RiFileCopyFill } from "react-icons/ri";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import BCA from "../../public/Images/BCA.png";
import { useState } from "react";
import Link from "next/link";
import Timer from "components/Timer";

const Konfirmasi = () => {
  const [bca, setBca] = useState(false);
  const openBca = () => setBca(true);
  const closeBca = () => setBca(false);
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
              Jumat, 17 Juni 2022, 20:45 PM
            </Typography>
          </Stack>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Timer />
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
            <CheckOutCard />
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
                  Rp 75.000
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
                BCA Virtual Account
              </Typography>
              <Image src={BCA} />
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
                Rp 25.000
              </Typography>
            </Stack>
          </Stack>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: "40px",
              borderBottom: "2px solid #D5D7DD",
              paddingBottom: "84px",
            }}
          >
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
              ATM BCA
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
              ATM BCA
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
            <Typography>1. Masukkan Kartu ATM BCA & PIN.</Typography>
            <Typography>
              2. Pilih menu Transaksi Lainnya > Transfer > ke Rekening BCA
              Virtual Account.
            </Typography>
            <Typography>
              3. Masukkan 5 angka kode perusahaan untuk Tokopedia (80777) dan
              Nomor HP yang kamu daftarkan di akun Tokopedia (Contoh:
              80777081316951940).
            </Typography>
            <Typography>
              4. Di halaman konfirmasi, pastikan detil pembayaran sudah sesuai
              seperti No VA, Nama, Perus/Produk dan Total Tagihan.
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
