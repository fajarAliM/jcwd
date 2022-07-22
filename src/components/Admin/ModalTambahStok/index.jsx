/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable camelcase */
import {
  Modal,
  Typography,
  Box,
  Divider,
  Button,
  FormControl,
  FormLabel,
  OutlinedInput,
  Grid,
  TextField,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Group8729 from "public/Images/Group8729.png";
import axiosInstance from "config/api";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { useFormik } from "formik";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { nanoid } from "nanoid";

const ModalTambahStok = ({ open, handleClose, data, dataUpdated }) => {
  const [activeStep, setActiveStep] = useState(1);

  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      jumlah_stok: 0,
      exp_date: "",
      price: 0,
    },
    validationSchema: Yup.object().shape({
      jumlah_stok: Yup.number().min(1),
      exp_date: Yup.date(),
      price: Yup.number().min(1),
    }),
    validateOnChange: true,
    onSubmit: async (values) => {
      try {
        const productInfo = {
          jumlah_stok: values.jumlah_stok,
          exp_date: values.exp_date,
          price: values.price,
          productId: data.productId,
        };
        const res = await axiosInstance.post("/admin/stock", productInfo);
        enqueueSnackbar(res?.data?.message, { variant: "success" });
        setActiveStep(3);
        dataUpdated(nanoid(64));
        formik.setFieldValue("jumlah_stok", 0);
        formik.setFieldValue("exp_date", "");
        formik.setFieldValue("price", 0);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
        enqueueSnackbar(err?.response?.data?.message, { variant: "error" });
      }
    },
  });

  return (
    <Modal
      open={open}
      onClose={() => {
        handleClose();
        setActiveStep(1);
      }}
    >
      {activeStep === 3 ? (
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
              onClick={() => {
                handleClose();
                setActiveStep(1);
              }}
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
            <Image src={Group8729} />
            <Typography
              sx={{
                marginTop: "20px",
                fontSize: "16px",
                color: "Brand.500",
                fontWeight: "bold",
              }}
            >
              Stok Produk Berhasil Ditambahkan!
            </Typography>
            <Typography sx={{ color: "Brand.300", fontSize: "12px" }}>
              Jumlah stok diperbarui secara otomatis
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
            width: "700px",
            height: "auto",
            bgcolor: "white",
            borderRadius: 2,
            boxShadow: 24,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box padding={3}>
            {/* Box Heading */}
            <Box
              display="flex"
              justifyContent="space-between"
              marginBottom="30px"
            >
              <Typography fontSize="20px" fontWeight="bold">
                Tambah Stok
              </Typography>
              <CloseIcon
                onClick={() => {
                  handleClose();
                  formik.setFieldValue("jumlah_stok", 0);
                  formik.setFieldValue("exp_date", "");
                  formik.setFieldValue("price", 0);
                }}
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              />
            </Box>

            {/* Body Box */}
            <Box display="flex" flexDirection="column">
              <FormControl error={formik.errors.jumlah_stok}>
                <Grid container marginBottom="10px" alignItems="center">
                  <Grid item xs={3}>
                    <FormLabel
                      sx={{
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      Jumlah Stok
                    </FormLabel>
                  </Grid>
                  <Grid item xs={9}>
                    <OutlinedInput
                      type="number"
                      size="small"
                      placeholder="Masukkan Jumlah Stok"
                      value={formik.values.jumlah_stok}
                      onChange={(event) =>
                        formik.setFieldValue("jumlah_stok", event.target.value)
                      }
                    />
                  </Grid>
                </Grid>
              </FormControl>
              <FormControl error={formik.errors.price}>
                <Grid container marginBottom="10px" alignItems="center">
                  <Grid item xs={3}>
                    <FormLabel
                      sx={{
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      Harga Barang (Rp)
                    </FormLabel>
                  </Grid>
                  <Grid item xs={9}>
                    <OutlinedInput
                      type="number"
                      size="small"
                      placeholder="Masukkan Barang Per Item"
                      value={formik.values.price}
                      onChange={(event) =>
                        formik.setFieldValue("price", event.target.value)
                      }
                    />
                  </Grid>
                </Grid>
              </FormControl>
              <FormControl error={formik.errors.exp_date}>
                <Grid container marginBottom="10px" alignItems="center">
                  <Grid item xs={3}>
                    <FormLabel
                      sx={{
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      Tgl. Kadaluwarsa
                    </FormLabel>
                  </Grid>
                  <Grid item xs={9}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        value={formik.values.exp_date}
                        onChange={(newValue) => {
                          formik.setFieldValue("exp_date", newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} size="small" />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>
                </Grid>
              </FormControl>
            </Box>
          </Box>

          <Box>
            <Divider orientation="horizontal" />
            <Box display="flex" justifyContent="flex-end" padding="16px">
              <Button
                onClick={formik.handleSubmit}
                disabled={!(formik.isValid && formik.dirty)}
                variant="contained"
              >
                Simpan
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Modal>
  );
};

export default ModalTambahStok;
