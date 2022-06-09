import { Box, Typography } from "@mui/material";
import Clipboard from "../../public/Images/clipboad.png";
import Meds from "../../public/Images/meds.png";
import Truck from "../../public/Images/truck.png";
import BannerJaminanBox from "./bannerJaminanBox";

const BannerJaminan = () => {
  return (
    <Box mt="48px" mb="110px">
      <Typography variant="h5">Jaminan Untuk Anda</Typography>
      <Box display="flex" mt="32px">
        <BannerJaminanBox
          imgUrl={Meds}
          imgAlt="Meds"
          caption="Semua produk yang kami jual dijamin asli  & kualitas terbaik untuk anda."
          title="100 % Obat Asli"
        />
        <BannerJaminanBox
          imgUrl={Clipboard}
          imgAlt="Clipboard"
          caption="Kami menjamin akan mengembalikan uang dari selisih perbedaan harga."
          title="Dijamin Hemat"
        />
        <BannerJaminanBox
          imgUrl={Truck}
          imgAlt="Truck"
          caption="Tak perlu antre, Kami kirim ke alamat Anda bebas biaya ongkos kirim!"
          title="Gratis Ongkir"
        />
      </Box>
    </Box>
  );
};

export default BannerJaminan;
