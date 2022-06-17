import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";

const RoundedInput = styled(OutlinedInput)({
  borderRadius: "8px",
});

const Alamat = () => {
  return (
    <Box
      justifyContent="center"
      display="flex"
      flexDirection="column"
      alignItems="center"
      my="80px"
    >
      <Box>
        <Typography variant="h4" component="h5" fontWeight="bold">
          Alamat Pengiriman
        </Typography>
        <Box width="616px" mt="50px">
          <Box>
            <Box display="flex" alignItems="baseline" mb="16px">
              <Typography variant="h6" mr="6px" fontWeight="bold">
                Label Alamat
              </Typography>
              <Typography ml="6px" fontSize="14px" color="#B4B9C7">
                Contoh: Apartemen
              </Typography>
            </Box>
            <RoundedInput fullWidth autoFocus />
          </Box>
          <Box mt="52px">
            <Typography variant="h6" fontWeight="bold">
              Info Penerima
            </Typography>
            <Box display="flex">
              <Box mt="36px" width="50%" paddingRight="15px">
                <Typography fontSize="14px" color="#737A8D" mb="16px">
                  Nama Depan
                </Typography>
                <RoundedInput fullWidth />
              </Box>
              <Box mt="36px" width="50%">
                <Typography fontSize="14px" color="#737A8D" mb="16px">
                  Nama Belakang
                </Typography>
                <RoundedInput fullWidth />
              </Box>
            </Box>
            <Box mt="36px">
              <Typography fontSize="14px" color="#737A8D" mb="16px">
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
            <Box display="flex">
              <Box mt="36px" width="50%" paddingRight="15px">
                <Typography fontSize="14px" color="#737A8D" mb="16px">
                  Provinsi
                </Typography>
                {/* ganti jadi select, tembak ke api */}
                <Select fullWidth sx={{ borderRadius: "8px" }}>
                  <MenuItem>test1</MenuItem>
                  <MenuItem>test2</MenuItem>
                  <MenuItem>test3</MenuItem>
                </Select>
              </Box>
              <Box mt="36px" width="50%">
                <Typography fontSize="14px" color="#737A8D" mb="16px">
                  Kota/Kabupaten
                </Typography>
                {/* ganti jadi select, tembak ke api */}
                <Select fullWidth sx={{ borderRadius: "8px" }}>
                  <MenuItem>test1</MenuItem>
                  <MenuItem>test2</MenuItem>
                  <MenuItem>test3</MenuItem>
                </Select>
              </Box>
            </Box>
            <Box mt="36px" width="50%" paddingRight="15px">
              <Typography fontSize="14px" color="#737A8D" mb="16px">
                Kecamatan
              </Typography>
              <Select fullWidth sx={{ borderRadius: "8px" }}>
                <MenuItem>test1</MenuItem>
                <MenuItem>test2</MenuItem>
                <MenuItem>test3</MenuItem>
              </Select>
            </Box>
            <Box mt="36px">
              <Typography fontSize="14px" color="#737A8D" mb="16px">
                Alamat
              </Typography>
              <RoundedInput fullWidth />
            </Box>
            <Box mt="36px" width="50%" paddingRight="15px">
              <Typography fontSize="14px" color="#737A8D" mb="16px">
                Kode Pos
              </Typography>
              <RoundedInput fullWidth />
            </Box>
          </Box>
        </Box>
        <Box mt="36px">
          <FormControlLabel
            control={<Checkbox defaultChecked color="default" />}
            label="Simpan sebagai alamat utama"
          />
        </Box>
        <Box display="flex" mt="68px">
          <Button
            variant="outlined"
            sx={{
              width: "50%",
              height: "52px",
              marginRight: "8px",
            }}
          >
            Batalkan
          </Button>
          <Link href="checkout">
            <Button
              variant="contained"
              sx={{
                width: "50%",
                height: "52px",
                marginLeft: "8px",
              }}
            >
              Simpan Alamat
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Alamat;
