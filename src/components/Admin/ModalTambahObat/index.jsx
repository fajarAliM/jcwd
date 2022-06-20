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
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Group8729 from "public/Images/Group8729.png";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const ModalTambahObat = ({ open, handleClose }) => {
  const [activeStep, setActiveStep] = useState(1);
  const [simpan, setSimpan] = useState(false);
  const [kategori, setKategori] = useState("Obat Bebas");
  const [expiredDate, setExpiredDate] = useState("");
  const [lokasi, setLokasi] = useState("Gudang");
  const [kuantitas, setKuantitas] = useState(0);
  const [satuan, setSatuan] = useState("Box");

  const kategoriHandle = (event) => {
    setKategori(event.target.value);
  };

  const dateHandle = (event) => {
    setExpiredDate(event.target.value);
  };

  const lokasiHandle = (event) => {
    setLokasi(event.target.value);
  };

  const satuanHandle = (event) => {
    setSatuan(event.target.value);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      {simpan ? (
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
                onClick={handleClose}
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              />
            </Box>
            {/* Stepper */}
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              marginBottom="20px"
            >
              <LooksOneIcon
                htmlColor={activeStep === 1 ? "#FF6600" : "#B4B9C7"}
              />
              <Typography
                marginLeft="5px"
                color={activeStep === 1 ? "black" : "#B4B9C7"}
              >
                Detail Obat
              </Typography>
              <ChevronRightIcon sx={{ marginX: "10px", color: "#B4B9C7" }} />
              <LooksTwoIcon
                htmlColor={activeStep === 2 ? "#FF6600" : "#B4B9C7"}
              />
              <Typography
                marginLeft="5px"
                marginRight="10px"
                color={activeStep === 2 ? "black" : "#B4B9C7"}
              >
                Detail Kuantitas & Harga
              </Typography>
            </Box>

            {/* Body Box */}
            <Box display="flex" flexDirection="column">
              {activeStep === 1 ? (
                <>
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
                          Nama Obat
                        </FormLabel>
                      </Grid>
                      <Grid item xs={9}>
                        <OutlinedInput
                          sx={{ height: "32px", minWidth: "226px" }}
                          placeholder="Masukkan nama obat"
                        />
                      </Grid>
                    </Grid>
                  </FormControl>
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
                          No. Obat
                        </FormLabel>
                      </Grid>
                      <Grid item xs={9}>
                        <OutlinedInput
                          sx={{ height: "32px", minWidth: "226px" }}
                          placeholder="Masukkan no. obat"
                        />
                      </Grid>
                    </Grid>
                  </FormControl>
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
                          No. BPOM
                        </FormLabel>
                      </Grid>
                      <Grid item xs={9}>
                        <OutlinedInput
                          sx={{ height: "32px", minWidth: "226px" }}
                          placeholder="Masukkan no. BPOM"
                        />
                      </Grid>
                    </Grid>
                  </FormControl>
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
                          Kategori
                        </FormLabel>
                      </Grid>
                      <Grid item xs={9}>
                        <Select
                          sx={{
                            backgroundColor: "white",
                            height: "32px",
                            width: "auto",
                          }}
                          onChange={kategoriHandle}
                          value={kategori}
                          displayEmpty
                          autoWidth
                        >
                          <MenuItem value="Obat Bebas">Obat Bebas</MenuItem>
                          <MenuItem value="Obat Resep">Obat Resep</MenuItem>
                        </Select>
                      </Grid>
                    </Grid>
                  </FormControl>
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
                          Tgl. Kadaluwarsa
                        </FormLabel>
                      </Grid>
                      <Grid item xs={9}>
                        <OutlinedInput
                          type="date"
                          sx={{ height: "32px" }}
                          onChange={dateHandle}
                          value={expiredDate}
                        />
                      </Grid>
                    </Grid>
                  </FormControl>
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
                          Lokasi Penyimpanan
                        </FormLabel>
                      </Grid>
                      <Grid item xs={9}>
                        <Select
                          sx={{
                            backgroundColor: "white",
                            height: "32px",
                            width: "auto",
                          }}
                          onChange={lokasiHandle}
                          value={lokasi}
                          displayEmpty
                          autoWidth
                        >
                          <MenuItem value="Gudang">Gudang</MenuItem>
                        </Select>
                      </Grid>
                    </Grid>
                  </FormControl>
                </>
              ) : (
                <>
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
                          Kuantitas
                        </FormLabel>
                      </Grid>
                      <Grid
                        item
                        xs={9}
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
                      </Grid>
                    </Grid>
                  </FormControl>
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
                          Satuan
                        </FormLabel>
                      </Grid>
                      <Grid item xs={9}>
                        <Select
                          sx={{
                            backgroundColor: "white",
                            height: "32px",
                            width: "auto",
                          }}
                          onChange={satuanHandle}
                          value={satuan}
                          displayEmpty
                          autoWidth
                        >
                          <MenuItem value="Box">Box</MenuItem>
                        </Select>
                      </Grid>
                    </Grid>
                  </FormControl>
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
                          Nilai Barang (Rp)
                        </FormLabel>
                      </Grid>
                      <Grid item xs={9}>
                        <OutlinedInput
                          sx={{ height: "32px", minWidth: "226px" }}
                          placeholder="Masukkan nilai barang"
                        />
                      </Grid>
                    </Grid>
                  </FormControl>
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
                          Nilai Jual (Rp)
                        </FormLabel>
                      </Grid>
                      <Grid item xs={9}>
                        <OutlinedInput
                          sx={{ height: "32px", minWidth: "226px" }}
                          placeholder="Masukkan nilai jual"
                        />
                      </Grid>
                    </Grid>
                  </FormControl>
                </>
              )}
            </Box>
          </Box>

          <Box>
            <Divider orientation="horizontal" />
            {activeStep === 1 ? (
              <Box display="flex" justifyContent="flex-end" padding="16px">
                <Button onClick={() => setActiveStep(2)} variant="contained">
                  Lanjutkan
                </Button>
              </Box>
            ) : (
              <Box display="flex" justifyContent="flex-end" padding="16px">
                <Button
                  onClick={() => setActiveStep(1)}
                  variant="contained"
                  sx={{
                    marginRight: "10px",
                    color: "Brand.500",
                    backgroundColor: "whitesmoke",
                    border: "1px solid #FF6600",
                    ":hover": {
                      color: "white",
                    },
                  }}
                >
                  Kembali
                </Button>
                <Button onClick={() => setSimpan(true)} variant="contained">
                  Simpan
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      )}
    </Modal>
  );
};

export default ModalTambahObat;
