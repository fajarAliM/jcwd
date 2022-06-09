const { Box, Typography, Divider, Button } = require("@mui/material");
const { default: DragAndDrop } = require("components/DragAndDropZone");

const UploadResep = () => {
  return (
    <Box paddingX="250px">
      <Typography mt="54px" fontWeight="bold" variant="h4">
        Kirim Resep
      </Typography>
      <Box display="flex" mt="8px">
        <Typography>
          Tak perlu antre & obat langsung dikirimkan ke lokasi anda!
        </Typography>
        <Typography fontWeight="bold">
          Foto tidak boleh lebih dari 10 MB.
        </Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        mt="38px"
        boxShadow={2}
        paddingY="28px"
        paddingX="66px"
        borderRadius="16px"
      >
        <Typography color="#737A8D">Unggah Resep Dokter</Typography>
        <Divider sx={{ my: "22px" }} />
        <DragAndDrop />
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          mt="38px"
        >
          <Button
            variant="outlined"
            sx={{ marginRight: "28px", width: "125px", height: "42px" }}
          >
            Batal
          </Button>
          <Button variant="contained" sx={{ width: "125px", height: "42px" }}>
            Unggah
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default UploadResep;
