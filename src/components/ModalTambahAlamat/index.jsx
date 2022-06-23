import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  InputAdornment,
  MenuItem,
  Select,
  OutlinedInput,
  Typography,
  Modal,
  Divider,
} from "@mui/material";
import Link from "next/link";
import { styled } from "@mui/material/styles";

const RoundedInput = styled(OutlinedInput)({
  borderRadius: "8px",
  height: "32px",
});

const ModalTambahAlamat = ({ open, handleClose }) => {
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
          bgcolor: "white",
          borderRadius: 2,
          boxShadow: 24,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "auto",
        }}
      >
        {/* Box Heading */}
        <Box padding={3}>
          <Box display="flex" justifyContent="space-between">
            <Typography fontSize="20px" fontWeight="bold">
              Tambah Alamat
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
        </Box>
        <Box padding={3}>
          <Box>
            <Box>
              <Box display="flex" alignItems="baseline">
                <Typography mr="6px" fontWeight="bold">
                  Label Alamat
                </Typography>
                <Typography ml="6px" fontSize="14px" color="#B4B9C7">
                  Contoh: Apartemen
                </Typography>
              </Box>
              <RoundedInput fullWidth autoFocus />
            </Box>
            <Divider />
            <Box>
              <Typography fontWeight="bold" marginY="10px">
                Info Penerima
              </Typography>
              <Box display="flex" marginBottom="10px">
                <Box width="50%" paddingRight="15px">
                  <Typography fontSize="14px" color="#737A8D">
                    Nama Depan
                  </Typography>
                  <RoundedInput fullWidth />
                </Box>
                <Box width="50%">
                  <Typography fontSize="14px" color="#737A8D">
                    Nama Belakang
                  </Typography>
                  <RoundedInput fullWidth />
                </Box>
              </Box>
              <Box marginBottom="10px">
                <Typography fontSize="14px" color="#737A8D">
                  Nomor HP
                </Typography>
                {/* input no tlpon diganti pke library */}
                <RoundedInput
                  startAdornment={
                    <InputAdornment position="start">+62</InputAdornment>
                  }
                  sx={{
                    width: "510px",
                  }}
                />
              </Box>
              <Box display="flex" marginBottom="10px">
                <Box width="50%" paddingRight="15px">
                  <Typography fontSize="14px" color="#737A8D">
                    Provinsi
                  </Typography>
                  {/* ganti jadi select, tembak ke api */}
                  <Select
                    fullWidth
                    sx={{ borderRadius: "8px", height: "32px" }}
                  >
                    <MenuItem>test1</MenuItem>
                    <MenuItem>test2</MenuItem>
                    <MenuItem>test3</MenuItem>
                  </Select>
                </Box>
                <Box width="50%">
                  <Typography fontSize="14px" color="#737A8D">
                    Kota/Kabupaten
                  </Typography>
                  {/* ganti jadi select, tembak ke api */}
                  <Select
                    fullWidth
                    sx={{ borderRadius: "8px", height: "32px" }}
                  >
                    <MenuItem>test1</MenuItem>
                    <MenuItem>test2</MenuItem>
                    <MenuItem>test3</MenuItem>
                  </Select>
                </Box>
              </Box>
              <Box width="50%" paddingRight="15px" marginBottom="10px">
                <Typography fontSize="14px" color="#737A8D">
                  Kecamatan
                </Typography>
                <Select fullWidth sx={{ borderRadius: "8px", height: "32px" }}>
                  <MenuItem>test1</MenuItem>
                  <MenuItem>test2</MenuItem>
                  <MenuItem>test3</MenuItem>
                </Select>
              </Box>
              <Box marginBottom="10px">
                <Typography fontSize="14px" color="#737A8D">
                  Alamat
                </Typography>
                <RoundedInput fullWidth />
              </Box>
              <Box width="50%" paddingRight="15px" marginBottom="10px">
                <Typography fontSize="14px" color="#737A8D">
                  Kode Pos
                </Typography>
                <RoundedInput fullWidth />
              </Box>
            </Box>
          </Box>
          <Divider sx={{ marginY: "10px" }} />
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="outlined"
              sx={{
                marginRight: "5px",
              }}
              onClick={handleClose}
            >
              Batalkan
            </Button>
            <Link href="checkout">
              <Button variant="contained">Simpan Alamat</Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalTambahAlamat;
