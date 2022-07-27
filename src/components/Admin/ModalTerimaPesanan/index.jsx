import { Modal, Typography, Box, Divider, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import Image from "next/image";
import Group8725 from "public/Images/Group8725.png";
import axiosInstance from "config/api";
import moment from "moment";

const ModalTerimaPesanan = ({
  open,
  handleClose,
  namaPembeli,
  kodeOrder,
  waktuOrder,
  totalHarga,
  transaksiId,
  productsData = [],
  reRender,
}) => {
  const [terimaPesanan, setTerimaPesanan] = useState(false);

  const acceptTransaction = async (transactionId) => {
    try {
      await axiosInstance.post("/admin/accept-transaction", {
        transactionId,
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const acceptHandler = (value) => {
    setTerimaPesanan(true);
    acceptTransaction(value);
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
            maxHeight: "700px",
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
                {moment(waktuOrder).format("DD MMMM YYYY, HH:mm")}
              </Typography>
            </Box>
            {productsData.map((val) => {
              return (
                <Box marginTop="10px">
                  <Typography fontSize="14px" fontWeight="bold">
                    {val?.product?.nama_produk}
                  </Typography>
                  <Typography sx={{ fontSize: "12px", color: "gray" }}>
                    {val?.quantity} x{" "}
                    {val?.price_when_sold?.toLocaleString("id")}
                  </Typography>
                </Box>
              );
            })}
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
                    ({productsData?.length} Obat)
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    marginRight: "8px",
                  }}
                >
                  Rp {totalHarga.toLocaleString("id")}
                </Typography>
              </Box>
            </Box>
            <Divider orientation="horizontal" />
            <Box display="flex" justifyContent="flex-end" padding="16px">
              <Button
                onClick={async () => {
                  await acceptHandler(transaksiId);
                  reRender();
                }}
                variant="contained"
              >
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
