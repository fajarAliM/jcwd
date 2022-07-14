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
  Select,
  MenuItem,
  Tooltip,
} from "@mui/material";
import Image from "next/image";
import { useState, useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Group8729 from "public/Images/Group8729.png";
import axiosInstance from "config/api";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { useFormik } from "formik";

const ModalTambahObat = ({ open, handleClose, categories = [] }) => {
  const [activeStep, setActiveStep] = useState(1);
  const [files, setFiles] = useState([]);
  const [imageReview, setImageReview] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  const inputFile = useRef(null);

  const handleFile = (e) => {
    if (!files) {
      setFiles([e.target.files[0]]);
      enqueueSnackbar(e.target.files[0].name, {
        variant: "info",
      });
    } else {
      setFiles([...files, e.target.files[0]]);
      enqueueSnackbar(e.target.files[0].name, {
        variant: "info",
      });
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const file of e.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      if (!imageReview) {
        reader.onload = () => {
          setImageReview([reader.result]);
        };
      } else {
        reader.onload = () => {
          setImageReview((imgs) => [...imgs, reader.result]);
        };
      }
      reader.onerror = () => {
        // eslint-disable-next-line no-console
        console.log(reader.error);
      };
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      nama_produk: "",
      nomor_obat: "",
      nomor_bpom: "",
      kategori: "",
      satuan: "Box",
      diskon: 0,
      harga_jual: 0,
    },
    validationSchema: Yup.object().shape({
      nama_produk: Yup.string().required(),
      kategori: Yup.string().required(),
      nomor_obat: Yup.string().required(),
      nomor_bpom: Yup.string().required(),
      satuan: Yup.string().required(),
      harga_jual: Yup.number().min(1).required(),
      diskon: Yup.number(),
    }),
    validateOnChange: true,
  });

  const submitHandler = async () => {
    if (!files) {
      enqueueSnackbar("Select your Image First!", { variant: "warning" });
      return;
    }

    const formData = new FormData();
    const {
      nama_produk,
      nomor_obat,
      nomor_bpom,
      kategori,
      satuan,
      harga_jual,
      diskon,
    } = formik.values;

    if (!diskon) {
      // eslint-disable-next-line no-unused-expressions
      diskon === 0;
    }

    formData.append("nama_produk", nama_produk);
    formData.append("nomor_obat", nomor_obat);
    formData.append("nomor_bpom", nomor_bpom);
    formData.append("productCategoryId", kategori);
    formData.append("satuan", satuan);
    formData.append("harga_jual", harga_jual);
    formData.append("diskon", diskon);
    Object.values(files).forEach((file) => {
      formData.append("product_image_file", file);
    });

    try {
      const res = await axiosInstance.post("/admin/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setFiles([]);
      setImageReview([]);
      enqueueSnackbar(res?.data?.message, { variant: "success" });
      setActiveStep(3);

      formik.setFieldValue("nama_produk", formik.initialValues.nama_produk);
      formik.setFieldValue("nomor_obat", formik.initialValues.nomor_obat);
      formik.setFieldValue("nomor_bpom", formik.initialValues.nomor_bpom);
      formik.setFieldValue("productCategoryId", "");
      formik.setFieldValue("satuan", "Box");
      formik.setFieldValue("kategori", "");
      formik.setFieldValue("harga_jual", formik.initialValues.harga_jual);
      formik.setFieldValue("diskon", formik.initialValues.diskon);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      enqueueSnackbar(err?.response?.data?.message, { variant: "error" });
    }
  };

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
            overflow: "auto",
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
              Obat Berhasil Ditambahkan!
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
            width: "792px",
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
                Tambah Obat
              </Typography>
              <CloseIcon
                onClick={() => {
                  handleClose();
                  formik.setFieldValue(
                    "nama_produk",
                    formik.initialValues.nama_produk
                  );
                  formik.setFieldValue(
                    "nomor_obat",
                    formik.initialValues.nomor_obat
                  );
                  formik.setFieldValue(
                    "nomor_bpom",
                    formik.initialValues.nomor_bpom
                  );
                  formik.setFieldValue("productCategoryId", "");
                  formik.setFieldValue("satuan", "Box");
                  formik.setFieldValue("kategori", "");
                  formik.setFieldValue(
                    "harga_jual",
                    formik.initialValues.harga_jual
                  );
                  formik.setFieldValue("diskon", formik.initialValues.diskon);
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
              <FormControl error={formik.errors.nama_produk}>
                <Grid container marginBottom="10px" alignItems="center">
                  <Grid item xs={3}>
                    <FormLabel
                      sx={{
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      Nama Obat
                    </FormLabel>
                  </Grid>
                  <Grid item xs={9}>
                    <OutlinedInput
                      onChange={(event) =>
                        formik.setFieldValue("nama_produk", event.target.value)
                      }
                      size="small"
                      placeholder="Masukkan nama obat"
                      value={formik.values.nama_produk}
                    />
                  </Grid>
                </Grid>
              </FormControl>
              <FormControl error={formik.errors.nomor_obat}>
                <Grid container marginBottom="10px" alignItems="center">
                  <Grid item xs={3}>
                    <FormLabel
                      sx={{
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      No. Obat
                    </FormLabel>
                  </Grid>
                  <Grid item xs={9}>
                    <OutlinedInput
                      size="small"
                      placeholder="Masukkan no. obat"
                      onChange={(event) =>
                        formik.setFieldValue("nomor_obat", event.target.value)
                      }
                      value={formik.values.nomor_obat}
                    />
                  </Grid>
                </Grid>
              </FormControl>
              <FormControl error={formik.errors.nomor_bpom}>
                <Grid container marginBottom="10px" alignItems="center">
                  <Grid item xs={3}>
                    <FormLabel
                      sx={{
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      No. BPOM
                    </FormLabel>
                  </Grid>
                  <Grid item xs={9}>
                    <OutlinedInput
                      size="small"
                      placeholder="Masukkan no. BPOM"
                      onChange={(event) =>
                        formik.setFieldValue("nomor_bpom", event.target.value)
                      }
                      value={formik.values.nomor_bpom}
                    />
                  </Grid>
                </Grid>
              </FormControl>
              <FormControl error={formik.errors.kategori}>
                <Grid container marginBottom="10px" alignItems="center">
                  <Grid item xs={3}>
                    <FormLabel
                      sx={{
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      Kategori
                    </FormLabel>
                  </Grid>
                  <Grid item xs={9}>
                    <Select
                      defaultValue=""
                      sx={{
                        backgroundColor: "white",
                      }}
                      size="small"
                      onChange={(e) => {
                        formik.setFieldValue("kategori", e.target.value);
                      }}
                      value={formik.values.kategori}
                      autoWidth
                      displayEmpty
                    >
                      <MenuItem disabled value="">
                        Kategori
                      </MenuItem>
                      {categories?.map((val) => {
                        return (
                          <MenuItem value={val.id}>{val.kategori}</MenuItem>
                        );
                      })}
                      {/* <MenuItem value="Obat Bebas">Obat Bebas</MenuItem>
                          <MenuItem value="Obat Resep">Obat Resep</MenuItem> */}
                    </Select>
                  </Grid>
                </Grid>
              </FormControl>
              <FormControl error={formik.errors.satuan}>
                <Grid container marginBottom="10px" alignItems="center">
                  <Grid item xs={3}>
                    <FormLabel
                      sx={{
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      Satuan
                    </FormLabel>
                  </Grid>
                  <Grid item xs={9}>
                    <Select
                      sx={{
                        backgroundColor: "white",
                      }}
                      size="small"
                      onChange={(event) => {
                        formik.setFieldValue("satuan", event.target.value);
                      }}
                      value={formik.values.satuan}
                      autoWidth
                    >
                      <MenuItem value="Box">Box</MenuItem>
                      <MenuItem value="Strip">Strip</MenuItem>
                      <MenuItem value="Botol">Botol</MenuItem>
                    </Select>
                  </Grid>
                </Grid>
              </FormControl>
              <FormControl error={formik.errors.harga_jual}>
                <Grid container marginBottom="10px" alignItems="center">
                  <Grid item xs={3}>
                    <FormLabel
                      sx={{
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      Nilai Jual (Rp)
                    </FormLabel>
                  </Grid>
                  <Grid item xs={9}>
                    <OutlinedInput
                      type="number"
                      size="small"
                      placeholder="Masukkan nilai jual"
                      value={formik.values.harga_jual}
                      onChange={(event) =>
                        formik.setFieldValue("harga_jual", event.target.value)
                      }
                    />
                  </Grid>
                </Grid>
              </FormControl>
              <FormControl error={formik.errors.diskon}>
                <Grid container marginBottom="10px" alignItems="center">
                  <Grid item xs={3}>
                    <FormLabel
                      sx={{
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      Diskon (%)
                    </FormLabel>
                  </Grid>
                  <Grid item xs={9}>
                    <OutlinedInput
                      type="number"
                      size="small"
                      placeholder="Masukkan diskon"
                      value={formik.values.diskon}
                      onChange={(event) =>
                        formik.setFieldValue("diskon", event.target.value)
                      }
                    />
                  </Grid>
                </Grid>
              </FormControl>
              {/* Form Upload Foto Produk */}
              <FormControl>
                <Grid container marginBottom="10px" alignItems="center">
                  <Grid item xs={3}>
                    <FormLabel
                      sx={{
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      Gambar Produk
                    </FormLabel>
                  </Grid>
                  <Grid item xs={9}>
                    {files?.length === 5 ? (
                      <Tooltip title="Maksimal 5 Gambar" placement="right">
                        <span>
                          <input
                            accept="image/png, image/jpeg, image/jpg"
                            onChange={handleFile}
                            ref={inputFile}
                            type="file"
                            inputProps={{ multiple: true }}
                            style={{ display: "none" }}
                          />
                          <Button
                            variant="outlined"
                            onClick={() => inputFile.current.click()}
                            disabled={files.length === 5}
                          >
                            Add Image
                          </Button>
                        </span>
                      </Tooltip>
                    ) : (
                      <>
                        <input
                          accept="image/png, image/jpeg, image/jpg"
                          onChange={handleFile}
                          ref={inputFile}
                          type="file"
                          inputProps={{ multiple: true }}
                          style={{ display: "none" }}
                        />
                        <Button
                          variant="outlined"
                          onClick={() => inputFile.current.click()}
                          disabled={files?.length === 5}
                        >
                          Add Image
                        </Button>
                      </>
                    )}
                  </Grid>

                  <Box
                    display="flex"
                    marginTop="10px"
                    maxWidth="100%"
                    sx={{
                      overflowX: "auto",
                    }}
                  >
                    {imageReview?.map((file, idx) => {
                      return (
                        <Box
                          sx={{
                            display: "flex",
                            borderRadius: "10px",
                            padding: "5px",
                          }}
                        >
                          <img src={file} height="200px" />
                          <CloseIcon
                            sx={{
                              color: "Sidebar.600",
                              position: "relative",
                              right: 30,
                              alignContent: "flex-end",
                              ":hover": {
                                color: "red",
                                cursor: "pointer",
                              },
                            }}
                            onClick={() => {
                              setImageReview((prevValue) => {
                                return prevValue.filter(
                                  (val, prevIdx) => idx !== prevIdx
                                );
                              });
                              setFiles((prevValue) => {
                                return prevValue.filter(
                                  (val, prevIdx) => idx !== prevIdx
                                );
                              });
                            }}
                          />
                        </Box>
                      );
                    })}
                  </Box>
                </Grid>
              </FormControl>
            </Box>
          </Box>

          <Box>
            <Divider orientation="horizontal" />
            <Box display="flex" justifyContent="flex-end" padding="16px">
              <Button
                onClick={submitHandler}
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

export default ModalTambahObat;
