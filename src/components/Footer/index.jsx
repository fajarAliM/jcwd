import Image from "next/image";
import { FaTwitter, FaFacebookF } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { Grid, Typography, Box, Stack } from "@mui/material";
import Healthymed from "../../public/Images/Healthymed.png";
import Frame219 from "../../public/Images/Frame219.png";

const Footer = () => {
  return (
    <Stack direction="column" fontFamily="sans-serif" color="#213360">
      <Box height="385px" paddingX="96px" paddingY="60px">
        <Grid container>
          <Grid>
            <Box width="240px" height="50px" marginBottom="35px">
              <Image src={Healthymed} />
            </Box>
            <Box width="300px" height="168px">
              <Image src={Frame219} />
            </Box>
          </Grid>
          <Grid marginLeft="150px" marginRight="160px">
            <Typography marginBottom="30px">Tentang Kami</Typography>
            <Typography marginBottom="30px">FAQ</Typography>
            <Typography marginBottom="30px">Kebijakan Privasi</Typography>
            <Typography marginBottom="30px">Syarat & Ketentuan</Typography>
            <Typography marginBottom="30px">Karir</Typography>
          </Grid>
          <Grid marginRight="196px">
            <Typography marginBottom="30px">Blog</Typography>
            <Typography marginBottom="30px">Cara Belanja</Typography>
            <Typography marginBottom="30px">Promo</Typography>
            <Typography marginBottom="30px">Diagnosis</Typography>
          </Grid>
          <Grid>
            <Typography
              fontWeight="bold"
              variant="h4"
              component="h4"
              marginBottom="32px"
            >
              Ikuti Kami
            </Typography>
            <Box display="flex" flexDirection="row" marginBottom="12px">
              <FaFacebookF size="20px" />
              <Typography marginLeft="24px">Facebook</Typography>
            </Box>
            <Box display="flex" flexDirection="row" marginBottom="12px">
              <FaTwitter size="20px" />
              <Typography marginLeft="24px">Twitter</Typography>
            </Box>
            <Box display="flex" flexDirection="row" marginBottom="12px">
              <RiInstagramFill size="20px" />
              <Typography marginLeft="24px">Instagram</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box height="95px" sx={{ backgroundColor: "#4F618E" }}>
        <Typography
          variant="h6"
          marginY="35px"
          color="#F5F6F9"
          display="flex"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
        >
          Made by JCWD 2002 02
        </Typography>
      </Box>
    </Stack>
  );
};

export default Footer;
