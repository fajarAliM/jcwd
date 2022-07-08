import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const DragAndDrop = ({
  onDrop,
  preview,
  resepImgFile,
  resepImgUrl,
  setResepImgFile,
  setResepImgUrl,
}) => {
  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      "image/*": [".jpeg", ".png"],
    },
    disabled: resepImgFile,
    noClick: true,
    noKeyboard: true,
    maxSize: 10485786,
  });
  return (
    <Box
      {...getRootProps()}
      height="328px"
      width="100%"
      border="1px dashed black"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      borderRadius="8px"
      sx={{ backgroundColor: "#E9EFF1" }}
    >
      {preview ? (
        <Box
          sx={{ backgroundColor: "#fdffff" }}
          width="90%"
          height="41px"
          mt="24px"
          paddingX="20px"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          borderRadius="8px"
          border="1px solid #656666"
        >
          <Box display="flex" alignItems="center">
            <InsertPhotoOutlinedIcon />
            <Typography>{resepImgUrl}</Typography>
          </Box>
          <IconButton
            onClick={() => {
              setResepImgFile(null);
              setResepImgUrl(undefined);
            }}
          >
            <CancelOutlinedIcon />
          </IconButton>
        </Box>
      ) : (
        <>
          <input {...getInputProps()} />
          <Typography variant="h5" color="#B4B9C7">
            Tarik & Letakan File
          </Typography>
          <Divider
            sx={{ width: "200px", my: "32px", color: "#B4B9C7" }}
            textAlign="center"
          >
            atau
          </Divider>
          <Button
            onClick={open}
            variant="contained"
            sx={{ width: "274px", mt: "5px", height: "48px" }}
            disabled={preview}
          >
            Select File
          </Button>
        </>
      )}
    </Box>
  );
};

export default DragAndDrop;
