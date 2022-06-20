import {
  Box,
  Breadcrumbs,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import ProductCard from "components/ProductCard";
import Sidebar from "components/Sidebar";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const ProductList = () => {
  const router = useRouter();
  const [filter, setFilter] = useState("");
  const handleChange = (event) => {
    setFilter(event.target.value);
  };
  return (
    <Grid container sx={{ mt: "44px" }}>
      <Grid item xs={1} sm={3}>
        <Stack sx={{ ml: "90px" }}>
          <Box sx={{ display: "flex", flexDirection: "column", mt: 2, mr: 8 }}>
            <Box sx={{ mb: 5 }}>
              <Breadcrumbs sx={{ "&:hover": { cursor: "pointer" } }}>
                <Link underline="hover" href="/">
                  <Typography
                    sx={{
                      color: router.pathname === "/" ? "Brand.500" : "#213360",
                      fontWeight: router.pathname === "/" ? 700 : 400,
                    }}
                  >
                    Beranda
                  </Typography>
                </Link>
                <Link underline="hover" href="/">
                  <Typography
                    sx={{
                      color: router.pathname === "/" ? "Brand.500" : "#213360",
                      fontWeight: router.pathname === "/" ? 700 : 400,
                    }}
                  >
                    Kategori
                  </Typography>
                </Link>
                <Link underline="hover" href="/product-list">
                  <Typography
                    sx={{
                      color:
                        router.pathname === "/product-list"
                          ? "Brand.500"
                          : "#213360",
                      fontWeight:
                        router.pathname === "/product-list" ? 700 : 400,
                    }}
                  >
                    Obat
                  </Typography>
                </Link>
              </Breadcrumbs>
            </Box>
          </Box>
          <Sidebar />
        </Stack>
      </Grid>
      <Grid item xs={11} sm={9}>
        <Stack sx={{ mr: "96px", ml: "48px" }}>
          <Box
            sx={{
              width: "100%",
              borderBottom: "1px solid #D5D7DD",
              mb: "34px",
            }}
          >
            <Typography
              sx={{ fontWeight: 700, fontSize: "24px", paddingY: "16px" }}
            >
              Obat
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              sx={{ fontSize: "14px", fontWeight: 400, color: "#737A8D" }}
            >
              45 Produk di Vitamin & Suplemen
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "#737A8D",
                  mr: "17px",
                }}
              >
                Urutkan
              </Typography>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <Select value={filter} onChange={handleChange}>
                  <MenuItem value="Terbaru">Terbaru</MenuItem>
                  <MenuItem value="Termahal">Termahal</MenuItem>
                  <MenuItem value="Termurah">Termurah</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Grid
            container
            rowSpacing="24px"
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6} sm={4} md={3}>
              <ProductCard />
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
              <ProductCard />
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
              <ProductCard />
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
              <ProductCard />
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
              <ProductCard />
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
              <ProductCard />
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
              <ProductCard />
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
              <ProductCard />
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
              <ProductCard />
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
              <ProductCard />
            </Grid>
          </Grid>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default ProductList;
