import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Button,
  IconButton,
  styled,
  TableFooter,
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
      return <StyledTableCell align="center">{val}</StyledTableCell>;
    });
  };

  const renderTableBody = () => {
    return (
      rowPerPage > 0
        ? rows.slice(page * rowPerPage, page * rowPerPage + rowPerPage)
        : rows
    ).map((val) => {
      return (
        <StyledTableRow>
          <StyledTableCell component="th" scope="row">
            {val.id}
          </StyledTableCell>
          <StyledTableCell align="center">{val.namaObat}</StyledTableCell>
          <StyledTableCell align="center">{val.noObat}</StyledTableCell>
          <StyledTableCell align="center">{val.noBpom}</StyledTableCell>
          <StyledTableCell align="center">{val.kategori}</StyledTableCell>
          <StyledTableCell align="center">{val.stok}</StyledTableCell>
          <StyledTableCell align="center">{val.satuan}</StyledTableCell>
          <StyledTableCell align="center">
            Rp. {val.nilaiBarang.toLocaleString()}
          </StyledTableCell>
          <StyledTableCell align="center">
            Rp. {val.nilaiJual.toLocaleString()}
          </StyledTableCell>
          <StyledTableCell align="center">
            <Button variant="outlined">Liat Detail</Button>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </StyledTableCell>
        </StyledTableRow>
      );
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>{renderTableHead()}</TableRow>
        </TableHead>
        <TableBody>{renderTableBody()}</TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[1, 10, 20]}
              count={rows.length}
              rowsPerPage={rowPerPage}
              page={page}
              onRowsPerPageChange={handleChangeRowsPerPage}
              onPageChange={handleChangePage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default TableData;
