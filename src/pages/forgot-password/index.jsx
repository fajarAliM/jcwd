import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const ForgotPassword = () => {
  const newPasswordFormik = useFormik({
    initialValues: {
      newPassword: "",
      repeatNewPassword: "",
    },
    validationSchema: Yup.object().shape({
      newPassword: Yup.string()
        .required("Password is required")
        // the matches is user to ensure the password is strong
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
      repeatNewPassword: Yup.string()
        .required("Confirm Password is required")
        .oneOf(
          [Yup.ref("newPassword"), null],
          "Confirm Password does not match"
        ),
    }),
    validateOnChange: false,
  });

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ my: "100px" }}
    >
      <Stack width="500px" boxShadow={2} borderRadius="8px" p={4} spacing={2}>
        <Typography variant="h4" fontWeight="bold">
          Enter New Password
        </Typography>
        <FormControl fullWidth error={newPasswordFormik.errors.newPassword}>
          <FormLabel>New Password</FormLabel>
          <OutlinedInput
            type="password"
            autoFocus
            onChange={(e) =>
              newPasswordFormik.setFieldValue("newPassword", e.target.value)
            }
          />
          {newPasswordFormik.errors.newPassword && (
            <FormHelperText>
              {newPasswordFormik.errors.newPassword}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl
          fullWidth
          error={newPasswordFormik.errors.repeatNewPassword}
        >
          <FormLabel>Repeat Password</FormLabel>
          <OutlinedInput
            type="password"
            onChange={(e) =>
              newPasswordFormik.setFieldValue(
                "repeatNewPassword",
                e.target.value
              )
            }
          />
          {newPasswordFormik.errors.repeatNewPassword && (
            <FormHelperText>
              {newPasswordFormik.errors.repeatNewPassword}
            </FormHelperText>
          )}
        </FormControl>
        <Button
          variant="contained"
          sx={{ height: "45px" }}
          onClick={() => newPasswordFormik.handleSubmit()}
        >
          Submit
        </Button>
      </Stack>
    </Box>
  );
};

export default ForgotPassword;
