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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import Image from "next/image";
import Group8725 from "public/Images/Group8725.png";
import Kursiplastik from "public/Images/kursiplastik.png";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const ModalSalinanResep = ({
  open,
  handleClose,
  namaPembeli,
  namaProduk,
  kodeOrder,
  waktuOrder,
  hargaProduk,
  hargaTotal,
  jumlahProduk,
}) => {
  const [terimaPesanan, setTerimaPesanan] = useState(false);
  const [selesai, setSelesai] = useState(false);
  const [kuantitas, setKuantitas] = useState(0);
  const [namaObat, setNamaObat] = useState("");
  const [satuan, setSatuan] = useState("Strip");
  const [orderDate, setOrderDate] = useState("");

  const isTerima = () => {
    setTerimaPesanan(true);
  };

  const dateHandle = (event) => {
    setOrderDate(event.target.value);
  };

  const obatHandle = (event) => {
    setNamaObat(event.target.value);
  };

  const satuanHandle = (event) => {
    setSatuan(event.target.value);
  };

  return (
    <Modal open={open} onClose={handleClose}>
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
              onClick={handleClose}
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
            <Image src={Group8725} />
            <Typography
              sx={{
                marginTop: "20px",
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
            width: "1090px",
            height: "auto",
            bgcolor: "white",
            borderRadius: 2,
            boxShadow: 24,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            p: 3,
          }}
        >
          <Box>
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
            <Grid container spacing={3}>
              {/* Grid for Image */}
              <Grid item xs={5}>
                <Image src={Kursiplastik} />
              </Grid>
              <Grid item xs={6}>
                <Grid container spacing={2} marginBottom="16px">
                  <Grid item xs={6}>
                    <FormControl>
                      <FormLabel
                        sx={{
                          fontSize: "12px",
                          fontWeight: "bold",
                          color: "black",
                        }}
                      >
                        No. Pemesanan
                      </FormLabel>
                      <OutlinedInput
                        placeholder="AB000569D"
                        sx={{ height: "24px", width: "100%" }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl>
                      <FormLabel
                        sx={{
                          fontSize: "12px",
                          fontWeight: "bold",
                          color: "black",
                        }}
                      >
                        Tgl. Pemesanan
                      </FormLabel>
                      <OutlinedInput
                        type="date"
                        sx={{ height: "24px", width: "100%" }}
                        onChange={dateHandle}
                        value={orderDate}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container spacing={2} marginBottom="16px">
                  <Grid item xs={12}>
                    <FormControl>
                      <FormLabel
                        sx={{
                          fontSize: "12px",
                          fontWeight: "bold",
                          color: "black",
                        }}
                      >
                        Nama Pasien
                      </FormLabel>
                      <OutlinedInput
                        fullWidth
                        placeholder="Masukkan nama pasien"
                        sx={{ height: "24px", width: "336px" }}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container spacing={2} marginBottom="16px">
                  <Grid item xs={12}>
                    <FormControl>
                      <FormLabel
                        sx={{
                          fontSize: "12px",
                          fontWeight: "bold",
                          color: "black",
                        }}
                      >
                        Nama Dokter
                      </FormLabel>
                      <OutlinedInput
                        fullWidth
                        placeholder="Masukkan nama dokter"
                        sx={{ height: "24px", width: "336px" }}
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
                    <FormControl>
                      <FormLabel
                        sx={{
                          fontSize: "12px",
                          fontWeight: "bold",
                          color: "black",
                        }}
                      >
                        Nama Obat
                      </FormLabel>
                      <Select
                        onChange={obatHandle}
                        value={namaObat}
                        displayEmpty
                        sx={{ height: "24px", width: "336px" }}
                      >
                        <MenuItem disabled value="">
                          Masukkan Nama Obat
                        </MenuItem>
                        <MenuItem value="Vitamin B">Vitamin B</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container spacing={2} marginBottom="16px">
                  <Grid item xs={4}>
                    <FormControl>
                      <FormLabel
                        sx={{
                          fontSize: "14px",
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
                          sx={{
                            color: "Sidebar.500",
                            ":hover": { color: "Brand.500", cursor: "pointer" },
                          }}
                          onClick={() => setKuantitas(kuantitas - 1)}
                        />
                        <Typography
                          fontSize="14px"
                          fontWeight="bold"
                          marginX="15px"
                        >
                          {kuantitas}
                        </Typography>
                        <AddIcon
                          sx={{
                            color: "Sidebar.500",
                            ":hover": { color: "Brand.500", cursor: "pointer" },
                          }}
                          onClick={() => setKuantitas(kuantitas + 1)}
                        />
                      </Box>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl>
                      <FormLabel
                        sx={{
                          fontSize: "14px",
                          fontWeight: "bold",
                          color: "black",
                        }}
                      >
                        Satuan
                      </FormLabel>
                      <Select
                        sx={{
                          backgroundColor: "white",
                          height: "24px",
                        }}
                        onChange={satuanHandle}
                        value={satuan}
                        displayEmpty
                      >
                        <MenuItem value="Strip">Strip</MenuItem>
                        <MenuItem value="Box">Box</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl>
                      <FormLabel
                        sx={{
                          fontSize: "12px",
                          fontWeight: "bold",
                          color: "black",
                        }}
                      >
                        Dosis
                      </FormLabel>
                      <OutlinedInput
                        placeholder="AB000569D"
                        sx={{ height: "24px", width: "100%" }}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Divider />

                {/* Grid for Table */}
                <Grid
                  container
                  flexDirection="column"
                  marginTop="10px"
                  overflow="auto"
                >
                  <Typography
                    fontSize="12px"
                    fontWeight="bold"
                    marginBottom="18px"
                  >
                    Ringkasan Resep
                  </Typography>

                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>No</TableCell>
                          <TableCell>Nama Obat</TableCell>
                          <TableCell>Kategori</TableCell>
                          <TableCell>Kuantitas</TableCell>
                          <TableCell>Satuan</TableCell>
                          <TableCell>Dosis</TableCell>
                          <TableCell>Atur</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>1</TableCell>
                          <TableCell>Vitamin B</TableCell>
                          <TableCell>Obat Bebas</TableCell>
                          <TableCell>2</TableCell>
                          <TableCell>Stip</TableCell>
                          <TableCell>2x1</TableCell>
                          <TableCell>Oke</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </Grid>
          </Box>
          <Box display="flex" justifyContent="flex-end" padding="16px">
            <Button onClick={() => setSelesai(true)} variant="contained">
              Terima Pesanan
            </Button>
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
                      {waktuOrder}
                    </Typography>
                  </Box>

                  {/* Box List Obat */}
                  <Box marginBottom="5px">
                    <Typography fontSize="14px" fontWeight="bold">
                      {namaProduk}
                    </Typography>
                    <Grid container>
                      <Grid item xs={2}>
                        <Typography sx={{ fontSize: "12px", color: "gray" }}>
                          Obat Bebas
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography sx={{ fontSize: "12px", color: "gray" }}>
                          {jumlahProduk} x {hargaProduk}
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography sx={{ fontSize: "12px", color: "gray" }}>
                          Strip
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography sx={{ fontSize: "12px", color: "gray" }}>
                          {jumlahProduk} x 1
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>

                  {/* Box List Obat 2 */}
                  <Box>
                    <Typography fontSize="14px" fontWeight="bold">
                      Obat Demam
                    </Typography>
                    <Grid container>
                      <Grid item xs={2}>
                        <Typography sx={{ fontSize: "12px", color: "gray" }}>
                          Obat Racikan
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography sx={{ fontSize: "12px", color: "gray" }}>
                          2 x 8.500
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography sx={{ fontSize: "12px", color: "gray" }}>
                          Serbuk
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography sx={{ fontSize: "12px", color: "gray" }}>
                          2 x 1
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
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
                        <Typography
                          sx={{ fontSize: "10px", fontWeight: "bold" }}
                        >
                          ({jumlahProduk} Obat)
                        </Typography>
                      </Box>
                      <Typography
                        sx={{
                          fontSize: "12px",
                          fontWeight: "bold",
                          marginRight: "8px",
                        }}
                      >
                        Rp {hargaTotal},-
                      </Typography>
                    </Box>
                  </Box>
                  <Divider orientation="horizontal" />
                  <Box display="flex" justifyContent="flex-end" padding="16px">
                    <Button onClick={isTerima} variant="contained">
                      Terima Pesanan
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Modal>
          </Box>
        </Box>
      )}
    </Modal>
  );
};

export default ModalSalinanResep;
