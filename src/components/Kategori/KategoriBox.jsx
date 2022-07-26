import { Paper, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";

const KategoriBox = ({ imgUrl, imgAlt, title, id }) => {
  const router = useRouter();
  return (
    <Paper
      onClick={() => router.push(`/product-list?kategoriTerpilih=${id}`)}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "195px",
        height: "119px",
        borderRadius: "16px",
        mx: "8px",
        ":hover": { cursor: "pointer", backgroundColor: "Brand.200" },
      }}
    >
      <Image width="60px" height="60px" src={imgUrl} alt={imgAlt} />
      <Typography mt="12px" variant="subtitle2" fontWeight="bold">
        {title}
      </Typography>
    </Paper>
  );
};

export default KategoriBox;
