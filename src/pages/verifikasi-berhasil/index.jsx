import { Box, Button, Container, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import success from "../../public/Images/success.png";

const UploadBerhasil = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        mt: "160px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "390px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ alignSelf: "center" }}>
          <Image src={success} />
        </Box>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "20px",
            color: "#213360",
            mt: "36px",
          }}
        >
          Verifikasi akun berhasil!
        </Typography>
        <Typography
          sx={{
            color: "#4F618E",
            fontWeight: 400,
            fontSize: "14px",
            textAlign: "center",
          }}
        >
          Login kembali untuk melanjutkan belanja!
        </Typography>
        <Link href="/login">
          <Button
            variant="contained"
            sx={{
              "&:hover": { border: 0 },
              width: "100%",
              mt: "48px",
              height: "46px",
              fontWeight: 700,
              fontSize: "14px",
            }}
          >
            Halaman login
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default UploadBerhasil;
