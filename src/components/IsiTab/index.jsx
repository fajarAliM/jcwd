/* eslint-disable eqeqeq */
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useState } from "react";

const IsiTab = ({ renderTransactionList, setSortBy, setSortDir, setPage }) => {
  const [sortInput, setSortInput] = useState("");

  const sortButton = () => {
    if (sortInput == "Terbaru") {
      setSortBy("id");
      setSortDir("DESC");
    } else if (sortInput == "Lowest Price") {
      setSortBy("total_price");
      setSortDir("ASC");
    } else if (sortInput == "Highest Price") {
      setSortBy("total_price");
      setSortDir("DESC");
    } else if (sortInput == "") {
      setSortBy("");
      setSortDir("");
    }
    setPage(1);
  };

  const sortInputHandler = (event) => {
    const { value } = event.target;
    setSortInput(value);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: "46px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontWeight: 700, fontSize: "14px", mr: "10px" }}>
            Jenis Obat
          </Typography>
          <Button variant="outlined" sx={{ mr: "10px", borderRadius: "17px" }}>
            Semua Obat
          </Button>
          <Button variant="outlined" sx={{ mr: "10px", borderRadius: "17px" }}>
            Obat Resep
          </Button>
          <Button
            variant="contained"
            sx={{
              "&:hover": { border: 0 },
              mr: "10px",
              borderRadius: "17px",
            }}
          >
            Obat Bebas
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ color: "#737A8D", fontSize: "14px", fontWeight: 400 }}
          >
            Urutkan
          </Typography>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <Select onChange={sortInputHandler}>
              <MenuItem value="Terbaru">Terbaru</MenuItem>
              <MenuItem value="Highest Price">Termahal</MenuItem>
              <MenuItem value="Lowest Price">Termurah</MenuItem>
            </Select>
          </FormControl>
          <Button
            onClick={sortButton}
            variant="contained"
            sx={{
              "&:hover": { border: 0 },
              mr: "10px",
            }}
          >
            Cari
          </Button>
        </Box>
      </Box>
      {renderTransactionList()}
    </>
  );
};

export default IsiTab;
