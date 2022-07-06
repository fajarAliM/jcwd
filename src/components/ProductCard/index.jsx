/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { Box, Button, Paper, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { styled } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import axiosInstance from "config/api";
import { useDispatch } from "react-redux";
import { addToCart } from "redux/reducer/cart";

const Image = styled("img")({
  maxWidth: "100%",
  maxHeight: "142px",
  objectFit: "scale-down",
});

const ProductCard = ({ nama_produk, harga, diskon, produk_image, id }) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const addToCartButtonHandler = async () => {
    try {
      const addProductToCart = await axiosInstance.post("/cart/add-to-cart", {
        productId: id,
        quantity: 1,
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

  return (
    <Paper
      elevation={2}
      sx={{
        maxWidth: "213px",
        maxHeight: "340px",
        borderRadius: "20px",
        mx: "8px",
        marginBottom: "16px",
        marginTop: "24px",
        pb: "20px",
        "&:hover": { background: "#EFEFEF", cursor: "pointer" },
      }}
    >
      <Box paddingTop="20px" paddingX="40px" position="relative">
        <Box>
          <Image src={produk_image} />
        </Box>
        <Paper
          sx={{
            borderRadius: "50%",
            minWidth: "45px",
            height: "44px",
            top: "20px",
            right: "20px",
            position: "absolute",
            zIndex: 9,
            textAlign: "center",
            paddingTop: "10px",
          }}
          elevation={2}
          bgcolor="gray"
        >
          <FavoriteIcon
            sx={{
              color: "#D5D7DD",
            }}
          />
        </Paper>
      </Box>
      <Box marginX="24px" mt="5px">
        <Box maxHeight="40px" overflow="hidden">
          <Typography
            textOverflow="ellipsis"
            variant="subtitle2"
            component="h2"
            fontWeight="bold"
          >
            {nama_produk}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" mt="5px">
          <Box
            sx={{
              border: "1px solid black",
              borderColor: "red",
              borderRadius: "4px",
            }}
            paddingX="6px"
            paddingY="5px"
            marginRight="8px"
          >
            <Typography fontSize="12px" color="red">
              {diskon}
            </Typography>
          </Box>
          <Box marginLeft="8px">
            <Typography
              color="#B4B9C7"
              sx={{
                textDecoration: "line-through",
              }}
            >
              Rp. {parseInt(harga).toLocaleString()}
            </Typography>
          </Box>
        </Box>
        <Box display="flex" marginTop="7px">
          <Box maxWidth="103px">
            <Typography fontWeight="bold">
              Rp. {parseInt(harga).toLocaleString()}
            </Typography>
          </Box>
          <Typography>/ Pack</Typography>
        </Box>
        <Box mt="10px">
          <Button
            fullWidth
            variant="outlined"
            color="success"
            onClick={addToCartButtonHandler}
          >
            Keranjang
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default ProductCard;
