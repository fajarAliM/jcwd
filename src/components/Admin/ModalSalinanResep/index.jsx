import {
  Modal,
  Typography,
  Box,
  Divider,
  Button,
  Grid,
  FormControl,
  FormLabel,
  OutlinedInput,
  Tabs,
  Tab,
  MenuItem,
  Select,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  tableCellClasses,
  styled,
  Paper,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import Kursiplastik from "public/Images/kursiplastik.png";
import * as Yup from "yup";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import axiosInstance from "config/api";
import { useFormik } from "formik";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
// import Image from "next/image";

const Image = styled("img")({
  width: "430px",
  height: "50%",
  objectFit: "scale-down",
});

const ModalSalinanResep = ({
  open,
  handleClose,
  namaPembeli,
  kodeOrder,
  waktuOrder,
  fotoResep,
  transaksiId,
  addressDetail,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const [terimaPesanan, setTerimaPesanan] = useState(false);
  const [selesai, setSelesai] = useState(false);
  const [productData, setProductData] = useState([]);
  const [listObat, setListObat] = useState([]);
  const [ongkir, setOngkir] = useState(null);

  const fetchOngkir = async () => {
    try {
      const dataOngkir = await axiosInstance.post("/address/cost", {
        origin: "153",
        destination: addressDetail.kota_kabupaten_id,
        weight: 200,
        courier: "jne",
      });
      setOngkir(dataOngkir.data.result[0].costs[0].cost[0].value);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const isTerima = () => {
    setTerimaPesanan(true);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      align: "center",
    },
  }));

  const fetchProduct = async () => {
    try {
      const res = await axiosInstance.get("/admin/product");
      setProductData(res?.data?.result?.rows);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      namaDokter: "",
      nomorResep: "",
      obat: "",
      kuantitas: 0,
      satuan: "Box",
    },
    validationSchema: Yup.object().shape({
      nomorResep: Yup.string().required(),
      namaDokter: Yup.string().required(),
      obat: Yup.number().required(),
      kuantitas: Yup.number().min(1),
      satuan: Yup.string(),
    }),
    validateOnChange: true,
  });

  const tambahObatHandleBtn = () => {
    if (!listObat.length) {
      setListObat([
        {
          ...productData[formik.values.obat],
          kuantitasObat: formik.values.kuantitas,
          satuanObat: formik.values.satuan,
        },
      ]);
    } else if (listObat.length) {
      setListObat([
        ...listObat,
        {
          ...productData[formik.values.obat],
          kuantitasObat: formik.values.kuantitas,
          satuanObat: formik.values.satuan,
        },
      ]);
    }

    formik.setFieldValue("obat", formik.initialValues.obat);
    formik.setFieldValue("kuantitas", 0);
    formik.setFieldValue("satuan", "Box");
  };

  const totalPrice = () => {
    return listObat.reduce((init, obj) => {
      return (
        init +
        (obj.harga_jual * obj.kuantitasObat -
          (parseInt(obj.diskon) / 100) * (obj.harga_jual * obj.kuantitasObat))
      );
    }, 0);
  };

  const submitBtn = async () => {
    try {
      const dataObat = listObat.map((val) => {
        return {
          quantity: val.kuantitasObat,
          productId: val.id,
          transactionListId: transaksiId,
          nomor_resep: formik.values.nomorResep,
          price: val.harga_jual - val.harga_jual * (val.diskon / 100),
          total_price: totalPrice() + ongkir,
        };
      });

      const res = await axiosInstance.post(
        "/admin/product/custom-order",
        dataObat
      );
      enqueueSnackbar(res?.data?.message, { variant: "success" });
      setSelesai(false);
      setTerimaPesanan(true);
      setListObat([]);
      isTerima();
      formik.setFieldValue("namaDokter", formik.initialValues.namaDokter);
      formik.setFieldValue("nomorResep", formik.initialValues.nomorResep);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      enqueueSnackbar(err?.response?.data?.message, { variant: "error" });
    }
  };

  useEffect(() => {
    if (!productData.length) {
      fetchProduct();
    }
  }, []);

  useEffect(() => {
    if (!ongkir) {
      fetchOngkir();
    }
  }, [ongkir]);

  return (
    <Modal
      open={open}
      onClose={() => {
        handleClose();
        setTerimaPesanan(false);
      }}
    >
      {terimaPesanan ? (
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
                setTerimaPesanan(false);
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
            <Image src="https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/523/posts/32694/final_image/tutorial-preview-large.png" />
            <Typography
              sx={{
                marginTop: "10px",
                fontSize: "16px",
                color: "Brand.500",
                fontWeight: "bold",
              }}
            >
              Pesanan Berhasil Diproses
            </Typography>
            <Typography sx={{ color: "Brand.300", fontSize: "12px" }}>
              Silahkan ajukan pengambilan barang di halaman pengiriman
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
            width: "75%",
            maxHeight: "700px",
            bgcolor: "white",
            borderRadius: 2,
            boxShadow: 24,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            p: 2,
          }}
        >
          {/* Box Header */}
          <Box
            display="flex"
            justifyContent="space-between"
            marginBottom="30px"
          >
            <Typography fontSize="20px" fontWeight="bold">
              Buat Salinan Resep
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
          {/* Box for Content */}
          <Box overflow="auto">
            <Grid container spacing={3}>
              {/* Grid for Image */}
              <Grid item xs={5}>
                <Image
                  src={fotoResep || Kursiplastik}
                  sx={{ maxWidth: "400px" }}
                />
              </Grid>

              {/* Grid for Add Product */}
              <Grid item xs={7}>
                <Grid container spacing={2} marginBottom="16px">
                  <Grid item xs={6}>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      Nama Pasien
                    </Typography>
                    <Typography fontSize="20px" fontWeight="100">
                      {namaPembeli}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      Tgl. Pemesanan
                    </Typography>
                    <Typography fontSize="20px" fontWeight="100">
                      {moment(waktuOrder).format("DD MMMM YYYY, HH:mm")}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={2} marginBottom="16px">
                  <Grid item xs={12}>
                    <FormControl error={formik.errors.namaDokter}>
                      <FormLabel
                        sx={{
                          fontWeight: "bold",
                          color: "black",
                        }}
                      >
                        Nama Dokter
                      </FormLabel>
                      <OutlinedInput
                        size="small"
                        placeholder="Masukkan nama dokter"
                        sx={{ width: "300px" }}
                        value={formik.values.namaDokter}
                        onChange={(e) =>
                          formik.setFieldValue("namaDokter", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container spacing={2} marginBottom="16px">
                  <Grid item xs={12}>
                    <FormControl error={formik.errors.nomorResep}>
                      <FormLabel
                        sx={{
                          fontWeight: "bold",
                          color: "black",
                        }}
                      >
                        No. Resep
                      </FormLabel>
                      <OutlinedInput
                        size="small"
                        placeholder="Masukkan nomor resep"
                        sx={{ width: "300px" }}
                        value={formik.values.nomorResep}
                        onChange={(e) =>
                          formik.setFieldValue("nomorResep", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>
                </Grid>

                <Divider />
                <Tabs indicatorColor="primary" value={1}>
                  <Tab
                    value={1}
                    sx={{ textTransform: "capitalize" }}
                    label="Tambah Obat Bebas"
                  />
                </Tabs>
                <Grid container spacing={2} marginY="16px">
                  <Grid item xs={12}>
                    <FormControl error={formik.errors.obat}>
                      <FormLabel
                        sx={{
                          fontWeight: "bold",
                          color: "black",
                        }}
                      >
                        Nama Obat
                      </FormLabel>
                      <Select
                        onChange={(e) =>
                          formik.setFieldValue("obat", e.target.value)
                        }
                        value={formik.values.obat}
                        size="small"
                        displayEmpty
                        sx={{ width: "336px" }}
                      >
                        <MenuItem disabled value="">
                          Masukkan Nama Obat
                        </MenuItem>
                        {productData.map((val, idx) => {
                          return (
                            <MenuItem value={idx}>{val.nama_produk}</MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container spacing={1} marginBottom="16px">
                  <Grid item xs={3}>
                    <FormControl error={formik.errors.kuantitas}>
                      <FormLabel
                        sx={{
                          fontWeight: "bold",
                          color: "black",
                        }}
                      >
                        Kuantitas
                      </FormLabel>
                      <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                      >
                        <RemoveIcon
                          fontSize="large"
                          sx={{
                            color: "Sidebar.500",
                            ":hover": { color: "Brand.500", cursor: "pointer" },
                          }}
                          onClick={() => {
                            if (formik.values.kuantitas < 1) {
                              formik.setFieldValue("kuantitas", 0);
                            } else {
                              formik.setFieldValue(
                                "kuantitas",
                                formik.values.kuantitas - 1
                              );
                            }
                          }}
                        />
                        <Typography
                          fontSize="30px"
                          fontWeight="bold"
                          marginX="15px"
                        >
                          {formik.values.kuantitas}
                        </Typography>
                        <AddIcon
                          fontSize="large"
                          sx={{
                            color: "Sidebar.500",
                            ":hover": { color: "Brand.500", cursor: "pointer" },
                          }}
                          onClick={() => {
                            formik.setFieldValue(
                              "kuantitas",
                              formik.values.kuantitas + 1
                            );
                          }}
                        />
                      </Box>
                    </FormControl>
                  </Grid>
                  <Grid item xs={5}>
                    <FormControl error={formik.errors.satuan}>
                      <FormLabel
                        sx={{
                          fontWeight: "bold",
                          color: "black",
                        }}
                      >
                        Satuan
                      </FormLabel>
                      <Select
                        size="small"
                        sx={{
                          backgroundColor: "white",
                          width: "200px",
                        }}
                        onChange={(e) =>
                          formik.setFieldValue("satuan", e.target.value)
                        }
                        value={formik.values.satuan}
                        displayEmpty
                        defaultValue="Box"
                      >
                        <MenuItem value="Box">Box</MenuItem>
                        <MenuItem value="Strip">Strip</MenuItem>
                        <MenuItem value="Botol">Botol</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl>
                      <FormLabel
                        sx={{
                          fontWeight: "bold",
                          color: "black",
                        }}
                      >
                        Dosis
                      </FormLabel>
                      <OutlinedInput
                        size="small"
                        placeholder="cth. 3 x 1"
                        sx={{ width: "100%" }}
                      />
                    </FormControl>
                  </Grid>
                </Grid>

                {/* Box Tambah Obat */}
                <Box display="flex" justifyContent="flex-end" marginY={2}>
                  <Button
                    onClick={tambahObatHandleBtn}
                    variant="contained"
                    disabled={!(formik.isValid && formik.dirty)}
                  >
                    Tambahkan Obat
                  </Button>
                </Box>
                <Divider />

                {listObat.length ? (
                  <>
                    {/* Grid for Table */}
                    <Grid container flexDirection="column" marginTop="10px">
                      <Typography fontWeight="bold" marginBottom="18px">
                        Ringkasan Resep
                      </Typography>
                      <TableContainer component={Paper}>
                        <Table aria-label="customized table">
                          <TableHead>
                            <TableRow>
                              <StyledTableCell>No</StyledTableCell>
                              <StyledTableCell>Nama Obat</StyledTableCell>
                              <StyledTableCell>Kategori</StyledTableCell>
                              <StyledTableCell>Kuantitas</StyledTableCell>
                              <StyledTableCell>Satuan</StyledTableCell>
                              <StyledTableCell>Dosis</StyledTableCell>
                              <StyledTableCell>Atur</StyledTableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {listObat.map((val, idx) => {
                              return (
                                <TableRow
                                  sx={{
                                    ":nth-of-type(even)": {
                                      backgroundColor: "#D3D3D3",
                                    },
                                  }}
                                >
                                  <TableCell
                                    align="center"
                                    component="th"
                                    scope="row"
                                  >
                                    {idx + 1}
                                  </TableCell>
                                  <TableCell align="center">
                                    {val.nama_produk}
                                  </TableCell>
                                  <TableCell align="center">
                                    Obat Bebas
                                  </TableCell>
                                  <TableCell align="center">
                                    {val.kuantitasObat}
                                  </TableCell>
                                  <TableCell align="center">
                                    {val.satuanObat}
                                  </TableCell>
                                  <TableCell align="center">
                                    {val.kuantitasObat}x1
                                  </TableCell>
                                  <TableCell align="center">
                                    <IconButton
                                      sx={{
                                        ":hover": {
                                          color: "Brand.500",
                                        },
                                      }}
                                      onClick={() => {
                                        setListObat((prevValue) => {
                                          return prevValue.filter(
                                            (value, prevIdx) => idx !== prevIdx
                                          );
                                        });
                                      }}
                                    >
                                      <DeleteIcon />
                                    </IconButton>
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                  </>
                ) : null}
              </Grid>
            </Grid>
          </Box>

          {/* Box for Button */}
          <Box display="flex" justifyContent="flex-end" marginTop={2}>
            <Button
              onClick={() => setSelesai(true)}
              variant="contained"
              disabled={!listObat.length}
            >
              Selesai
            </Button>
          </Box>
          {/* Ringkasan Resep */}
          <Modal open={selesai} onClose={() => setSelesai(false)}>
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
              {/* Box 1 */}
              <Box sx={{ p: 3 }}>
                <Box display="flex" justifyContent="flex-end">
                  <CloseIcon
                    onClick={() => setSelesai(false)}
                    sx={{
                      "&:hover": {
                        cursor: "pointer",
                      },
                    }}
                  />
                </Box>

                <Typography
                  textAlign="center"
                  fontSize="20px"
                  fontWeight="bold"
                >
                  Ringkasan Resep
                </Typography>

                <Box
                  display="flex"
                  alignItems="center"
                  flexDirection="row"
                  marginTop="30px"
                  marginBottom="10px"
                >
                  <Typography sx={{ fontWeight: "bold", fontSize: "12px" }}>
                    {namaPembeli}
                  </Typography>
                  <Typography
                    sx={{
                      color: "Sidebar.700",
                      marginLeft: "10px",
                      fontSize: "12px",
                    }}
                  >
                    /
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      marginLeft: "10px",
                      fontSize: "12px",
                    }}
                  >
                    {kodeOrder}
                  </Typography>
                  <Typography
                    sx={{
                      color: "Sidebar.700",
                      marginLeft: "10px",
                      fontSize: "12px",
                    }}
                  >
                    /
                  </Typography>

                  <Typography
                    sx={{
                      color: "gray",
                      marginLeft: "10px",
                      fontSize: "12px",
                    }}
                  >
                    {moment(waktuOrder).format("DD MMMM YYYY, HH:mm")}
                  </Typography>
                </Box>

                {/* Box List Obat */}
                {listObat.map((val) => {
                  return (
                    <Box marginBottom="5px">
                      <Typography fontSize="14px" fontWeight="bold">
                        {val.nama_produk}
                      </Typography>
                      <Grid container>
                        <Grid item xs={2}>
                          <Typography sx={{ fontSize: "12px", color: "gray" }}>
                            Obat Bebas
                          </Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <Typography sx={{ fontSize: "12px", color: "gray" }}>
                            {val.kuantitasObat} x{" "}
                            {(
                              val.harga_jual -
                              (val.harga_jual * val.diskon) / 100
                            )?.toLocaleString("id")}
                          </Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <Typography sx={{ fontSize: "12px", color: "gray" }}>
                            {val.satuanObat}
                          </Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <Typography sx={{ fontSize: "12px", color: "gray" }}>
                            {val.kuantitasObat} x 1
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  );
                })}
              </Box>

              {/* Box 2 */}
              <Box>
                {/* Total Harga */}
                <Box sx={{ p: 3 }}>
                  <Box
                    sx={{
                      borderRadius: "5px",
                      backgroundColor: "#faf0e8",
                      padding: "8px",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: "bold",
                          marginRight: "8px",
                        }}
                      >
                        Total Harga
                      </Typography>
                      <Typography sx={{ fontSize: "10px", fontWeight: "bold" }}>
                        ({listObat.length} Obat)
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: "bold",
                        marginRight: "8px",
                      }}
                    >
                      Rp {totalPrice().toLocaleString("id")}
                    </Typography>
                  </Box>
                </Box>
                <Divider orientation="horizontal" />
                <Box display="flex" justifyContent="flex-end" padding="16px">
                  <Button
                    variant="outlined"
                    sx={{ marginRight: "5px" }}
                    onClick={() => {
                      setSelesai(false);
                    }}
                  >
                    Kembali
                  </Button>
                  <Button onClick={submitBtn} variant="contained">
                    Terima Pesanan
                  </Button>
                </Box>
              </Box>
            </Box>
          </Modal>
        </Box>
      )}
    </Modal>
  );
};

export default ModalSalinanResep;
