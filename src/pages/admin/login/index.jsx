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
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Link from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import jsCookie from "js-cookie";
import api from "../../../config/api";
import { login } from "../../../redux/reducer/auth";

const LoginPage = () => {
  const userSelector = useSelector((state) => state.auth);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState("false");
  const dispatch = useDispatch();

  const userLogin = async (values, setSubmitting) => {
    try {
      const res = await api.post("/auth/admin/login", {
        username: values.username,
        password: values.password,
      });

      const userResponse = res.data.result;
      // eslint-disable-next-line no-console
      console.log(userResponse);

      jsCookie.set("user_token", userResponse.token);

      const userResponseAdded = { ...userResponse.user, isAdmin: 1 };

      // yang masuk ke login() akan masuk ke action.payload di reducer
      dispatch(login(userResponseAdded));

      setSubmitting(false);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err.response.data);
    }
  };
  // onSubmit kasih isAdmin = 1

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required("This field is required!"),
      password: Yup.string().required("This field is required!"),
    }),
    validateOnChange: false,
    onSubmit: (values) => {
      setTimeout(() => {
        userLogin(values, formik.setSubmitting);
      }, 2000);
    },
  });

  const inputHandler = (event) => {
    const { value, name } = event.target;

    formik.setFieldValue(name, value);
  };

  useEffect(() => {
    if (userSelector.id) {
      router.push("/admin/dashboard");
    }
  }, [userSelector.id]);
  return (
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
            onChange={inputHandler}
            name="username"
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
            onChange={inputHandler}
            name="password"
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
          // onClick={console.log("halo")}
          onClick={formik.handleSubmit}
          // disabled={formik.isSubmitting}
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
  );
};

export default LoginPage;
