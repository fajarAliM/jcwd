/* eslint-disable no-nested-ternary */
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
  Stack,
  Divider,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Kursiplastik from "public/Images/kursiplastik.png";
import Image from "next/image";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ChatIcon from "@mui/icons-material/Chat";
import ReceiptIcon from "@mui/icons-material/Receipt";

const CardOrder = ({
  status,
  orderCode,
  orderTime,
  expiredResponse,
  productImage,
  isObatResep = false,
  productName,
  productQty,
  productPrice,
  productOrderQty,
  buyersName,
  buyersAddress,
  courier,
  totalPrice,
}) => {
  // Status: "Pesanan Baru", "Dalam Pengiriman", "Siap Dikirim", "Pesanan Selesai", "Pesanan Dibatalkan"
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
          backgroundColor: "white",
        }}
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
            <FormControlLabel sx={{ marginRight: 0 }} control={<Checkbox />} />
            <Typography sx={{ fontWeight: "bold" }}>{status}</Typography>
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
            <Typography sx={{ color: "gray" }}>{orderTime}</Typography>
          </Box>

          {/* Countdown Box */}
          {status === "Dalam Pengiriman" ||
          status === "Pesanan Selesai" ||
          status === "Pesanan Dibatalkan" ? null : (
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
                <Typography>{expiredResponse}</Typography>
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
            <Stack direction="row">
              <Box
                sx={{
                  height: "75px",
                  width: "75px",
                  borderRadius: "5px",
                  border: "1px solid #B4B9C7",
                }}
              >
                <Image src={productImage || Kursiplastik} layout="responsive" />
              </Box>

              {/* Box Product Title, Qty, etc */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginX: "20px",
                }}
              >
                {isObatResep ? (
                  <>
                    <Typography sx={{ fontSize: "14px", fontWeight: "bolder" }}>
                      Resep Dokter
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{
                        maxHeight: "32px",
                        fontSize: "12px",
                      }}
                    >
                      Buat Salinan Resep
                    </Button>
                  </>
                ) : (
                  <>
                    <Typography sx={{ fontSize: "14px", fontWeight: "bolder" }}>
                      {productName}
                    </Typography>
                    <Typography sx={{ fontSize: "14px", color: "gray" }}>
                      {productQty} x {productPrice}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        color: "Brand.500",
                      }}
                    >
                      <Typography sx={{ fontSize: "12px" }}>
                        lihat {productOrderQty} obat lainnya
                      </Typography>
                      <KeyboardArrowDownIcon sx={{ size: "12px" }} />
                    </Box>
                  </>
                )}
              </Box>
            </Stack>
            <Divider orientation="vertical" />
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

        {/* Total Harga */}
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
            <Typography sx={{ fontSize: "12px", fontWeight: "bold" }}>
              ({productQty} Obat)
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "bold",
              marginRight: "8px",
            }}
          >
            Rp {totalPrice},-
          </Typography>
        </Box>

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
            {status === "Siap Dikirim" ? (
              <Button variant="contained">Minta Penjemputan</Button>
            ) : status === "Dalam Pengiriman" ? (
              <Button variant="contained">Lihat Rincian</Button>
            ) : status === "Pesanan Baru" ? (
              <>
                <Button sx={{ color: "Brand.500" }}>Tolak Pesanan</Button>
                <Button variant="contained">Terima Pesanan</Button>
              </>
            ) : null}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CardOrder;
