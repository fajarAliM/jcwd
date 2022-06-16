/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-dupe-keys */
import Image from "next/image";
import Frame from "public/Images/Frame.png";
import GoogleIcon from "public/Images/google-icon.png";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import {
  OutlinedInput,
  Box,
  Stack,
  Button,
  Divider,
  FormControlLabel,
  Checkbox,
  IconButton,
  Typography,
  FormControl,
  FormLabel,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Link from "next/link";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [term, setTerm] = useState(false);

  const termHandle = () => {
    setTerm(!term);
  };

  return (
    <>
      {/* <AdminSidebar /> */}
      <Stack direction="row">
        <Box>
          <Image src={Frame} layout="fixed" />
        </Box>
        <Box px="96px" py="77px">
          <Typography fontWeight="bold" variant="h4" component="h4">
            Mari Kita Mulai
          </Typography>
          <Typography>
            Sudah Punya Akun ?{" "}
            <Link href="/login">
              <Typography
                sx={{ ":hover": { cursor: "pointer" } }}
                component="span"
                color="Brand.500"
              >
                Daftar
              </Typography>
            </Link>{" "}
          </Typography>
          <Stack direction="row" spacing={2} marginY="32px">
            <Button
              fullWidth
              startIcon={<Image src={GoogleIcon} />}
              variant="contained"
              sx={{
                backgroundColor: "white",
                color: "black",
                fontWeight: "bold",
                height: "48px",
                border: "2px solid #c7bfaf",
                boxShadow: "none",
                ":hover": { backgroundColor: "#c7bfaf", border: "unset" },
              }}
            >
              Daftar dengan Google
            </Button>
            <Button
              fullWidth
              startIcon={
                <FacebookOutlinedIcon sx={{ width: "24px", height: "24px" }} />
              }
              variant="contained"
              sx={{
                backgroundColor: "#527BCB",
                ":hover": { backgroundColor: "#527BCB", border: "unset" },
              }}
            >
              Daftar dengan Facebook
            </Button>
          </Stack>
          <Divider>atau</Divider>
          <FormControl fullWidth>
            <FormLabel>Name</FormLabel>
            <OutlinedInput
              placeholder="John Doe"
              startAdornment={
                <AccountCircleIcon
                  sx={{ marginRight: "17px" }}
                  htmlColor="#02114f"
                />
              }
              sx={{ borderRadius: "10px", marginBottom: "16px" }}
            />
          </FormControl>
          <FormControl fullWidth>
            <FormLabel>Username</FormLabel>
            <OutlinedInput
              placeholder="johndoe"
              startAdornment={
                <AccountCircleIcon
                  sx={{ marginRight: "17px" }}
                  htmlColor="#02114f"
                />
              }
              fullWidth
              sx={{ borderRadius: "10px", marginBottom: "16px" }}
            />
          </FormControl>
          <FormControl fullWidth>
            <FormLabel>Email Address</FormLabel>
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
              sx={{ borderRadius: "10px", marginBottom: "16px" }}
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
          <FormControl fullWidth>
            <FormLabel>Repeat Password</FormLabel>
            <OutlinedInput
              type={showRepeatPassword ? "password" : "text"}
              placeholder="Password123@"
              startAdornment={
                <LockIcon sx={{ marginRight: "17px" }} htmlColor="#02114f" />
              }
              fullWidth
              sx={{ borderRadius: "10px", marginBottom: "16px" }}
              endAdornment={
                <IconButton
                  onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                >
                  {showRepeatPassword ? (
                    <VisibilityIcon htmlColor="#02114f" sx={{}} />
                  ) : (
                    <VisibilityOffIcon htmlColor="#02114f" />
                  )}
                </IconButton>
              }
            />
          </FormControl>
          <FormControlLabel
            control={<Checkbox checked={term} onChange={termHandle} />}
            label={
              <Typography>
                Saya setuju dengan{" "}
                <Typography color="Brand.500" component="span">
                  persyaratan
                </Typography>{" "}
                dan{" "}
                <Typography color="Brand.500" component="span">
                  ketentuan
                </Typography>
              </Typography>
            }
          />
          <Button
            sx={{
              minHeight: "48px",
              textTransform: "initial",
            }}
            variant="contained"
            fullWidth
            disabled={!term}
          >
            Register
          </Button>
        </Box>
      </Stack>
    </>
  );
};

export default RegisterPage;
