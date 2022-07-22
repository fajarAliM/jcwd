import { Modal, Box, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ModalBuktiPembayaran = ({ open, handleClose, gambarBuktiPembayaran }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "auto",
          height: "auto",
          maxHeight: "700px",
          bgcolor: "white",
          borderRadius: 2,
          boxShadow: 24,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          p: 3,
        }}
      >
        <Box display="flex" justifyContent="space-between" marginBottom="30px">
          <Typography fontSize="20px" fontWeight="bold">
            Bukti Pembayaran
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
        <Box overflow="auto">
          <img
            alt="Bukti Pembayaran"
            src={gambarBuktiPembayaran}
            width="400px"
            height="auto"
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalBuktiPembayaran;
