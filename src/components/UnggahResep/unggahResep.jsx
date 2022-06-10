import { Box, Button, Container, Typography } from "@mui/material";

const UnggahResep = () => {
  return (
    <Container
      sx={{
        mt: 10,
        borderRadius: 5,
        boxShadow: "0px 4px 8px -7px black",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {/* <Image src={Group} width="600px" height="250px"/> */}
        <Box
          component="img"
          sx={{
            height: "100%",
            width: 340,
          }}
          src="https://www.credihealth.com/assets/medicine/banner-7e65f517874a54f7dadb8d96c244d0f337babde9b4a0c060c702e07fa9afd681.svg"
        />
        <Box
          sx={{
            ml: 3,
          }}
        >
          <Typography fontWeight="bold">Punya Resep Dokter?</Typography>
          <Typography color="#525252">
            Tak perlu antre & obat langsung dikirimkan ke lokasi anda! Foto
            tidak boleh lebih dari 10 MB
          </Typography>
        </Box>
        <Button
          variant="contained"
          sx={{
            width: 400,
            height: 50,
            // color: "white",
            // backgroundColor: "#009B90",
            ml: 14,
            mr: 7,
            // borderRadius: 3,
            // textTransform: "none",
            // "&:hover": {
            //   border: 1,
            //   borderColor: "#009B90",
            //   color: "#009B90",
            // },
          }}
        >
          Unggah Resep
        </Button>
      </Box>
    </Container>
  );
};

export default UnggahResep;
