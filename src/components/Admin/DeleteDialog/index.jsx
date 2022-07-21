import axiosInstance from "config/api";
import { useSnackbar } from "notistack";

const {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} = require("@mui/material");

const DeleteDialog = ({ open, handleClose, data, dataDeleted }) => {
  const { enqueueSnackbar } = useSnackbar();

  const deleteProduct = async () => {
    try {
      const res = await axiosInstance.delete(
        `/admin/product/${data.productId}`
      );

      enqueueSnackbar(res?.data?.message, { variant: "success" });
      handleClose();
      dataDeleted(res.data.message);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      enqueueSnackbar(err?.response?.data?.message, { variant: "error" });
      handleClose();
    }
  };
  return (
    <Dialog open={open} handleClose={handleClose}>
      <DialogTitle>Alert!</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Produk {data.namaObat} ini akan terhapus secara permanen. Apakah Anda
          yakin ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Kembali
        </Button>
        <Button variant="contained" onClick={deleteProduct} autoFocus>
          Yakin
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
