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
  Tooltip,
  Fade,
  FormHelperText,
  Grid,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import InfoIcon from "@mui/icons-material/Info";
import axiosInstance from "config/api";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [term, setTerm] = useState(false);

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const termHandle = () => {
    setTerm(!term);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .required("Name is required")
        .min(3, "Name must be at least 3 characters")
        .max(20, "Name must not exceed 20 characters"),
      username: Yup.string()
        .required("Username is required")
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username must not exceed 20 characters"),
      email: Yup.string()
        .required("Email is required")
        .email("Email is invalid"),
      password: Yup.string()
        .required("Password is required")
        // the matches is user to ensure the password is strong
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
    }),
    onSubmit: async (values) => {
      try {
        const userInfo = {
          name: values.name,
          username: values.username,
          email: values.email,
          password: values.password,
        };

        const registerUser = await axiosInstance.post(
          "/auth/register",
          userInfo
        );

        enqueueSnackbar(registerUser.data.message, { variant: "success" });

        router.push("/login");
      } catch (err) {
        enqueueSnackbar(err?.response?.data?.message, { variant: "error" });
      }
    },
    validateOnChange: false,
  });

  return (
    <>
      {/* <AdminSidebar /> */}
      {/* <Stack direction="row"> */}
      <Grid container columns={{ xs: 4, md: 12 }}>
        <Grid item display={{ xs: "none", md: "block" }} xs={0} md={6}>
          <Box>
            <Image src={Frame} layout="fixed" />
          </Box>
        </Grid>
        <Grid item xs={4} md={6}>
          <Box
            px={{ xs: "35px", sm: "96px" }}
            py="50px"
            height="100vh"
            overflow="scroll"
          >
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
                  Masuk
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
                  minHeight: "48px",
                  border: "2px solid #c7bfaf",
                  boxShadow: "none",
                  ":hover": {
                    backgroundColor: "#c7bfaf",
                    border: "2px solid transparent",
                  },
                }}
              >
                Daftar dengan Google
              </Button>
              <Button
                fullWidth
                startIcon={
                  <FacebookOutlinedIcon
                    sx={{ width: "24px", height: "24px" }}
                  />
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
            <FormControl
              fullWidth
              required
              error={formik.errors.name}
              sx={{ mt: "16px" }}
            >
              <FormLabel>Name</FormLabel>
              <OutlinedInput
                onChange={(e) => {
                  formik.setFieldValue("name", e.target.value);
                }}
                placeholder="John Doe"
                startAdornment={
                  <AccountCircleIcon
                    sx={{ marginRight: "17px" }}
                    htmlColor="#02114f"
                  />
                }
                sx={{ borderRadius: "10px" }}
              />
              {formik.errors.name && (
                <FormHelperText>{formik.errors.name}</FormHelperText>
              )}
            </FormControl>
            <FormControl
              fullWidth
              required
              error={formik.errors.username}
              sx={{ mt: "16px" }}
            >
              <FormLabel>Username</FormLabel>
              <OutlinedInput
                onChange={(e) => {
                  formik.setFieldValue("username", e.target.value);
                }}
                placeholder="johndoe"
                startAdornment={
                  <AccountCircleIcon
                    sx={{ marginRight: "17px" }}
                    htmlColor="#02114f"
                  />
                }
                fullWidth
                sx={{ borderRadius: "10px" }}
              />
              <FormHelperText>{formik.errors.username}</FormHelperText>
              {/* {formik.errors.username && (
              <FormHelperText>{formik.errors.username}</FormHelperText>
            )} */}
            </FormControl>
            <FormControl
              fullWidth
              required
              error={formik.errors.email}
              sx={{ mt: "16px" }}
            >
              <FormLabel>Email Address</FormLabel>
              <OutlinedInput
                onChange={(e) => {
                  formik.setFieldValue("email", e.target.value);
                }}
                placeholder="JohnDoe@gmail.com"
                startAdornment={
                  <MailIcon sx={{ marginRight: "17px" }} htmlColor="#02114f" />
                }
                fullWidth
                sx={{ borderRadius: "10px" }}
              />
              {formik.errors.email && (
                <FormHelperText>{formik.errors.email}</FormHelperText>
              )}
            </FormControl>
            <FormControl
              fullWidth
              required
              error={formik.errors.password}
              sx={{ mt: "16px" }}
            >
              <FormLabel>
                Password
                <Tooltip
                  title="Passwords should contain at least 8 characters including an uppercase letter, a symbol, and a number"
                  TransitionComponent={Fade}
                  TransitionProps={{ timeout: 600 }}
                  sx={{ ml: "5px" }}
                >
                  <InfoIcon fontSize="small" />
                </Tooltip>
              </FormLabel>
              <OutlinedInput
                onChange={(e) => {
                  formik.setFieldValue("password", e.target.value);
                }}
                type={showPassword ? "text" : "password"}
                placeholder="Password123@"
                startAdornment={
                  <LockIcon sx={{ marginRight: "17px" }} htmlColor="#02114f" />
                }
                fullWidth
                sx={{
                  borderRadius: "10px",
                }}
                endAdornment={
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <VisibilityIcon htmlColor="#02114f" />
                    ) : (
                      <VisibilityOffIcon htmlColor="#02114f" />
                    )}
                  </IconButton>
                }
              />
              {formik.errors.password && (
                <FormHelperText>{formik.errors.password}</FormHelperText>
              )}
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
              disabled={!term || formik.isSubmitting}
              onClick={formik.handleSubmit}
            >
              Register
            </Button>
          </Box>
        </Grid>
      </Grid>
      {/* </Stack> */}
    </>
  );
};

export default RegisterPage;
