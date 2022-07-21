import { Box, Typography } from "@mui/material";
// import Image from "next/image";
import Link from "next/link";
import KategoriBox from "./KategoriBox";
import Obat from "../../public/Images/Obat.png";
import Herbal from "../../public/Images/Herbal.png";
import Nutrition from "../../public/Images/Nutrition.png";
import Vitamin from "../../public/Images/Vitamin.png";
import AlatKesehatan from "../../public/Images/AlatKesehatan.png";
import PerawatanTubuh from "../../public/Images/PerawatanTubuh.png";

const Kategori = () => {
  return (
    <Box mt="44px">
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h5">Kategori</Typography>
        <Link href="/product-list">
          <Typography
            color="Brand.500"
            sx={{
              ":hover": {
                cursor: "pointer",
              },
            }}
          >
            Lihat Semua
          </Typography>
        </Link>
      </Box>
      <Box display="flex" mt="28px">
        <KategoriBox imgUrl={Obat} imgAlt="obat" title="Obat - Obatan" id="1" />
        <KategoriBox imgUrl={Herbal} imgAlt="Herbal" title="Herbal" id="3" />
        <KategoriBox
          imgUrl={Nutrition}
          imgAlt="Nutrition"
          title="Nutrisi"
          id="2"
        />
        <KategoriBox
          imgUrl={Vitamin}
          imgAlt="Vitamin"
          title="Vitamin & Suplemen"
          id="4"
        />
        <KategoriBox
          imgUrl={AlatKesehatan}
          imgAlt="AlatKesehatan"
          title="Alat Kesehatan"
          id="5"
        />
        <KategoriBox
          imgUrl={PerawatanTubuh}
          imgAlt="PerawatanTubuh"
          title="Perawatan Tubuh"
          id="6"
        />
      </Box>
    </Box>
  );
};

export default Kategori;
