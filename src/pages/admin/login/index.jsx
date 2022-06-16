/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-dupe-keys */
import Image from "next/image";
import Frame from "public/Images/Frame.png";
import GoogleIcon from "public/Images/google-icon.png";
import {
  FormLabel,
  OutlinedInput,
  Box,
  Stack,
  Button,
  Divider,
  FormControlLabel,
  Checkbox,
  IconButton,
  Typography,
  ButtonGroup,
  FormControl,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Link from "next/link";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState("false");
  return (
    <>
      <Stack width="100%" direction="row">
        <Box>
          <Image src={Frame} layout="fixed" />
        </Box>
        <Box px="96px" py="70px" width="50%">
          <Box display="flex" justifyContent="flex-end">
            <ButtonGroup
              sx={{ marginBottom: "50px" }}
              variant="root"
              disableElevation
            >
              <Button
                sx={{ backgroundColor: "#f5f0f1", color: "Brand.500" }}
                variant="contained"
              >
                EN
              </Button>
              <Button
                sx={{ color: "white", backgroundColor: "Brand.500" }}
                variant="contained"
              >
                ID
              </Button>
            </ButtonGroup>
          </Box>
          <Typography
            sx={{ marginBottom: "36px" }}
            fontWeight="bold"
            variant="h4"
            component="h4"
          >
            Masuk
          </Typography>
          <FormControl fullWidth>
            <FormLabel>Email or Username</FormLabel>
            <OutlinedInput
              placeholder="JohnDoe@gmail.com"
              startAdornment={
                <MailIcon sx={{ marginRight: "17px" }} htmlColor="#02114f" />
              }
              fullWidth
              sx={{ borderRadius: "10px", marginBottom: "16px" }}
            />
          </FormControl>
          <FormControl fullWidth>
            <FormLabel>Password</FormLabel>
            <OutlinedInput
              type={showPassword ? "password" : "text"}
              placeholder="Password123@"
              startAdornment={
                <LockIcon sx={{ marginRight: "17px" }} htmlColor="#02114f" />
              }
              fullWidth
              sx={{ borderRadius: "10px", marginBottom: "10px" }}
              endAdornment={
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <VisibilityIcon htmlColor="#02114f" sx={{}} />
                  ) : (
                    <VisibilityOffIcon htmlColor="#02114f" />
                  )}
                </IconButton>
              }
            />
          </FormControl>
          <Stack direction="row" justifyContent="space-between">
            <FormControlLabel
              sx={{ marginTop: "-10px" }}
              control={<Checkbox />}
              label="Ingat Saya"
            />
            <Typography color="#c7bfaf">Lupa Kata Sandi ?</Typography>
          </Stack>
          <Button
            sx={{
              marginBottom: "48px",
              minHeight: "48px",
              textTransform: "initial",
            }}
            variant="contained"
            fullWidth
          >
            Masuk
          </Button>
          <Divider sx={{ marginBottom: "56px" }}>Atau Masuk Dengan</Divider>
          <Button
            fullWidth
            startIcon={<Image src={GoogleIcon} />}
            variant="contained"
            sx={{
              marginBottom: "48px",
              backgroundColor: "white",
              color: "black",
              fontWeight: "bold",
              height: "48px",
              border: "2px solid #c7bfaf",
              boxShadow: "none",
              ":hover": { backgroundColor: "#c7bfaf", border: "unset" },
            }}
          >
            Masuk dengan Google
          </Button>
          <Typography textAlign="center">
            Belum Punya Akun ?{" "}
            <Link href="/register">
              <Typography
                sx={{ ":hover": { cursor: "pointer" } }}
                component="span"
                color="Brand.500"
              >
                Daftar
              </Typography>
            </Link>{" "}
          </Typography>
        </Box>
      </Stack>
    </>
  );
};

export default LoginPage;
