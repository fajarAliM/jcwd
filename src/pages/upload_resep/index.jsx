/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import {
  Box,
  Typography,
  Divider,
  Button,
  Backdrop,
  Stack,
} from "@mui/material";
import axiosInstance from "config/api";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import ModalAlamat from "components/ModalAlamat";

const { default: DragAndDrop } = require("components/DragAndDropZone");

const UploadResep = () => {
  const router = useRouter();
  const [resepImgFile, setResepImgFile] = useState(null);
  const [resepImgUrl, setResepImgUrl] = useState(undefined);
  const [preview, setPreview] = useState();
  const [open, setOpen] = useState(false);
  const [openAlamat, setOpenAlamat] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleOpenAlamat = () => setOpenAlamat(true);
  const handleCloseAlamat = () => setOpenAlamat(false);

  const onDrop = useCallback((acceptedFiles) => {
    setResepImgFile(acceptedFiles[0]);
    setResepImgUrl(acceptedFiles[0]?.name);
  }, []);

  useEffect(() => {
    if (!resepImgFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(resepImgFile);
    setPreview(objectUrl);

    // eslint-disable-next-line consistent-return
    return () => URL.revokeObjectURL(objectUrl);
  }, [resepImgFile]);

  const handleBackDrop = () => {
    setOpen(true);
  };

  const uploadFileHandler = async () => {
    const formData = new FormData();

    formData.append("resep_image_file", resepImgFile);
    formData.append("addressId", selectedAddress.id);

    try {
      await axiosInstance.post("/transaction/upload-resep", formData);

      handleBackDrop();
      setTimeout(async () => {
        setResepImgFile(null);
        setOpen(false);
        router.push("/unggah-resep-berhasil");
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Box paddingX="250px">
      <Typography mt="54px" fontWeight="bold" variant="h4">
        Kirim Resep
      </Typography>
      <Box display="flex" mt="8px">
        <Typography>
          Tak perlu antre & obat langsung dikirimkan ke lokasi anda!
        </Typography>
        <Typography fontWeight="bold" marginLeft="5px">
          Foto tidak boleh lebih dari 10 MB.
        </Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        mt="38px"
        boxShadow={2}
        paddingY="28px"
        paddingX="66px"
        borderRadius="16px"
      >
        <Typography color="#737A8D">Unggah Resep Dokter</Typography>
        <Divider sx={{ my: "22px" }} />
        <DragAndDrop
          onDrop={onDrop}
          resepImgUrl={resepImgUrl}
          resepImgFile={resepImgFile}
          preview={preview}
          setResepImgFile={setResepImgFile}
          setResepImgUrl={setResepImgUrl}
        />
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: 5 }}
        >
          <Box display="flex">
            <Stack>
              <Typography
                sx={{
                  mb: 2,
                  pb: "10px",
                  borderBottom: "1px solid #D5D7DD",
                  color: "#737A8D",
                }}
              >
                Alamat Pengiriman:
              </Typography>
              <Typography>{selectedAddress?.nama_penerima}</Typography>
              <Typography>{selectedAddress?.no_telepon_penerima}</Typography>
              <Typography>{selectedAddress?.label_alamat}</Typography>
              <Typography>{selectedAddress?.alamat_lengkap}</Typography>
              <Button
                variant="contained"
                onClick={handleOpenAlamat}
                sx={{
                  alignSelf: "flex-end",
                  mt: "5px",
                  "&:hover": { border: 0 },
                }}
              >
                {!selectedAddress ? "Pilih Alamat" : "Pilih Alamat Lain"}
              </Button>
              <ModalAlamat
                open={openAlamat}
                handleClose={handleCloseAlamat}
                setSelectedAddress={setSelectedAddress}
              />
            </Stack>
          </Box>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            mt="38px"
            ml="10px"
          >
            <Button
              variant="outlined"
              sx={{ marginRight: "10px", width: "125px", height: "42px" }}
            >
              Batal
            </Button>
            <Button
              onClick={() => {
                uploadFileHandler();
              }}
              variant="contained"
              sx={{ width: "125px", height: "42px" }}
            >
              Unggah
            </Button>
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={open}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UploadResep;
