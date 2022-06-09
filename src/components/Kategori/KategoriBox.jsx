import { Paper, Typography } from "@mui/material";
import Image from "next/image";

const KategoriBox = ({ imgUrl, imgAlt, title }) => {
  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "195px",
        height: "119px",
        borderRadius: "16px",
        mx: "8px",
      }}
    >
      <Image width="64px" height="64px" src={imgUrl} alt={imgAlt} />
      <Typography mt="12px" variant="subtitle2" fontWeight="bold">
        {title}
      </Typography>
    </Paper>
  );
};

export default KategoriBox;
