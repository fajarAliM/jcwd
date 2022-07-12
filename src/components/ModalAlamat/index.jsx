import { Box, Modal, Stack, Typography } from "@mui/material";
import axiosInstance from "config/api";
import { useEffect, useState } from "react";

const ModalAlamat = ({ open, handleClose, setSelectedAddress }) => {
  const [alamat, setAlamat] = useState(null);
  const alamatHandler = (value) => {
    setSelectedAddress(value);
  };
  const fetchAlamat = async () => {
    try {
      const dataAlamat = await axiosInstance.get("/address/get-all-address");
      setAlamat(dataAlamat.data.result.rows);
    } catch (err) {
      console.log(err);
    }
  };

  const renderAlamat = () => {
    return alamat?.map((val) => {
      return (
        <Box
          onClick={() => alamatHandler(val)}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            borderBottom: "1px solid #D5D7DD",
            marginBottom: "10px",
            paddingY: "5px",
            ":hover": {
              cursor: "pointer",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "60%",
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "16px",
              }}
            >
              {val.label_alamat}
            </Typography>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: "14px",
              }}
            >
              {val.nama_penerima}
            </Typography>
          </Box>
          <Typography>
            {val.alamat_lengkap.length > 50
              ? `${val.alamat_lengkap.slice(0, 49)}...`
              : val.alamat_lengkap}
          </Typography>
        </Box>
      );
    });
  };

  useEffect(() => {
    fetchAlamat();
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
          height: "300px",
          bgcolor: "white",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          overflowY: "scroll",
        }}
      >
        <Stack>
          <Typography
            sx={{
              alignSelf: "center",
              fontWeight: 700,
              fontSize: "20px",
              mb: "10px",
            }}
          >
            Pilih Alamat
          </Typography>
          {renderAlamat()}
        </Stack>
      </Box>
    </Modal>
  );
};

export default ModalAlamat;
