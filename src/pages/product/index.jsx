import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  Container,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ProductCard from "components/ProductCard";
import { useFormik } from "formik";
import * as Yup from "yup";

const ProductPage = () => {
  const formik = useFormik({
    initialValues: {
      quantity: 1,
    },
    onSubmit: () => {
      // eslint-disable-next-line no-console
      console.log("berhasil!");
    },
    validationSchema: Yup.object().shape({
      quantity: Yup.number().required().min(1),
    }),
  });

  const qtyHandler = (status) => {
    if (status === "increment") {
      if (formik.values.quantity === "") {
        formik.setFieldValue("quantity", 1);
        return;
      }
      if (formik.values.quantity >= 10) return;
      // eslint-disable-next-line radix
      formik.setFieldValue("quantity", parseInt(formik.values.quantity) + 1);
    } else if (status === "decrement") {
      if (formik.values.quantity < 1) return;

      formik.setFieldValue("quantity", formik.values.quantity - 1);
    }
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          mt: 5,
          borderBottom: "1px solid #D5D7DD",
        }}
      >
        {/* LEFT SIDE */}
        <Box sx={{ display: "flex", flexDirection: "column", mt: 2, mr: 10 }}>
          <Box sx={{ mb: 5 }}>
            <Breadcrumbs sx={{ fontSize: "18px" }}>
              <Link underline="hover" color="Brand.500" href="/">
                Beranda
              </Link>
              <Link underline="hover" color="Brand.500" href="/">
                Kategori
              </Link>
              <Link underline="hover" color="Brand.500" href="/">
                Obat
              </Link>
            </Breadcrumbs>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Card
              sx={{
                width: "405px",
                height: "300px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                sx={{
                  height: "230px",
                  width: "220px",
                }}
                src="https://images.tokopedia.net/img/cache/700/product-1/2020/7/10/99397509/99397509_442d6651-7a64-4c6b-8c26-2f918a7ca1d0_690_690.jpg"
              />
            </Card>
            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                startIcon={<ChatIcon />}
                sx={{
                  "&:hover": {
                    boxShadow: 0,
                    border: 0,
                  },
                  borderRadius: 5,
                  mr: 2,
                  boxShadow: 0,
                }}
              >
                Chat Admin
              </Button>
              <Button
                variant="contained"
                startIcon={<ShareIcon />}
                sx={{
                  "&:hover": {
                    boxShadow: 0,
                    border: 0,
                  },
                  borderRadius: 5,
                  boxShadow: 0,
                }}
              >
                Bagikan
              </Button>
            </Box>
          </Box>
        </Box>

        {/* RIGHT SIDE */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            mt: 10,
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            Obat Kuat Kuda Mesir
          </Typography>
          <Typography
            sx={{
              fontSize: "22px",
              fontWeight: "light",
              mb: 2,
            }}
          >
            Obat Kuat Kuda Mesir 2 Tablet
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontWeight: 500, fontSize: "24px" }}>
              Rp 25.000
            </Typography>
            <Typography sx={{ ml: 2, fontSize: "14px" }}>
              / Strip (2 Tablet)
            </Typography>
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <Typography
              sx={{ textDecoration: "line-through", color: "#737A8D", mr: 2 }}
            >
              Rp 30.000
            </Typography>
            <Box
              sx={{
                border: "1px solid",
                color: "#FF6600",
                borderRadius: 1,
                width: "40px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Typography>15%</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                border: "1px solid #FF6600",
                maxWidth: 180,
                borderRadius: 3,
                mt: 2,
              }}
            >
              <Button
                onClick={() => qtyHandler("decrement")}
                variant="outlined"
                sx={{
                  border: 0,
                  fontWeight: "bold",
                  "&:hover": {
                    border: 0,
                  },
                }}
              >
                -
              </Button>
              <Typography
                sx={{
                  border: 0,
                  color: "#FF6600",
                  width: "50px",
                  textAlign: "center",
                }}
              >
                {formik.values.quantity}
              </Typography>
              <Button
                onClick={() => qtyHandler("increment")}
                variant="outlined"
                sx={{
                  border: 0,
                  fontWeight: "bold",
                  "&:hover": {
                    border: 0,
                  },
                }}
              >
                +
              </Button>
            </Box>
            <Typography
              sx={{ color: "#737A8D", ml: 2, mt: 2, fontSize: "12px" }}
            >
              Sisa 10 Strips
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", mt: 3 }}>
            <Button variant="outlined" startIcon={<ShoppingCartOutlinedIcon />}>
              Keranjang
            </Button>
            <Button
              variant="contained"
              sx={{
                boxShadow: 0,
                ml: 1,
                width: "145px",
                "&:hover": {
                  boxShadow: 0,
                  border: 0,
                },
              }}
            >
              Beli
            </Button>
            <Button variant="outlined" sx={{ ml: 1, maxWidth: "20px" }}>
              <FavoriteBorderIcon sx={{ fontSize: "20px" }} />
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              borderTop: "1px solid black",
              borderBottom: "1px solid black",
              alignItems: "center",
              color: "#213360",
              mt: 5,
              fontSize: "14px",
            }}
          >
            <Typography sx={{ mt: 1, mb: 1 }}>Deskripsi</Typography>
          </Box>
          <Grid
            container
            rowSpacing={3}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ mb: 3, mt: 1 }}
          >
            <Grid item xs={6}>
              <Typography>Indikasi/Kegunaan</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                Untuk membuat pria semakin kuat di ranjang dan istri senang
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            rowSpacing={3}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ mb: 3 }}
          >
            <Grid item xs={6}>
              <Typography>Kandungan/Komposisi</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>Royal Gingseng</Typography>
            </Grid>
          </Grid>
          <Grid
            container
            rowSpacing={3}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ mb: 3 }}
          >
            <Grid item xs={6}>
              <Typography>Kemasan</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>Dus 10 x 2 Tablet</Typography>
            </Grid>
          </Grid>
          <Grid
            container
            rowSpacing={3}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ mb: 3 }}
          >
            <Grid item xs={6}>
              <Typography>Cara Penyimpanan</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                Simpan di saku anda untuk jaga-jaga bila istri mau beraksi
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            rowSpacing={3}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ mb: 3 }}
          >
            <Grid item xs={6}>
              <Typography>Principal</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>Haji Mamat</Typography>
            </Grid>
          </Grid>
          <Grid
            container
            rowSpacing={3}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ mb: 3 }}
          >
            <Grid item xs={6}>
              <Typography>Nomor Ijin Edar (NIE)</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>XXXXXXXXX</Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* BOTTOM SIDE */}
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography sx={{ fontSize: "25px", color: "#213360", mt: 2, ml: 15 }}>
          Produk Terkait
        </Typography>
        <Box sx={{ ml: 14 }}>
          <ProductCard />
        </Box>
      </Box>
    </Box>
  );
};

export default ProductPage;
