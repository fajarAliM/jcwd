import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  styled,
  TablePagination,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const TableData = ({
  columns,
  rows,
  rowPerPage,
  page,
  handleChangeRowsPerPage,
  handleChangePage,
  totalData,
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

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const renderTableHead = () => {
    return columns.map((val) => {
      return <StyledTableCell align="center">{val.props}</StyledTableCell>;
    });
  };

  const renderTableBody = () => {
    return rows.map((val) => {
      return (
        <StyledTableRow>
          <StyledTableCell align="center" component="th" scope="row">
            {val.id}
          </StyledTableCell>
          <StyledTableCell align="center">
            {val.namaObat || "-"}
          </StyledTableCell>
          <StyledTableCell align="center">{val.noObat || "-"}</StyledTableCell>
          <StyledTableCell align="center">{val.noBpom || "-"}</StyledTableCell>
          <StyledTableCell align="center">
            {val.kategori || "-"}
          </StyledTableCell>
          <StyledTableCell align="center">
            {val.stokTypes.reduce((init, obj) => {
              if (obj.stockStatusId !== 1) {
                return init;
              }
              return init + obj.jumlah_stok;
            }, 0) || "-"}
          </StyledTableCell>
          <StyledTableCell align="center">
            {val.stokTypes.reduce((init, obj) => {
              if (obj.stockStatusId !== 2) {
                return init;
              }
              return init + obj.jumlah_stok;
            }, 0) || "-"}
          </StyledTableCell>
          <StyledTableCell align="center">
            {val.stokTypes.reduce((init, obj) => {
              if (obj.stockStatusId !== 3) {
                return init;
              }
              return init + obj.jumlah_stok;
            }, 0) || "-"}
          </StyledTableCell>
          <StyledTableCell align="center">{val.stok || "-"}</StyledTableCell>
          <StyledTableCell align="center">{val.satuan || "-"}</StyledTableCell>
          <StyledTableCell align="center">
            Rp. {val.nilaiBarang.toLocaleString() || "-"}
          </StyledTableCell>
          <StyledTableCell align="center">
            Rp. {val.nilaiJual.toLocaleString() || "-"}
          </StyledTableCell>
          <StyledTableCell align="center">
            <Button variant="outlined">Liat Detail</Button>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
            <Menu>
              <MenuItem>test</MenuItem>
              <MenuItem>test</MenuItem>
            </Menu>
          </StyledTableCell>
        </StyledTableRow>
      );
    });
  };

  return (
    <>
      <Box sx={{ overflow: "scroll" }} paddingRight="32px">
        <TableContainer
          component={Paper}
          sx={{ minWidth: "1450px", maxHeight: "550px" }}
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
