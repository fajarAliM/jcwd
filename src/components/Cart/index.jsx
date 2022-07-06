import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormik } from "formik";
import * as Yup from "yup";

const UserCart = ({ checked = false, setCartChecked, val }) => {
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
        <img src={val.product.produk_image_url[0]} alt="imageUrl" />
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
                  val.product.harga_jual * val.quantity
                ).toLocaleString()}`}
              </Typography>
              <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                Rp{" "}
                {(
                  val.product.harga_jual * val.quantity -
                  (parseInt(val.product.diskon) / 100) *
                    val.product.harga_jual *
                    val.quantity
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

          <IconButton sx={{ color: "black", mr: "5px" }}>
            <DeleteIcon sx={{ fontSize: "20px" }} />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              border: "1px solid #FF6600",
              maxWidth: 180,
              borderRadius: 3,
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
        </Box>
      </Stack>
    </Box>
  );
};
export default UserCart;
