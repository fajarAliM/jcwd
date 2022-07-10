import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  MenuItem,
  Pagination,
  Select,
  styled,
  Typography,
} from "@mui/material";
import moment from "moment";
import { ceil } from "lodash";

const StockHistoryTable = ({
  count,
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

  const columns = [
    {
      props: "No",
    },
    {
      props: "Tanggal",
    },
    {
      props: "Aktivitas",
    },
    {
      props: "Keluar",
    },
    {
      props: "Masuk",
    },
    {
      props: "Tgl. Kadaluwarsa",
    },
  ];

  const renderTableHead = () => {
    return columns.map((val) => {
      return <StyledTableCell align="center">{val.props}</StyledTableCell>;
    });
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
            {val.nomor}
          </TableCell>
          <TableCell align="center">
            {moment(val.createdAt).format("DD MMMM YYYY") || "-"}
          </TableCell>
          <TableCell align="center">{val.aktivitas || "-"}</TableCell>
          <TableCell align="center">
            {val.aktivitas === "Penerimaan Barang" ? 0 : val.jumlahStok}
          </TableCell>
          <TableCell align="center">
            {val.aktivitas === "Penerimaan Barang" ? val.jumlahStok : 0}
          </TableCell>
          <TableCell align="center">
            {moment(val.expDate).format("DD MMMM YYYY") || "-"}
          </TableCell>
        </TableRow>
      );
    });
  };

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table aria-label="customized table" stickyHeader>
          <TableHead>
            <TableRow>{renderTableHead()}</TableRow>
          </TableHead>
          <TableBody>{renderTableBody()}</TableBody>
        </Table>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          padding="10px"
        >
          <Typography>
            Menampilkan {rows.length + rowPerPage * (page - 1)} dari {count}{" "}
            data
          </Typography>
          <Box display="flex" alignItems="center">
            <Typography marginRight="5px">Baris Per halaman</Typography>
            <Select
              onChange={handleChangeRowsPerPage}
              defaultValue={5}
              size="small"
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
            </Select>
          </Box>
          <Pagination
            defaultPage={1}
            siblingCount={0}
            count={ceil(count / rowPerPage)}
            page={page}
            onChange={handleChangePage}
            color="primary"
          />
        </Box>
      </TableContainer>
    </Box>
  );
};

export default StockHistoryTable;
