import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Stack,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCallback, useState, useEffect } from "react";
import axiosInstance from "config/api";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { deleteCart, editQty } from "redux/reducer/cart";
import { useSnackbar } from "notistack";

const UserCart = ({ checked = false, setCartChecked, val, indexInRedux }) => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [listStock, setListStock] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      quantity: val.quantity,
    },
    onSubmit: () => {
      // eslint-disable-next-line no-console
      console.log("berhasil!");
    },
    validationSchema: Yup.object().shape({
      quantity: Yup.number().required().min(1),
    }),
  });

  const debounceQtyInputHandler = useCallback(
    _.debounce(async (value) => {
      await axiosInstance.patch(`/cart/edit-quantity/${val.id}`, {
        quantity: value,
      });

      dispatch(
        editQty({
          idx: indexInRedux,
          quantity: value,
        })
      );
    }, 1500),
    []
  );

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

    debounceQtyInputHandler(quantity);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const deleteProduct = async () => {
    try {
      await axiosInstance.delete(`/cart/delete-cart/${val.id}`);
      dispatch(deleteCart(indexInRedux));
      enqueueSnackbar(
        `${val.product.nama_produk} berhasil di hapus dari keranjang`,
        { variant: "success" }
      );
      handleCloseModal();
    } catch (err) {
      enqueueSnackbar(err?.response?.data?.message, { variant: "error" });
    }
  };

  const fetchProductData = async () => {
    try {
      const res = await axiosInstance.get(`/product/${val.productId}`);

      setListStock(res.data.result.stocks);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const totalStock = () => {
    return listStock?.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.jumlah_stok;
    }, 0);
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", mt: "28px" }}>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                onClick={setCartChecked}
                checked={checked}
                sx={{
                  color: "Brand.500",
                  "&.Mui-checked": {
                    color: "Brand.500",
                  },
                }}
              />
            }
          />
        </FormGroup>
        <img
          src={val.product.produk_image_url[0]}
          alt="imageUrl"
          width="50px"
        />
        <Stack width="100%" pl={4}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography sx={{ fontSize: "16px" }}>
              {val.product.nama_produk}
            </Typography>
            <Stack direction="row" alignItems="center" alignSelf="start">
              <Typography
                sx={{
                  textDecoration: "line-through",
                  color: "#B4B9C7",
                  fontSize: "14px",
                  mr: 2,
                }}
                display={val.product.diskon !== "0" ? "block" : "none"}
              >
                {`Rp ${(
                  val.product.harga_jual * formik.values.quantity
                ).toLocaleString()}`}
              </Typography>
              <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                Rp{" "}
                {(
                  val.product.harga_jual * formik.values.quantity -
                  (parseInt(val.product.diskon) / 100) *
                    val.product.harga_jual *
                    formik.values.quantity
                ).toLocaleString()}
              </Typography>
            </Stack>
          </Box>
          <Typography sx={{ fontSize: "12px", color: "#213360" }}>
            {formik.values.quantity} {val.product.satuan}
          </Typography>
        </Stack>
      </Box>
      <Stack direction="horizontal" width="100%" justifyContent="end">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: "28px",
          }}
        >
          <Button
            variant="outlined"
            sx={{
              border: "transparent",
              "&:hover": {
                border: 0,
              },
            }}
          >
            Pindahkan Ke Wishlist
          </Button>

          <IconButton
            sx={{ color: "black", mr: "5px" }}
            onClick={handleOpenModal}
          >
            <DeleteIcon sx={{ fontSize: "20px" }} />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              border: "1px solid #FF6600",
              borderRadius: 3,
            }}
          >
            <Button
              onClick={() => qtyHandler("decrement")}
              variant="outlined"
              sx={() => ({
                border: 0,
                fontWeight: "bold",
                "&:hover": {
                  border: 0,
                },
                padding: "10px 10% !important",
              })}
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
                padding: "10px 10% !important",
              }}
              disabled={totalStock() === formik.values.quantity}
            >
              +
            </Button>
          </Box>
        </Box>
      </Stack>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Alert!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Hapus {val.product.nama_produk} dari keranjang?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleCloseModal}>
            Batal
          </Button>
          <Button variant="contained" onClick={() => deleteProduct()} autoFocus>
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default UserCart;
