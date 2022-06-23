import { Box, Button, Typography } from "@mui/material";

const CardAlamat = ({
  label,
  isMain = false,
  namaPenerima,
  nomorTelp,
  alamat,
  provinsi,
  kab,
  kec,
  kodePos,
}) => {
  return (
    <Box
      sx={{
        border: isMain ? "1px solid #FF6600" : "1px solid #B4B9C7",
        borderRadius: "10px",
        width: "100%",
        height: "auto",
        padding: 2,
        marginBottom: "10px",
        backgroundColor: isMain ? "Brand.50" : "white",
      }}
    >
      <Box display="flex" alignItems="center">
        <Typography sx={{ fontSize: "12px", fontWeight: "bold" }}>
          {label}
        </Typography>
        {isMain ? (
          <Box
            sx={{
              backgroundColor: "Sidebar.700",
              width: "auto",
              height: "auto",
              fontSize: "10px",
              borderRadius: "2px",
              padding: "2px",
              marginLeft: "5px",
            }}
          >
            Utama
          </Box>
        ) : null}
      </Box>
      <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
        {namaPenerima}
      </Typography>
      <Typography sx={{ fontSize: "12px" }}>{nomorTelp}</Typography>
      <Typography sx={{ fontSize: "12px" }}>
        {alamat}, Kec. {kec}, Kab. {kab}, Provisin {provinsi}, {kodePos}
      </Typography>
      <Box display="flex" marginTop="10px">
        <Button variant="outlined" fullWidth>
          Hapus Alamat
        </Button>
        {isMain ? null : (
          <Button variant="contained" sx={{ marginLeft: "10px" }} fullWidth>
            Alamat Utama
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default CardAlamat;
