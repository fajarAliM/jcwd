import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  styled,
  TablePagination,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import ModalEditObat from "../ModalEditObat";
import DeleteDialog from "../DeleteDialog";

const TableData = ({
  columns,
  rows,
  rowPerPage,
  page,
  handleChangeRowsPerPage,
  handleChangePage,
  totalData,
  categoriesData,
}) => {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const renderTableHead = () => {
    return columns.map((val) => {
      return <StyledTableCell align="center">{val.props}</StyledTableCell>;
    });
  };

  const [editProduk, setEditProduk] = useState(false);
  const [deleteProduk, setDeleteProduk] = useState(false);
  const [produkData, setProdukData] = useState({});
  const [selectedId, setSelectedId] = useState(0);
  const [produkImages, setProdukImages] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const open = (id) => {
    setSelectedId(id);
  };

  const renderTableBody = () => {
    return rows.map((val) => {
      return (
        <TableRow
          sx={{
            ":nth-of-type(even)": {
              backgroundColor: "#D3D3D3",
            },
          }}
        >
          <TableCell align="center" component="th" scope="row">
            {val.id}
          </TableCell>
          <TableCell align="center">{val.namaObat || "-"}</TableCell>
          <TableCell align="center">{val.noObat || "-"}</TableCell>
          <TableCell align="center">{val.noBpom || "-"}</TableCell>
          <TableCell align="center">{val.kategori || "-"}</TableCell>
          <TableCell align="center">
            {val.stokTypes.reduce((init, obj) => {
              if (obj.stockStatusId !== 1) {
                return init;
              }
              return init + obj.jumlah_stok;
            }, 0) || "-"}
          </TableCell>
          <TableCell align="center">
            {val.stokTypes.reduce((init, obj) => {
              if (obj.stockStatusId !== 2) {
                return init;
              }
              return init + obj.jumlah_stok;
            }, 0) || "-"}
          </TableCell>
          <TableCell align="center">
            {val.stokTypes.reduce((init, obj) => {
              if (obj.stockStatusId !== 3) {
                return init;
              }
              return init + obj.jumlah_stok;
            }, 0) || "-"}
          </TableCell>
          <TableCell align="center">{val.stok || "-"}</TableCell>
          <TableCell align="center">{val.satuan || "-"}</TableCell>
          <TableCell align="center">
            Rp. {val.nilaiJual.toLocaleString() || "-"}
          </TableCell>
          <TableCell align="center">
            <IconButton
              onClick={(event) => {
                setSelectedId(val.id);
                setAnchorEl(event.currentTarget);
              }}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={val.id === selectedId}
              onClose={() => open(0)}
            >
              <MenuItem>Lihat Detail</MenuItem>
              <MenuItem>Tambah Stok</MenuItem>
              <MenuItem
                onClick={() => {
                  setEditProduk(true);
                  setProdukData(val);
                  setProdukImages(val?.obatImages);
                  setSelectedId(0);
                }}
              >
                Ubah Produk
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setDeleteProduk(true);
                  setProdukData(val);
                  setSelectedId(0);
                }}
              >
                Hapus Produk
              </MenuItem>
            </Menu>
          </TableCell>
        </TableRow>
      );
    });
  };

  return (
    <>
      <DeleteDialog
        open={deleteProduk}
        handleClose={() => {
          setDeleteProduk(false);
          setSelectedId(0);
        }}
        data={produkData}
      />
      <ModalEditObat
        open={editProduk}
        data={produkData}
        handleClose={() => {
          setEditProduk(false);
          setSelectedId(0);
        }}
        categories={categoriesData}
        produkImages={produkImages}
      />
      <Box sx={{ overflow: "scroll" }} paddingRight="32px">
        <TableContainer
          component={Paper}
          sx={{ minWidth: "1450px", maxHeight: "100%" }}
        >
          <Table
            sx={{ overflow: "auto", width: "100%" }}
            aria-label="customized table"
            stickyHeader
          >
            <TableHead>
              <TableRow>{renderTableHead()}</TableRow>
            </TableHead>
            <TableBody>{renderTableBody()}</TableBody>
          </Table>
        </TableContainer>
      </Box>
      <TablePagination
        sx={{ marginRight: "32px" }}
        component="div"
        rowsPerPageOptions={[1, 10, 20]}
        count={totalData}
        rowsPerPage={rowPerPage}
        page={page}
        onRowsPerPageChange={handleChangeRowsPerPage}
        onPageChange={handleChangePage}
      />
    </>
  );
};

export default TableData;
