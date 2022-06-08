/* eslint-disable import/order */
import Image from "next/image";
import { FaTwitter, FaFacebookF } from "react-icons/fa";
import { RiInstagramFill, RiWhatsappFill } from "react-icons/ri";
import { Grid, Typography, Box, Stack } from "@mui/material";
import Healthymed from "public/Images/Healthymed.png";
import MailIcon from "@mui/icons-material/Mail";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";

const Footer = () => {
  return (
    <Stack direction="column" fontFamily="sans-serif" color="#213360">
      <Box height="385px" paddingX="96px" paddingY="60px">
        <Grid container>
          <Grid>
            <Box width="240px" height="50px" marginBottom="35px">
              <Image src={Healthymed} />
            </Box>
            <Box display="flex" flexDirection="row" width="300px" height="48px">
              <RiWhatsappFill fontSize="48px" />
              <Box marginLeft="20px">
                <Typography fontSize="14px" fontWeight="bold">
                  Chat Whatsapp
                </Typography>
                <Typography fontSize="16px">+62-0123-4567</Typography>
              </Box>
            </Box>
            <Box
              marginTop="12px"
              display="flex"
              flexDirection="row"
              width="300px"
              height="48px"
            >
              <MailIcon sx={{ height: "48px", width: "48px" }} />
              <Box marginLeft="20px">
                <Typography fontSize="14px" fontWeight="bold">
                  Email
                </Typography>
                <Typography fontSize="16px">contact@healthymed.com</Typography>
              </Box>
            </Box>
            <Box
              marginTop="12px"
              display="flex"
              flexDirection="row"
              width="300px"
              height="48px"
            >
              <PhoneInTalkIcon sx={{ height: "48px", width: "48px" }} />
              <Box marginLeft="20px">
                <Typography fontSize="14px" fontWeight="bold">
                  Call Center
                </Typography>
                <Typography fontSize="16px">+62-0123-4567</Typography>
              </Box>
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
      <Box height="95px" sx={{ backgroundColor: "Brand.500" }}>
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
