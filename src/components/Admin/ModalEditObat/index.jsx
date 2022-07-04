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
  IconButton,
} from "@mui/material";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Group8729 from "public/Images/Group8729.png";
import axiosInstance from "config/api";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { useFormik } from "formik";
import AddIcon from "@mui/icons-material/Add";

const ModalEditObat = ({
  open,
  handleClose,
  categories = [],
  data,
  // eslint-disable-next-line no-unused-vars
  produkImages = [],
}) => {
  const [activeStep, setActiveStep] = useState(1);
  const [imageReview, setImageReview] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [files, setFiles] = useState([]);
  const [editImage, setEditImage] = useState(false);

  const inputFile = useRef(null);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      nama_produk: data.namaObat,
      nomor_obat: data.noObat,
      nomor_bpom: data.noBpom,
      kategori: data.kategoriId,
      satuan: data.satuan,
      harga_jual: data.nilaiJual,
      diskon: data.diskon,
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
    onSubmit: async (values) => {
      try {
        const productInfo = {
          nama_produk: values.nama_produk,
          nomor_obat: values.nomor_obat,
          nomor_bpom: values.nomor_bpom,
          kategori: values.kategori,
          satuan: values.satuan,
          harga_jual: values.harga_jual,
          diskon: values.diskon,
        };
        const res = await axiosInstance.patch(
          `/admin/product/${data.productId}`,
          productInfo
        );
        enqueueSnackbar(res?.data?.message, { variant: "success" });
        setActiveStep(3);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
        enqueueSnackbar(err?.response?.data?.message, { variant: "error" });
      }
    },
  });

  const imagesSubmitHandler = async () => {
    if (!imageReview) {
      enqueueSnackbar("Select your Image First!", { variant: "warning" });
      return;
    }

    try {
      const formData = new FormData();

      Object.values(files).forEach((file) => {
        formData.append("product_image_file", file);
      });
      const res = await axiosInstance.put(
        `/admin/product-images/${data.productId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // setFiles(null);
      // setImageReview(null);
      enqueueSnackbar(res?.data?.message, { variant: "success" });
      setEditImage(false);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      enqueueSnackbar(err?.response?.data?.message, { variant: "error" });
    }
  };

  const onChange = (e) => {
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

  const closeEditImage = () => {
    setEditImage(false);
    setFiles([]);
    setImageReview([]);
  };

  async function createFile() {
    produkImages.map(async (image) => {
      const response = await fetch(`${image}`);
      const blob = await response.blob();
      const file = new File([blob], `${image}`, { type: blob.type });
      // if (!files) {
      //   setFiles([file]);
      // } else {
      //   setFiles([...files, file]);
      // }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      if (!imageReview || !files) {
        reader.onload = () => {
          setFiles([file]);
          setImageReview([reader.result]);
        };
      } else {
        reader.onload = () => {
          setImageReview((imgs) => [...imgs, reader.result]);
          setFiles((imgs) => [...imgs, file]);
        };
      }
      reader.onerror = () => {
        // eslint-disable-next-line no-console
        console.log(reader.error);
      };
    });
  }
  useEffect(() => {
    if (produkImages) {
      createFile();
    } else {
      setImageReview([]);
      setFiles([]);
    }
  }, [produkImages]);

  return (
    <Modal open={open} onClose={handleClose}>
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
              Produk Berhasil Diubah!
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
                Ubah Data Obat
              </Typography>
              <CloseIcon
                onClick={() => {
                  handleClose();
                  setFiles([]);
                  setImageReview([]);
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
                <Grid container marginBottom="10px">
                  <Grid item xs={3}>
                    <FormLabel
                      sx={{
                        fontSize: "14px",
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
                      sx={{ height: "32px", minWidth: "226px" }}
                      value={formik.values.nama_produk}
                    />
                  </Grid>
                </Grid>
              </FormControl>
              <FormControl error={formik.errors.nomor_obat}>
                <Grid container marginBottom="10px">
                  <Grid item xs={3}>
                    <FormLabel
                      sx={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      No. Obat
                    </FormLabel>
                  </Grid>
                  <Grid item xs={9}>
                    <OutlinedInput
                      sx={{ height: "32px", minWidth: "226px" }}
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
                <Grid container marginBottom="10px">
                  <Grid item xs={3}>
                    <FormLabel
                      sx={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      No. BPOM
                    </FormLabel>
                  </Grid>
                  <Grid item xs={9}>
                    <OutlinedInput
                      sx={{ height: "32px", minWidth: "226px" }}
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
                <Grid container marginBottom="10px">
                  <Grid item xs={3}>
                    <FormLabel
                      sx={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      Kategori
                    </FormLabel>
                  </Grid>
                  <Grid item xs={9}>
                    <Select
                      defaultValue={data.kategoriId}
                      sx={{
                        backgroundColor: "white",
                        height: "32px",
                        width: "auto",
                      }}
                      onChange={(e) => {
                        formik.setFieldValue("kategori", e.target.value);
                      }}
                      value={formik.values.kategori}
                      autoWidth
                    >
                      <MenuItem disabled value="">
                        Kategori
                      </MenuItem>
                      {categories?.map((val) => {
                        return (
                          <MenuItem value={val.id}>{val.kategori}</MenuItem>
                        );
                      })}
                    </Select>
                  </Grid>
                </Grid>
              </FormControl>
              <FormControl error={formik.errors.satuan}>
                <Grid container marginBottom="10px">
                  <Grid item xs={3}>
                    <FormLabel
                      sx={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      Satuan
                    </FormLabel>
                  </Grid>
                  <Grid item xs={9}>
                    <Select
                      defaultValue={data.satuan}
                      sx={{
                        backgroundColor: "white",
                        height: "32px",
                        width: "auto",
                      }}
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
                <Grid container marginBottom="10px">
                  <Grid item xs={3}>
                    <FormLabel
                      sx={{
                        fontSize: "14px",
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
                      sx={{ height: "32px", minWidth: "226px" }}
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
                <Grid container marginBottom="10px">
                  <Grid item xs={3}>
                    <FormLabel
                      sx={{
                        fontSize: "14px",
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
                      sx={{ height: "32px", minWidth: "226px" }}
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
                <Grid container marginBottom="10px">
                  <Grid item xs={3}>
                    <FormLabel
                      sx={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      Gambar Produk
                    </FormLabel>
                  </Grid>
                  <Grid item xs={9}>
                    <Button
                      variant="outlined"
                      onClick={() => setEditImage(true)}
                    >
                      Edit Image
                    </Button>
                  </Grid>
                  <Modal open={editImage} onClose={closeEditImage}>
                    <Box
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        minWidth: "300px",
                        maxWidth: "1000px",
                        height: "auto",
                        bgcolor: "white",
                        borderRadius: 2,
                        boxShadow: 24,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        padding: 3,
                      }}
                    >
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        marginBottom="30px"
                      >
                        <Typography fontSize="20px" fontWeight="bold">
                          Ubah Gambar Produk
                        </Typography>
                        <CloseIcon
                          onClick={closeEditImage}
                          sx={{
                            "&:hover": {
                              cursor: "pointer",
                            },
                          }}
                        />
                      </Box>
                      <Box
                        display="flex"
                        alignContent="center"
                        alignItems="center"
                        maxWidth="100%"
                        overflow="auto"
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
                        {imageReview?.length > 4 ? null : (
                          <Box
                            sx={{
                              display: "flex",
                            }}
                          >
                            <IconButton
                              onClick={() => inputFile.current.click()}
                            >
                              <input
                                accept="image/png, image/jpeg, image/jpg"
                                onChange={onChange}
                                ref={inputFile}
                                type="file"
                                inputProps={{ multiple: true }}
                                style={{ display: "none" }}
                              />
                              <AddIcon />
                              Add
                            </IconButton>
                          </Box>
                        )}
                      </Box>
                      <Box>
                        <Divider orientation="horizontal" />
                        <Box
                          display="flex"
                          justifyContent="flex-end"
                          marginTop="20px"
                        >
                          <Button
                            variant="outlined"
                            onClick={() => {
                              setEditImage(false);
                            }}
                            sx={{ marginRight: 1 }}
                          >
                            Batal
                          </Button>
                          <Button
                            variant="contained"
                            onClick={imagesSubmitHandler}
                          >
                            Simpan
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Modal>
                </Grid>
              </FormControl>
            </Box>
          </Box>

          <Box>
            <Divider orientation="horizontal" />
            <Box display="flex" justifyContent="flex-end" padding="16px">
              <Button
                onClick={formik.handleSubmit}
                disabled={!formik.isValid}
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

export default ModalEditObat;
