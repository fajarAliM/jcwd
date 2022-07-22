import {
  Alert,
  Box,
  Button,
  Divider,
  Modal,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import axiosInstance from "config/api";
import { useRouter } from "next/router";

const ModalUploadPembayaran = ({
  openModal,
  handleCloseModal,
  transaksiId,
  metodePembayaranId,
  totalPembayaran,
}) => {
  const [buktiPembayaranFile, setBuktiPembayaranFile] = useState(null);
  const [buktiPembayaranPreview, setBuktiPembayaranPreview] = useState();
  const [showAlertNoFileSelected, setShowAlertNoFileSelected] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const onDrop = useCallback((acceptedFiles) => {
    setBuktiPembayaranFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      "image/*": [".jpeg", ".png"],
    },
    disabled: buktiPembayaranFile,
    noClick: true,
    noKeyboard: true,
    maxSize: 10485786,
  });

  useEffect(() => {
    if (buktiPembayaranFile === null) {
      setBuktiPembayaranPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(buktiPembayaranFile);
    setBuktiPembayaranPreview(objectUrl);

    // function to unset the url
    // free memory when ever this component is unmounted
    // eslint-disable-next-line consistent-return
    return () => URL.revokeObjectURL(objectUrl);
  }, [buktiPembayaranFile]);

  const uploadButtonHander = async () => {
    try {
      if (!buktiPembayaranFile) {
        setShowAlertNoFileSelected(true);
        return;
      }

      const formData = new FormData();

      formData.append("transactionListId", transaksiId);
      formData.append("payment_image_file", buktiPembayaranFile);
      formData.append("paymentMethodId", metodePembayaranId);
      formData.append("totalPrice", totalPembayaran);

      const res = await axiosInstance.post(
        "/transaction/upload-proof-of-payment",
        formData
      );

      setBuktiPembayaranFile(null);
      setBuktiPembayaranPreview();
      handleCloseModal();

      enqueueSnackbar(res?.data?.message, { variant: "success" });
      router.push("/proses-pemesanan");
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      enqueueSnackbar(err?.response?.data?.message, { variant: "error" });
    }
  };

  return (
    <>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "500px",
            height: "500px",
            bgcolor: "white",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Typography variant="h5">Upload Bukti Pembayaran</Typography>
          <Box
            {...getRootProps()}
            height="100%"
            width="100%"
            border="1px dashed black"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            borderRadius="8px"
            sx={{ backgroundColor: "#E9EFF1" }}
            marginY="25px"
          >
            {buktiPembayaranPreview ? (
              <Image
                src={buktiPembayaranPreview}
                width="2000px"
                height="1500px"
                alt={buktiPembayaranFile.name}
              />
            ) : (
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <input {...getInputProps()} />
                <Typography variant="h5" color="#B4B9C7">
                  Tarik & Letakan File
                </Typography>
                <Divider
                  sx={{ width: "200px", my: "32px", color: "#B4B9C7" }}
                  textAlign="center"
                >
                  atau
                </Divider>
                <Button
                  onClick={open}
                  variant="contained"
                  sx={{ width: "274px", mt: "5px", height: "48px" }}
                >
                  Select File
                </Button>
              </Box>
            )}
          </Box>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Button
              variant="outlined"
              sx={{ width: "100px" }}
              onClick={() => {
                handleCloseModal();
                setBuktiPembayaranFile(null);
                setBuktiPembayaranPreview();
              }}
            >
              Batal
            </Button>
            <Button
              variant="contained"
              sx={{ width: "100px" }}
              onClick={uploadButtonHander}
              disabled={!buktiPembayaranFile}
            >
              Upload
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Snackbar
        open={showAlertNoFileSelected}
        autoHideDuration={6000}
        onClose={() => setShowAlertNoFileSelected(false)}
      >
        <Alert
          onClose={() => setShowAlertNoFileSelected(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          No File Selected!
        </Alert>
      </Snackbar>
    </>
  );
};

export default ModalUploadPembayaran;
