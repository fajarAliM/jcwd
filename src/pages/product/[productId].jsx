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
import { useRouter } from "next/router";
import axiosInstance from "config/api";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "redux/reducer/cart";
import { useEffect, useState } from "react";

const ProductPage = ({ productDetail }) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const authSelector = useSelector((state) => state.auth);
  const router = useRouter();
  const [listProdukTerkait, setListProdukTerkait] = useState([]);

  const recordUserActivity = async () => {
    try {
      await axiosInstance.post("/product/record-user-product", {
        product_id: productDetail.id,
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  useEffect(() => {
    recordUserActivity();
  }, []);

  const formik = useFormik({
    initialValues: {
      quantity: 1,
    },
    validationSchema: Yup.object().shape({
      quantity: Yup.number().required().min(1),
    }),
  });

  const qtyHandler = (status) => {
    let { quantity } = formik.values;
    if (status === "increment") {
      if (quantity === "") {
        quantity = 1;
        return;
      }
      if (quantity >= 10) return;
      // eslint-disable-next-line radix
      quantity = parseInt(quantity) + 1;
    } else if (status === "decrement") {
      if (quantity <= 1) return;
      quantity = parseInt(quantity) - 1;
    }
    formik.setFieldValue("quantity", quantity);
  };

  const addToCartButtonHandler = async () => {
    try {
      if (!authSelector.id) {
        router.push("/login");
        return;
      }

      const addProductToCart = await axiosInstance.post("/cart/add-to-cart", {
        productId: router.query.productId,
        quantity: formik.values.quantity,
      });

      const cartInfo = addProductToCart.data;

      dispatch(addToCart(cartInfo.data));

      enqueueSnackbar(cartInfo.message, {
        variant: "success",
      });
    } catch (err) {
      enqueueSnackbar(err?.response?.data?.message, { variant: "error" });
    }
  };

  const hargaJual =
    // eslint-disable-next-line no-unsafe-optional-chaining
    productDetail?.harga_jual -
    // eslint-disable-next-line no-unsafe-optional-chaining
    productDetail?.harga_jual * (productDetail?.diskon / 100);

  const fetchProdukTerkait = async () => {
    try {
      const res = await axiosInstance.get(
        `/product/category/${productDetail.productCategoryId}`
      );

      setListProdukTerkait(res.data.result);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  useEffect(() => {
    if (!listProdukTerkait.length) {
      fetchProdukTerkait();
    }
  }, []);

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
            <Breadcrumbs sx={{ "&:hover": { cursor: "pointer" } }}>
              <Link underline="none" href="/">
                <Typography
                  sx={{
                    color: router.pathname === "/" ? "Brand.500" : "#213360",
                    fontWeight: router.pathname === "/" ? 700 : 400,
                  }}
                >
                  Beranda
                </Typography>
              </Link>
              <Link underline="none" href="/">
                <Typography
                  sx={{
                    color: router.pathname === "/" ? "Brand.500" : "#213360",
                    fontWeight: router.pathname === "/" ? 700 : 400,
                  }}
                >
                  Kategori
                </Typography>
              </Link>
              <Link underline="none" href="/product">
                <Typography
                  sx={{
                    color:
                      router.pathname === "/product" ? "Brand.500" : "#213360",
                    fontWeight: router.pathname === "/product" ? 700 : 400,
                  }}
                >
                  Obat
                </Typography>
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
                src={productDetail?.produk_image_url}
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
            {productDetail?.nama_produk}
          </Typography>
          <Typography
            sx={{
              fontSize: "22px",
              fontWeight: "light",
              mb: 2,
            }}
          >
            {productDetail?.nama_produk}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontWeight: 500, fontSize: "24px" }}>
              Rp{" "}
              {productDetail?.diskon
                ? hargaJual.toLocaleString()
                : productDetail?.harga?.toLocaleString()}
              ,-
            </Typography>
            <Typography sx={{ ml: 2, fontSize: "14px" }}>
              / {productDetail.satuan}
            </Typography>
          </Box>
          {productDetail?.diskon ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{ textDecoration: "line-through", color: "#737A8D", mr: 2 }}
                display={productDetail.diskon === "0" ? "none" : "block"}
              >
                Rp {productDetail.harga_jual?.toLocaleString()},-
              </Typography>
              <Box
                sx={{
                  border:
                    productDetail.diskon === "0"
                      ? "1px transparent"
                      : "1px solid",
                  color: "#FF6600",
                  borderRadius: 1,
                  width: "40px",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Typography
                  display={productDetail.diskon === "0" ? "none" : "block"}
                >
                  {productDetail?.diskon}%
                </Typography>
              </Box>
            </Box>
          ) : null}
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
              Sisa 10 {productDetail.satuan}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", mt: 3 }}>
            <Button
              variant="outlined"
              startIcon={<ShoppingCartOutlinedIcon />}
              onClick={addToCartButtonHandler}
            >
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
              <Typography>-</Typography>
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
              <Typography>-</Typography>
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
              <Typography>-</Typography>
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
              <Typography>-</Typography>
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
              <Typography>-</Typography>
            </Grid>
          </Grid>
          <Grid
            container
            rowSpacing={3}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ mb: 3 }}
          >
            <Grid item xs={6}>
              <Typography>Nomor BPOM</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{productDetail.nomor_bpom || "-"}</Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* BOTTOM SIDE */}
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography sx={{ fontSize: "25px", color: "#213360", mt: 2, ml: 15 }}>
          Produk Terkait
        </Typography>
        <Box sx={{ ml: 14, display: "flex", overflow: "visible" }}>
          {listProdukTerkait?.map((val) => {
            return (
              <ProductCard
                nama_produk={val?.nama_produk}
                harga={val?.harga_jual}
                diskon={val?.diskon}
                produk_image={val?.produk_image_url[0]}
                id={val?.id}
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export async function getServerSideProps(context) {
  const { productId } = context.params;

  const res = await axiosInstance.get(`/product/${productId}`);

  return {
    props: {
      productDetail: res?.data?.result,
    },
  };
}

export default ProductPage;
