/* eslint-disable react/jsx-no-useless-fragment */
import {
  Grid,
  Box,
  Typography,
  Button,
  OutlinedInput,
  FormControl,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Stack,
  Pagination,
  Divider,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import Image from "next/image";
import CardOrder from "components/Admin/CardOrder";
import Group from "public/Images/Group.png";

const PesananBaruPage = () => {
  // eslint-disable-next-line no-unused-vars
  const [order, setOrder] = useState([1]);
  const [sortFilter, setSortFilter] = useState("");
  const [urutkan, setUrutkan] = useState("");
  const [cardPerPage, setCardPerPage] = useState("5");
  const [checkedItems, setCheckedItems] = useState([]);

  const filterHandle = (event) => {
    setSortFilter(event.target.value);
  };

  const urutkanHandle = (event) => {
    setUrutkan(event.target.value);
  };

  const cardHandle = (event) => {
    setCardPerPage(event.target.value);
  };
  return (
    <>
      {order.length ? (
        <Grid container>
          {/* Heading Box */}
          <Grid item xs={12} marginBottom="32px">
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box>
                <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
                  Pesanan Baru
                </Typography>
              </Box>
              <Box display="flex">
                <Button
                  sx={{ marginRight: "15px" }}
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                >
                  Unduh PDF
                </Button>
                <Button variant="outlined" startIcon={<InsertDriveFileIcon />}>
                  Excel
                </Button>
              </Box>
            </Box>
            <Divider orientation="horizontal" sx={{ marginTop: "40px" }} />
          </Grid>

          {/* Filter Box */}
          <Grid item xs={12} marginBottom="16px">
            {/* Box Filter */}
            <Box display="flex" flexDirection="row">
              <OutlinedInput
                sx={{
                  borderRadius: "10px",
                  width: "328px",
                  height: "42px",
                  backgroundColor: "white",
                  marginRight: "16px",
                }}
                placeholder="Cari nama obat"
                endAdornment={<SearchIcon htmlColor="gray" />}
              />
              {/* Filter Obat */}
              <FormControl sx={{ marginRight: "16px" }}>
                <Select
                  sx={{
                    borderRadius: "10px",
                    minWidth: "156px",
                    height: "42px",
                    backgroundColor: "white",
                  }}
                  onChange={filterHandle}
                  value={sortFilter}
                  displayEmpty
                  autoWidth
                >
                  <MenuItem disabled value="">
                    Filter
                  </MenuItem>
                  <MenuItem value="Obat Bebas">Obat Bebas</MenuItem>
                  <MenuItem value="Obat Resep">Obat Resep</MenuItem>
                </Select>
              </FormControl>

              {/* Filter Urutkan */}
              <FormControl>
                <Select
                  sx={{
                    borderRadius: "10px",
                    minWidth: "156px",
                    height: "42px",
                    backgroundColor: "white",
                  }}
                  onChange={urutkanHandle}
                  value={urutkan}
                  autoWidth
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Urutkan
                  </MenuItem>
                  <MenuItem value="Terbaru">Terbaru</MenuItem>
                  <MenuItem value="Harga Tertinggi">Harga Tertinggi</MenuItem>
                  <MenuItem value="Harga Terendah">Harga Terendah</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>

          {/* Body Box */}
          <Grid item xs={12}>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
            >
              <Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={({ target: { checked } }) => {
                        let dupItems = [...checkedItems];
                        if (checked) {
                          order.forEach((val, idx) => dupItems.push(idx));
                        } else {
                          dupItems = [];
                        }

                        setCheckedItems(dupItems);
                      }}
                      sx={{
                        color: "Brand.500",
                        "&.Mui-checked": {
                          color: "Brand.500",
                        },
                      }}
                    />
                  }
                  label="Pilih Semua"
                />
              </Box>
              <Box display="flex" flexDirection="row" alignContent="center">
                <Typography sx={{ marginRight: "5px" }}>
                  Kartu per halaman
                </Typography>
                <FormControl sx={{ marginRight: "30px" }}>
                  <Select
                    sx={{
                      borderRadius: "5px",
                      minWidth: "68px",
                      height: "28px",
                      backgroundColor: "white",
                      borderColor: "Brand.500",
                    }}
                    onChange={cardHandle}
                    value={cardPerPage}
                    autoWidth
                    displayEmpty
                  >
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                  </Select>
                </FormControl>
                <Stack spacing={2}>
                  <Pagination count={10} color="primary" siblingCount={0} />
                </Stack>
              </Box>
            </Box>

            {/* Product Component */}
            {order.map((val, idx) => {
              return (
                <CardOrder
                  setCartChecked={() => {
                    let dupItems = [...checkedItems];

                    if (dupItems.includes(idx)) {
                      dupItems = dupItems.filter((oldItem) => oldItem !== idx);
                    } else {
                      dupItems.push(idx);
                    }
                    setCheckedItems(dupItems);
                  }}
                  checked={checkedItems.includes(idx)}
                />
              );
            })}

            <CardOrder
              status="Pesanan Baru"
              orderCode="HTMED129X"
              orderTime="10 Jan 2022, 10:45 WIB"
              expiredResponse="12 Jan 2022, 10:45 WIB"
              productName="Kursi"
              productQty={3}
              productPrice={55000}
              productOrderQty={2}
              buyersName="Panji"
              buyersAddress="Jl. Erlangga XII No.25, RT.5/RW.3, Selong, Kec. Kby. Baru, Kota Jakarta Selatan"
              courier="Grab-Sameday"
              totalPrice={3 * 55000}
            />
            <CardOrder
              isObatResep
              status="Pesanan Baru"
              orderCode="HTMED129X"
              orderTime="10 Jan 2022, 10:45 WIB"
              expiredResponse="12 Jan 2022, 10:45 WIB"
              productName="Kursi"
              productQty={3}
              productPrice={55000}
              productOrderQty={2}
              buyersName="Panji"
              buyersAddress="Jl. Erlangga XII No.25, RT.5/RW.3, Selong, Kec. Kby. Baru, Kota Jakarta Selatan"
              courier="Grab-Sameday"
              totalPrice={3 * 55000}
            />
          </Grid>
        </Grid>
      ) : (
        <Box>
          <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
            Pesanan Baru
          </Typography>
          <Divider orientation="horizontal" sx={{ marginY: "40px" }} />
          <Box
            width="100%"
            height="100%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Image src={Group} />
            <Typography
              sx={{ marginTop: "20px", fontSize: "20px", color: "Brand.500" }}
            >
              Belum Ada Pesanan yang baru
            </Typography>
          </Box>
        </Box>
      )}
    </>
  );
};

export default PesananBaruPage;
