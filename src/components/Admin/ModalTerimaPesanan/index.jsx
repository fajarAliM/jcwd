import { Modal, Typography, Box, Divider, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";
import Image from "next/image";
import Group8725 from "public/Images/Group8725.png";

const ModalTerimaPesanan = ({
  open,
  handleClose,
  namaPembeli,
  kodeOrder,
  waktuOrder,
  namaProduk,
  jumlahProduk,
  hargaProduk,
  jumlahProdukOrder,
  totalHarga,
}) => {
  const [terimaPesanan, setTerimaPesanan] = useState(false);

  const isTerima = () => {
    setTerimaPesanan(true);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      {terimaPesanan ? (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "480px",
            height: "412px",
            bgcolor: "white",
            borderRadius: 2,
            boxShadow: 24,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            p: 3,
          }}
        >
          <Box display="flex" justifyContent="flex-end">
            <CloseIcon
              onClick={handleClose}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            />
          </Box>
          <Box
            width="100%"
            height="100%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Image src={Group8725} />
            <Typography
              sx={{
                marginTop: "20px",
                fontSize: "16px",
                color: "Brand.500",
                fontWeight: "bold",
              }}
            >
              Pesanan Berhasil Diproses
            </Typography>
            <Typography sx={{ color: "Brand.300", fontSize: "12px" }}>
              Silahkan ajukan pengambilan barang di halaman pengiriman
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "792px",
            height: "407px",
            bgcolor: "white",
            borderRadius: 2,
            boxShadow: 24,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Box 1 */}
          <Box sx={{ p: 3 }}>
            <Box display="flex" justifyContent="flex-end">
              <CloseIcon
                onClick={handleClose}
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              />
            </Box>

            <Typography textAlign="center" fontSize="20px" fontWeight="bold">
              Terima Pesanan
            </Typography>
            <Typography textAlign="center" fontSize="14px">
              Stok akan berkurang secara otomatis setelah pesanan diproses
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              flexDirection="row"
              marginTop="30px"
              marginBottom="10px"
            >
              <Typography sx={{ fontWeight: "bold", fontSize: "12px" }}>
                {namaPembeli}
              </Typography>
              <Typography
                sx={{
                  color: "Sidebar.700",
                  marginLeft: "10px",
                  fontSize: "12px",
                }}
              >
                /
              </Typography>
              <Typography
                sx={{
                  fontWeight: "bold",
                  marginLeft: "10px",
                  fontSize: "12px",
                }}
              >
                {kodeOrder}
              </Typography>
              <Typography
                sx={{
                  color: "Sidebar.700",
                  marginLeft: "10px",
                  fontSize: "12px",
                }}
              >
                /
              </Typography>

              <Typography
                sx={{ color: "gray", marginLeft: "10px", fontSize: "12px" }}
              >
                {waktuOrder}
              </Typography>
            </Box>
            <Typography fontSize="14px" fontWeight="bold">
              {namaProduk}
            </Typography>
            <Typography sx={{ fontSize: "12px", color: "gray" }}>
              {jumlahProduk} x {hargaProduk}
            </Typography>
            <Box
              sx={{
                marginTop: "11px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                color: "Brand.500",
              }}
            >
              <Typography sx={{ fontSize: "12px" }}>
                lihat {jumlahProdukOrder} obat lainnya
              </Typography>
              <KeyboardArrowDownIcon sx={{ size: "12px" }} />
            </Box>
          </Box>

          {/* Box 2 */}
          <Box>
            {/* Total Harga */}
            <Box sx={{ p: 3 }}>
              <Box
                sx={{
                  borderRadius: "5px",
                  backgroundColor: "#faf0e8",
                  padding: "8px",
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
                      fontSize: "14px",
                      fontWeight: "bold",
                      marginRight: "8px",
                    }}
                  >
                    Total Harga
                  </Typography>
                  <Typography sx={{ fontSize: "10px", fontWeight: "bold" }}>
                    ({jumlahProduk} Obat)
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    marginRight: "8px",
                  }}
                >
                  Rp {totalHarga},-
                </Typography>
              </Box>
            </Box>
            <Divider orientation="horizontal" />
            <Box display="flex" justifyContent="flex-end" padding="16px">
              <Button onClick={isTerima} variant="contained">
                Terima Pesanan
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Modal>
  );
};

export default ModalTerimaPesanan;
