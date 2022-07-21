import Image from "next/image";
import { FaTwitter, FaFacebookF } from "react-icons/fa";
import { RiInstagramFill, RiWhatsappFill } from "react-icons/ri";
import { Grid, Typography, Box } from "@mui/material";
import Healthymed from "public/Images/healthymed.png";
import MailIcon from "@mui/icons-material/Mail";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";

const Footer = () => {
  return (
    <Box direction="column" fontFamily="sans-serif" color="#213360">
      <Grid spacing={3} columns={13} container paddingX="96px" paddingY="60px">
        <Grid item xs={4}>
          <Box height="50px" marginBottom="35px">
            <Image src={Healthymed} />
          </Box>
          <Box display="flex" flexDirection="row" height="48px">
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
        <Grid item xs={3}>
          <Typography marginBottom="30px">Tentang Kami</Typography>
          <Typography marginBottom="30px">FAQ</Typography>
          <Typography marginBottom="30px">Kebijakan Privasi</Typography>
          <Typography marginBottom="30px">Syarat & Ketentuan</Typography>
          <Typography marginBottom="30px">Karir</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography marginBottom="30px">Blog</Typography>
          <Typography marginBottom="30px">Cara Belanja</Typography>
          <Typography marginBottom="30px">Promo</Typography>
          <Typography marginBottom="30px">Diagnosis</Typography>
        </Grid>
        <Grid item xs={3}>
          <Box display="flex" flexDirection="column" justifyContent="flex-end">
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
          </Box>
        </Grid>
      </Grid>
      <Box paddingY="35px" height="90px" sx={{ backgroundColor: "Brand.500" }}>
        <Typography
          variant="h6"
          color="#F5F6F9"
          alignSelf="center"
          textAlign="center"
        >
          Made by JCWD 2002 02
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
