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
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const ModalUploadPembayaran = ({ openProps }) => {
  const [openModal, setOpenModal] = useState(openProps);
  const [buktiPembayaranFile, setBuktiPembayaranFile] = useState(null);
  const [buktiPembayaranPreview, setBuktiPembayaranPreview] = useState();
  const [showAlertNoFileSelected, setShowAlertNoFileSelected] = useState(false);

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

  const handleCloseModal = () => {
    setOpenModal(false);
  };

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

  const uploadButtonHander = () => {
    if (!buktiPembayaranFile) {
      setShowAlertNoFileSelected(true);
      // return; hrus dinyalain klo udah ada fuction dibawah
    }

    // ini send file ke API
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
          <Typography variant="h5">Upload bukti Pembayaran</Typography>
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
                width="100%"
                height="100%"
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
              onClick={handleCloseModal}
            >
              Batal
            </Button>
            <Button
              variant="contained"
              sx={{ width: "100px" }}
              onClick={uploadButtonHander}
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
