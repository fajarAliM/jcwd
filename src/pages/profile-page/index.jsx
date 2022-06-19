import {
  Avatar,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fade,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  OutlinedInput,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import { useFormik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import imagePlaceholder from "../../public/Images/imagePlaceholder.png";

const ProfilePage = () => {
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalPassword, setOpenModalPassword] = useState(false);
  const [editPhotoProfile, setEditPhotoProfile] = useState(null);
  const [showPhotoProfilePreview, setShowPhotoProfilePreview] = useState();

  const userInfo = {
    nama: "Mychael Son",
    username: "mychael",
    email: "sonmychael@gmail.com",
    profilePicture: null,
    isVerified: false,
    gender: "Pria",
    DOB: "2001-03-31 07:20:31",
  };

  const inputProfilePictureRef = useRef(null);

  const userProfileFormik = useFormik({
    initialValues: {
      nama: userInfo.nama || "",
      username: userInfo.username || "",
      gender: userInfo.gender || "",
      DOB: userInfo.DOB || "",
    },
    validationSchema: Yup.object().shape({
      nama: Yup.string()
        .required("Name is required")
        .min(3, "Name must be at least 3 characters")
        .max(20, "Name must not exceed 20 characters"),
      username: Yup.string()
        .required("Username is required")
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username must not exceed 20 characters"),
      gender: Yup.string(),
      DOB: Yup.date(),
    }),
    validateOnChange: false,
  });

  const passwordFormik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      repeatPassword: "",
    },
    validationSchema: Yup.object().shape({
      oldPassword: Yup.string()
        .required("Password is required")
        // the matches is user to ensure the password is strong
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
      newPassword: Yup.string()
        .required("Password is required")
        // the matches is user to ensure the password is strong
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
      repeatPassword: Yup.string()
        .required("Confirm Password is required")
        .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
    }),
    validateOnChange: false,
  });

  const closeModal = () => {
    setOpenModalEdit(false);
    setOpenModalPassword(false);
  };

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  const handleFile = (e) => {
    setEditPhotoProfile(e.target.files[0]);
  };

  useEffect(() => {
    if (editPhotoProfile === null) {
      setShowPhotoProfilePreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(editPhotoProfile);
    setShowPhotoProfilePreview(objectUrl);

    // function to unset the url
    // free memory when ever this component is unmounted
    // eslint-disable-next-line consistent-return
    return () => URL.revokeObjectURL(objectUrl);
  }, [editPhotoProfile]);

  return (
    <Container>
      <Box display="flex" alignItems="center" height="100vh" padding="20px">
        <Grid container spacing={8}>
          <Grid item xs={5}>
            <Box
              py="16px"
              px="40px"
              height="500px"
              boxShadow={2}
              borderRadius="8px"
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Box
                border="1px solid black"
                marginTop="16px"
                width="300px"
                height="300px"
              >
                <Image
                  src={
                    showPhotoProfilePreview ||
                    userInfo.profilePicture ||
                    imagePlaceholder
                  }
                  width="300px"
                  height="300px"
                />
              </Box>
              <input
                onChange={handleFile}
                type="file"
                ref={inputProfilePictureRef}
                style={{ display: "none" }}
                accept="image/png, image/jpg, image/jpeg"
              />
              {editPhotoProfile ? (
                <Box display="flex" alignItems="center">
                  <Button
                    variant="outlined"
                    sx={{
                      width: "140px",
                      borderRadius: "8px",
                      mt: "20px",
                      mr: "10px",
                    }}
                    onClick={() => setEditPhotoProfile(null)}
                  >
                    Batal
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ width: "140px", borderRadius: "8px", mt: "20px" }}
                    // onClick={() => inputProfilePictureRef.current.click()}
                    // onclick ini bakal ngehandle file upload ke API
                  >
                    Simpan
                  </Button>
                </Box>
              ) : (
                <Button
                  variant="outlined"
                  sx={{ width: "300px", borderRadius: "8px", mt: "20px" }}
                  onClick={() => inputProfilePictureRef.current.click()}
                >
                  Pilih Foto
                </Button>
              )}
              <Typography sx={{ marginX: "32px", mt: "12px" }}>
                Besar file: maksimum 10 Megabytes. Ekstensi file yang
                diperbolehkan: .JPG .JPEG .PNG
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={7}>
            <Box height="500px" p="16px" overflow="scroll" pt="20px">
              <Typography variant="h4" sx={{ mt: "4px", mb: "40px" }}>
                Personal Data
              </Typography>
              <Box display="flex" alignItems="center" mb="25px">
                <Typography width="150px" variant="body1">
                  Status Akun
                </Typography>
                {userInfo.isVerified ? (
                  <Box
                    sx={{
                      border: "2px solid #2db31e",
                      backgroundColor: "#dff5dc",
                      color: "#1aab07",
                      width: "120px",
                      height: "32px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "3px",
                    }}
                  >
                    <Typography>Terverifikasi</Typography>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      border: "2px solid #575959",
                      backgroundColor: "#d4d9d9",
                      color: "#3d4242",
                      width: "170px",
                      height: "32px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "3px",
                    }}
                  >
                    <Typography>Belum Terverifikasi</Typography>
                  </Box>
                )}
              </Box>
              <Box display="flex" alignItems="center" mb="25px">
                <Typography width="150px" variant="body1">
                  Nama
                </Typography>
                <Typography fontWeight="bold">
                  {userProfileFormik.values.nama || "-"}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mb="25px">
                <Typography width="150px" variant="body1">
                  Username
                </Typography>
                <Typography fontWeight="bold">
                  {userProfileFormik.values.username || "-"}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mb="25px">
                <Typography width="150px" variant="body1">
                  Email
                </Typography>
                <Typography fontWeight="bold">
                  {userInfo.email || "-"}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mb="25px">
                <Typography width="150px" variant="body1">
                  Tanggal Lahir
                </Typography>
                <Typography fontWeight="bold">
                  {userProfileFormik.values.DOB
                    ? moment(userProfileFormik.values.DOB).format(
                        "DD MMMM YYYY"
                      )
                    : "-"}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mb="25px">
                <Typography width="150px" variant="body1">
                  Jenis Kelamin
                </Typography>
                <Typography fontWeight="bold">
                  {userProfileFormik.values.gender || "-"}
                </Typography>
              </Box>
              <Stack direction="row" spacing={1}>
                {userInfo.isVerified ? undefined : (
                  <Button
                    variant="contained"
                    sx={{ height: "45px", width: "180px" }}
                  >
                    Verifikasi akun anda
                  </Button>
                )}
                <br />
                <Button
                  variant="outlined"
                  sx={{ height: "45px", width: "180px" }}
                  onClick={() => setOpenModalEdit(true)}
                >
                  Edit Profile
                </Button>
                <br />
                <Button
                  variant="outlined"
                  sx={{ height: "45px", width: "180px" }}
                  onClick={() => setOpenModalPassword(true)}
                >
                  Ganti Password
                </Button>
              </Stack>
            </Box>
            <Dialog open={openModalEdit} onClose={closeModal}>
              <Box
                width="500px"
                p={4}
                display="flex"
                flexDirection="column"
                alignItems="center"
                pb={0}
                overflow="scroll"
              >
                {userInfo.profilePicture ? (
                  <Avatar
                    src={userInfo.profilePicture}
                    alt={userInfo.nama}
                    sx={{ width: 56, height: 56 }}
                  />
                ) : (
                  <Avatar
                    {...stringAvatar(userInfo.nama)}
                    sx={{ width: 56, height: 56 }}
                  />
                )}
                <DialogTitle variant="h5">Edit profil</DialogTitle>
                <DialogContent>
                  <FormControl fullWidth error={userProfileFormik.errors.nama}>
                    <FormLabel sx={{ fontVariant: "body1", mt: "10px" }}>
                      Nama
                    </FormLabel>
                    <OutlinedInput
                      placeholder="John Doe"
                      value={userProfileFormik.values.nama}
                      onChange={(e) =>
                        userProfileFormik.setFieldValue("nama", e.target.value)
                      }
                    />
                    {userProfileFormik.errors.nama && (
                      <FormHelperText>
                        {userProfileFormik.errors.nama}
                      </FormHelperText>
                    )}
                  </FormControl>
                  <FormControl
                    fullWidth
                    error={userProfileFormik.errors.username}
                  >
                    <FormLabel sx={{ fontVariant: "body1", mt: "25px" }}>
                      Username
                    </FormLabel>
                    <OutlinedInput
                      placeholder="john"
                      value={userProfileFormik.values.username}
                      onChange={(e) =>
                        userProfileFormik.setFieldValue(
                          "username",
                          e.target.value
                        )
                      }
                    />
                    {userProfileFormik.errors.username && (
                      <FormHelperText>
                        {userProfileFormik.errors.username}
                      </FormHelperText>
                    )}
                  </FormControl>
                  <FormControl fullWidth>
                    <FormLabel
                      id="controlled-radio-buttons-group"
                      sx={{ fontVariant: "body1", mt: "25px" }}
                    >
                      Tanggal Lahir
                    </FormLabel>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        disableFuture
                        openTo="year"
                        views={["year", "month", "day"]}
                        value={userProfileFormik.values.DOB}
                        onChange={(newDate) => {
                          userProfileFormik.setFieldValue("DOB", newDate);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </FormControl>
                  <FormControl fullWidth>
                    <FormLabel
                      id="controlled-radio-buttons-group"
                      sx={{ fontVariant: "body1", mt: "25px" }}
                    >
                      Gender
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={userProfileFormik.values.gender}
                      onChange={(e) =>
                        userProfileFormik.setFieldValue(
                          "gender",
                          e.target.value
                        )
                      }
                    >
                      <FormControlLabel
                        value="Pria"
                        control={<Radio />}
                        label="Pria"
                      />
                      <FormControlLabel
                        value="Wanita"
                        control={<Radio />}
                        label="Wanita"
                      />
                    </RadioGroup>
                  </FormControl>
                </DialogContent>
              </Box>
              <DialogActions sx={{ marginX: 6, marginBottom: 4, marginTop: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => {
                    closeModal();
                    userProfileFormik.setFieldValue("nama", userInfo.nama);
                    userProfileFormik.setFieldValue(
                      "username",
                      userInfo.username
                    );
                    userProfileFormik.setFieldValue("gender", userInfo.gender);
                    userProfileFormik.setFieldValue("DOB", userInfo.DOB);
                  }}
                  sx={{ width: "90px", height: "42px", mr: "8px" }}
                >
                  Batal
                </Button>
                <Button
                  autoFocus
                  variant="contained"
                  sx={{ width: "90px", height: "42px" }}
                  onClick={() => userProfileFormik.handleSubmit()}
                >
                  Simpan
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog open={openModalPassword} onClose={closeModal}>
              <Box
                width="500px"
                p={4}
                display="flex"
                flexDirection="column"
                alignItems="center"
                pb={0}
              >
                {userInfo.profilePicture ? (
                  <Avatar
                    src={userInfo.profilePicture}
                    alt={userInfo.nama}
                    sx={{ width: 56, height: 56 }}
                  />
                ) : (
                  <Avatar
                    {...stringAvatar(userInfo.nama)}
                    sx={{ width: 56, height: 56 }}
                  />
                )}
                <DialogTitle variant="h5">Ganti Password</DialogTitle>
                <DialogContent>
                  <FormControl
                    fullWidth
                    error={passwordFormik.errors.oldPassword}
                  >
                    <FormLabel sx={{ fontVariant: "body1", mt: "10px" }}>
                      Password lama
                    </FormLabel>
                    <OutlinedInput
                      type="password"
                      onChange={(e) =>
                        passwordFormik.setFieldValue(
                          "oldPassword",
                          e.target.value
                        )
                      }
                    />
                    {passwordFormik.errors.oldPassword && (
                      <FormHelperText>
                        {passwordFormik.errors.oldPassword}
                      </FormHelperText>
                    )}
                  </FormControl>
                  <FormControl
                    fullWidth
                    error={passwordFormik.errors.newPassword}
                  >
                    <FormLabel sx={{ fontVariant: "body1", mt: "25px" }}>
                      Password baru{" "}
                      <Tooltip
                        title="Passwords should contain at least 8 characters including an uppercase letter, a symbol, and a number"
                        TransitionComponent={Fade}
                        TransitionProps={{ timeout: 600 }}
                      >
                        <InfoIcon fontSize="small" />
                      </Tooltip>
                    </FormLabel>
                    <OutlinedInput
                      type="password"
                      onChange={(e) =>
                        passwordFormik.setFieldValue(
                          "newPassword",
                          e.target.value
                        )
                      }
                    />
                    {passwordFormik.errors.newPassword && (
                      <FormHelperText>
                        {passwordFormik.errors.newPassword}
                      </FormHelperText>
                    )}
                  </FormControl>
                  <FormControl
                    fullWidth
                    error={passwordFormik.errors.repeatPassword}
                  >
                    <FormLabel sx={{ fontVariant: "body1", mt: "25px" }}>
                      Ulang password baru
                    </FormLabel>
                    <OutlinedInput
                      type="password"
                      onChange={(e) =>
                        passwordFormik.setFieldValue(
                          "repeatPassword",
                          e.target.value
                        )
                      }
                    />
                    {passwordFormik.errors.repeatPassword && (
                      <FormHelperText>
                        {passwordFormik.errors.repeatPassword}
                      </FormHelperText>
                    )}
                  </FormControl>
                </DialogContent>
              </Box>
              <DialogActions sx={{ marginX: 6, marginBottom: 4, marginTop: 2 }}>
                <Button
                  variant="outlined"
                  onClick={closeModal}
                  sx={{ width: "90px", height: "42px", mr: "8px" }}
                >
                  Batal
                </Button>
                <Button
                  autoFocus
                  variant="contained"
                  sx={{ width: "90px", height: "42px" }}
                  onClick={() => passwordFormik.handleSubmit()}
                >
                  Simpan
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ProfilePage;
