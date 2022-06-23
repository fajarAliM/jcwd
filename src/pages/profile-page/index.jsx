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
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import { useFormik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axiosInstance from "config/api";
import { useSnackbar } from "notistack";
import ModalTambahAlamat from "components/ModalTambahAlamat";
import CardAlamat from "components/CardAlamat";
import Group from "public/Images/Group.png";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { login } from "redux/reducer/auth";

const ProfilePage = () => {
  const userSelector = {
    nama: "Mychael Son",
    username: "mychael",
    email: "sonmychael@gmail.com",
    profilePicture: null,
    isVerified: false,
    gender: "Pria",
    DOB: "2001-03-31 07:20:31",
  };

  // eslint-disable-next-line no-unused-vars
  const userSelectors = useSelector((state) => state.auth);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalPassword, setOpenModalPassword] = useState(false);
  const [editPhotoProfile, setEditPhotoProfile] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [showPhotoProfilePreview, setShowPhotoProfilePreview] = useState();
  const [verificationButtonLoading, setVerificationButtonLoading] =
    useState(false);
  const [tab, setTab] = useState(1);
  const [tambahAlamat, setTambahAlamat] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [listAlamat, setListAlamat] = useState(1);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const tabHandle = (event, newValue) => {
    setTab(newValue);
  };

  const inputProfilePictureRef = useRef(null);

  const uploadAvatarHandler = async () => {
    const formData = new FormData();

    formData.append("avatar_image_file", editPhotoProfile);

    try {
      const userUpdatePhotoProfile = await axiosInstance.patch(
        `/auth/${userSelectors.id}`,
        formData
      );
      setEditPhotoProfile(null);

      dispatch(login(userUpdatePhotoProfile.data.result));

      enqueueSnackbar("Profile Picture Updated!", { variant: "success" });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const userProfileFormik = useFormik({
    initialValues: {
      nama: userSelector.nama || "",
      username: userSelector.username || "",
      gender: userSelector.gender || "",
      DOB: userSelector.DOB || "",
      email: userSelector.email || "",
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

  const verifiactionButtonHandler = async () => {
    try {
      setVerificationButtonLoading(true);
      const sendEmail = await axiosInstance.post(
        "/auth/resend-verification-email"
      );
      setVerificationButtonLoading(false);
      enqueueSnackbar(sendEmail?.data?.message, { variant: "success" });
    } catch (err) {
      setVerificationButtonLoading(false);
      enqueueSnackbar(err?.response?.data?.message, { variant: "error" });
    }
  };

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        height="100vh"
        padding="20px"
      >
        <Box display="flex" justifyContent="flex-end">
          <Grid Container>
            <Tabs onChange={tabHandle} value={tab} indicatorColor="primary">
              <Tab value={1} label="Personal Data" />
              <Tab value={2} label="Daftar Alamat" />
            </Tabs>
          </Grid>
        </Box>
        {tab === 1 ? (
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
                  <img
                    src={showPhotoProfilePreview || userSelectors.photo_profile}
                    alt="photo_profile"
                    // eslint-disable-next-line react/style-prop-object
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
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
                      onClick={() => {
                        uploadAvatarHandler();
                        // setShowPhotoProfilePreview("");
                      }}
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
                  {userSelectors.is_verified ? (
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
                    {userProfileFormik.values.email || "-"}
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
                  {userSelectors.is_verified ? undefined : (
                    <Button
                      onClick={verifiactionButtonHandler}
                      disabled={verificationButtonLoading}
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
                  {userSelector.profilePicture ? (
                    <Avatar
                      src={userSelector.profilePicture}
                      alt={userProfileFormik.values.nama}
                      sx={{ width: 56, height: 56 }}
                    />
                  ) : (
                    <Avatar
                      {...stringAvatar(userProfileFormik.values.nama)}
                      sx={{ width: 56, height: 56 }}
                    />
                  )}
                  <DialogTitle variant="h5">Edit profil</DialogTitle>
                  <DialogContent>
                    <FormControl
                      fullWidth
                      error={userProfileFormik.errors.nama}
                    >
                      <FormLabel sx={{ fontVariant: "body1", mt: "10px" }}>
                        Nama
                      </FormLabel>
                      <OutlinedInput
                        placeholder="John Doe"
                        value={userProfileFormik.values.nama}
                        onChange={(e) =>
                          userProfileFormik.setFieldValue(
                            "nama",
                            e.target.value
                          )
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
                <DialogActions
                  sx={{ marginX: 6, marginBottom: 4, marginTop: 2 }}
                >
                  <Button
                    variant="outlined"
                    onClick={() => {
                      closeModal();
                      userProfileFormik.setFieldValue(
                        "nama",
                        userSelector.nama
                      );
                      userProfileFormik.setFieldValue(
                        "username",
                        userSelector.username
                      );
                      userProfileFormik.setFieldValue(
                        "gender",
                        userSelector.gender
                      );
                      userProfileFormik.setFieldValue("DOB", userSelector.DOB);
                    }}
                    sx={{ width: "90px", height: "42px", mr: "8px" }}
                  >
                    Batal
                  </Button>
                  <Button
                    autoFocus
                    variant="contained"
                    sx={{ width: "140px", borderRadius: "8px", mt: "20px" }}
                    onClick={() => {
                      uploadAvatarHandler();
                    }}
                    // onClick={() => inputProfilePictureRef.current.click()}
                    // onclick ini bakal ngehandle file upload ke API
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
                  {userSelector.profilePicture ? (
                    <Avatar
                      src={userSelector.profilePicture}
                      alt={userSelector.nama}
                      sx={{ width: 56, height: 56 }}
                    />
                  ) : (
                    <Avatar
                      {...stringAvatar(userSelector.nama)}
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
                <DialogActions
                  sx={{ marginX: 6, marginBottom: 4, marginTop: 2 }}
                >
                  <Button
                    variant="contained"
                    sx={{ height: "45px", width: "180px" }}
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
        ) : (
          <Box
            sx={{
              overflow: "auto",
              width: "500px",
              maxHeight: "500px",
              borderRadius: "10px",
              boxShadow: 2,
              padding: "20px",
            }}
          >
            <Box display="flex" justifyContent="flex-end">
              <Button
                sx={{ color: "Brand.500" }}
                onClick={() => setTambahAlamat(true)}
                variant="text"
              >
                Tambah Alamat
              </Button>
              <ModalTambahAlamat
                open={tambahAlamat}
                handleClose={() => setTambahAlamat(false)}
              />
            </Box>
            {listAlamat ? (
              <>
                <CardAlamat
                  alamat="Purwadhika Campus BSD BSD Green Office Park, GOP 9 - G Floor"
                  kec="Serpong"
                  kab="BSD City"
                  provinsi="Banten"
                  kodePos="21990"
                  label="Purwadhika"
                  namaPenerima="Johnny G"
                  nomorTelp="00009999"
                />
                <CardAlamat
                  isMain
                  alamat="Purwadhika Campus BSD BSD Green Office Park, GOP 9 - G Floor"
                  kec="Serpong"
                  kab="BSD City"
                  provinsi="Banten"
                  kodePos="21990"
                  label="Purwadhika"
                  namaPenerima="Johnny G"
                  nomorTelp="00009999"
                />
              </>
            ) : (
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                padding={3}
              >
                <Image src={Group} />
                <Typography
                  sx={{
                    marginTop: "20px",
                    fontSize: "20px",
                    color: "Brand.500",
                  }}
                >
                  Belum ada list alamat
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default ProfilePage;
