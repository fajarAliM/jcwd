import { Box, Typography } from "@mui/material";
// import Image from "next/image";
import KategoriBox from "./KategoriBox";
import Obat from "../../public/Images/Obat.png";
import Herbal from "../../public/Images/Herbal.png";
import Nutrition from "../../public/Images/Nutrition.png";
import Vitamin from "../../public/Images/Vitamin.png";
import AlatKesehatan from "../../public/Images/AlatKesehatan.png";
import PerawatanTubuh from "../../public/Images/PerawatanTubuh.png";

const Kategori = () => {
  return (
    <Box mt="44px" mb="56px">
      <Typography variant="h5">Kategori</Typography>
      <Box display="flex" mt="28px">
        <KategoriBox imgUrl={Obat} imgAlt="obat" title="Obat - Obatan" />
        <KategoriBox imgUrl={Herbal} imgAlt="Herbal" title="Herbal" />
        <KategoriBox imgUrl={Nutrition} imgAlt="Nutrition" title="Nutrisi" />
        <KategoriBox
          imgUrl={Vitamin}
          imgAlt="Vitamin"
          title="Vitamin & Suplemen"
        />
        <KategoriBox
          imgUrl={AlatKesehatan}
          imgAlt="AlatKesehatan"
          title="Alat Kesehatan"
        />
        <KategoriBox
          imgUrl={PerawatanTubuh}
          imgAlt="PerawatanTubuh"
          title="Perawatan Tubuh"
        />
      </Box>
    </Box>
  );
};

export default Kategori;
