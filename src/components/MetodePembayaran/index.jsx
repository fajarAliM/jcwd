/* eslint-disable import/newline-after-import */
import Image from "next/image";
import { Typography, Box } from "@mui/material";
import ShopeePay from "../../public/Images/ShopeePay.png";
import BCA from "../../public/Images/BCA.png";
import Gopay from "../../public/Images/Gopay.png";
import Mandiri from "../../public/Images/Mandiri.png";
import OVO from "../../public/Images/OVO.png";
import PermataBank from "../../public/Images/PermataBank.png";
const MetodePembayaran = () => {
  return (
    <Box height="160px" sx={{ backgroundColor: "#F6FAFB", color: "#213360" }}>
      <Typography
        fontWeight={700}
        textAlign="center"
        marginTop="24px"
        variant="h6"
        marginBottom="14px"
      >
        Metode Pembayaran
      </Typography>
      <Box display="flex" alignContent="center" justifyContent="center">
        <Box marginRight="46px">
          <Image layout="fixed" src={BCA} />
        </Box>
        <Box marginRight="47px">
          <Image layout="fixed" src={Mandiri} />
        </Box>
        <Box marginRight="50px">
          <Image layout="fixed" src={PermataBank} />
        </Box>
        <Box marginRight="48px">
          <Image layout="fixed" src={OVO} />
        </Box>
        <Box marginRight="59px">
          <Image layout="fixed" src={Gopay} />
        </Box>
        <Box marginTop="-13px">
          <Image layout="fixed" src={ShopeePay} />
        </Box>
      </Box>
    </Box>
  );
};

export default MetodePembayaran;
