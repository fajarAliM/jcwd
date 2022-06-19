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
  Modal,
  FormHelperText,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { login } from "redux/reducer/auth";
import { useRouter } from "next/router";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState("false");
  const [openModal, setOpenModal] = useState(false);

  const router = useRouter();

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      credential: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      credential: Yup.string()
        .required("Email or Username is required")
        .min(3, "Email or Username must be at least 3 characters")
        .max(20, "Email or Username must not exceed 20 characters"),
      password: Yup.string()
        .required("Password is required")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
    }),
    onSubmit: (values) => {
      // ini nanti bedasarkan fetchingan dari API, hrus ada alamat and no tlpon
      const userInfo = {
        id: 1,
        email: values.email,
        name: "john doe",
        password: values.password,
      };
      // console.log(userInfo);
      dispatch(login(userInfo));

      setTimeout(() => {
        router.push("/");
      }, 5000);
    },
    validateOnChange: false,
  });

  const forgotPasswordFormik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required("Email is required")
        .email("Email is invalid"),
    }),
    onSubmit: () => {},
    validateOnChange: false,
  });

  return (
    <>
      <Stack width="100%" direction="row">
        <Box>
          <Image src={Frame} layout="fixed" />
        </Box>
        <Box px="96px" py="30px" width="50%" height="100vh" overflow="scroll">
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
          <FormControl
            fullWidth
            error={formik.errors.credential}
            // sx={{ mt: "16px" }}
          >
            <FormLabel>Email or Username</FormLabel>
            <OutlinedInput
              autoFocus
              onChange={(e) =>
                formik.setFieldValue("credential", e.target.value)
              }
              placeholder="JohnDoe@gmail.com"
              startAdornment={
                <MailIcon sx={{ marginRight: "17px" }} htmlColor="#02114f" />
              }
              fullWidth
              sx={{ borderRadius: "10px" }}
            />
            {formik.errors.credential && (
              <FormHelperText>{formik.errors.credential}</FormHelperText>
            )}
          </FormControl>
          <FormControl
            fullWidth
            error={formik.errors.password}
            sx={{ my: "16px" }}
          >
            <FormLabel>Password</FormLabel>
            <OutlinedInput
              onChange={(e) => formik.setFieldValue("password", e.target.value)}
              type={showPassword ? "password" : "text"}
              placeholder="Password123@"
              startAdornment={
                <LockIcon sx={{ marginRight: "17px" }} htmlColor="#02114f" />
              }
              fullWidth
              sx={{ borderRadius: "10px" }}
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
            {formik.errors.password && (
              <FormHelperText>{formik.errors.password}</FormHelperText>
            )}
          </FormControl>
          <Stack direction="row" justifyContent="space-between">
            <FormControlLabel
              sx={{ marginTop: "-10px" }}
              control={<Checkbox />}
              label="Ingat Saya"
            />
            <Typography
              onClick={() => setOpenModal(true)}
              color="#c7bfaf"
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              Lupa Kata Sandi ?
            </Typography>
          </Stack>
          <Modal
            open={openModal}
            onClose={() => {
              setOpenModal(false);
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "500px",
                height: "360px",
                bgcolor: "white",
                borderRadius: 2,
                boxShadow: 24,
                p: 4,
              }}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Typography variant="h5">Forgot Your Password?</Typography>
              <Typography marginTop="30px" color="#C7C6C1" textAlign="center">
                Enter your email below to recieve an email to reset your
                password
              </Typography>
              <FormControl
                fullWidth
                sx={{ mt: "30px" }}
                error={forgotPasswordFormik.errors.email}
              >
                <OutlinedInput
                  autoFocus
                  onChange={(e) => {
                    forgotPasswordFormik.setFieldValue(e.target.value);
                  }}
                  placeholder="JohnDoe@gmail.com"
                  startAdornment={
                    <MailIcon
                      sx={{ marginRight: "17px" }}
                      htmlColor="#02114f"
                    />
                  }
                  fullWidth
                />
                {forgotPasswordFormik.errors.email && (
                  <FormHelperText>
                    {forgotPasswordFormik.errors.email}
                  </FormHelperText>
                )}
              </FormControl>
              <Button
                variant="contained"
                fullWidth
                sx={{ mt: "30px", height: "48px" }}
                onClick={() => {
                  forgotPasswordFormik.handleSubmit();
                }}
              >
                Send
              </Button>
            </Box>
          </Modal>
          <Button
            sx={{
              marginTop: "20px",
              marginBottom: "48px",
              minHeight: "48px",
              textTransform: "initial",
            }}
            variant="contained"
            fullWidth
            onClick={() => formik.handleSubmit()}
            disabled={formik.isSubmitting}
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
