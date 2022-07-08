/* eslint-disable no-unused-vars */
/* eslint-disable no-unneeded-ternary */
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axiosInstance from "config/api";
import { useFormik } from "formik";
import * as yup from "yup";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const RoundedInput = styled(OutlinedInput)({
  borderRadius: "8px",
});

const Alamat = () => {
  const [provinsiOption, setProvinsiOption] = useState(null);
  const [selectedProvinsi, setSelectedProvinsi] = useState(null);
  const [kotaOption, setKotaOption] = useState(null);
  const [selectedKota, setSelectedKota] = useState(null);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      label: "",
      namaDepan: "",
      namaBelakang: "",
      nomorHp: "",
      kecamatan: "",
      alamat: "",
      kodePos: "",
    },
    validationSchema: yup.object().shape({
      label: yup
        .string()
        .required("Masukkan label alamat")
        .max(10, "10 karakter maksimum"),
      namaDepan: yup
        .string()
        .required("Masukkan nama depan")
        .max(16, "16 karakter maksimum"),
      namaBelakang: yup
        .string()
        .required("Masukkan nama belakang")
        .max(16, "16 karakter maksimum"),
      nomorHp: yup
        .number()
        .required("Masukkan nomor Hand Phone")
        .min(10)
        .max(13),
      kecamatan: yup.string().required("Masukkan nama kecamatan"),
      alamat: yup.string().required("Masukkan alamat lengkap anda"),
      kodePos: yup.number().required("Masukkan kode pos daerah anda").max(5),
    }),
    validateOnChange: false,
    onSubmit: async (values) => {
      const newAddress = {
        label_alamat: values.label,
        nama_penerima: `${values.namaDepan}  ${values.namaBelakang}`,
        no_telepon_penerima: values.nomorHp,
        alamat_lengkap: values.alamat,
        kode_pos: values.kodePos,
        provinsi_id: selectedProvinsi,
        kota_kabupaten_id: selectedKota,
        kecamatan: values.kecamatan,
      };

      await axiosInstance.post("/address/add-new-address", newAddress);
      formik.setSubmitting(false);
      // router.push("/checkout")
    },
  });

  const inputHandler = (event) => {
    const { value, name } = event.target;
    formik.setFieldValue(name, value);
  };

  const fetchProvinsi = async () => {
    try {
      const provinsiList = await axiosInstance.get("/address/province");
      setProvinsiOption(provinsiList.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchKota = async () => {
    try {
      const cityList = await axiosInstance.get("address/city", {
        params: {
          provinceTerpilih: selectedProvinsi.provinsi_id,
        },
      });
      setKotaOption(cityList.data.result);
    } catch (err) {
      console.log(err);
    }
  };

  const provinsiHandler = (event) => {
    setSelectedProvinsi({
      provinsi_id: event.target.value,
      // provinsi: event.target.name,
    });
  };

  const kotaHandler = (event) => {
    setSelectedKota({
      kota_id: event.target.value,
      // kota: event.target.name,
    });
  };

  const renderProvinsiList = () => {
    return provinsiOption?.map((val) => {
      return (
        <MenuItem value={val?.province_id} name={val?.province}>
          {val?.province}
        </MenuItem>
      );
    });
  };

  const renderKotaList = () => {
    return kotaOption?.map((valo) => {
      return (
        <MenuItem value={valo?.city_id} name={valo?.city}>
          {valo?.type} {valo?.city_name}
        </MenuItem>
      );
    });
  };

  useEffect(() => {
    if (selectedProvinsi) {
      fetchKota();
    } else {
      fetchProvinsi();
    }
  }, [selectedProvinsi]);
  return (
    <Box
      justifyContent="center"
      display="flex"
      flexDirection="column"
      alignItems="center"
      my="80px"
    >
      <Box>
        <Typography variant="h4" component="h5" fontWeight="bold">
          Alamat Pengiriman
        </Typography>
        <Box width="616px" mt="50px">
          <Box>
            <Box display="flex" alignItems="baseline" mb="16px">
              <Typography variant="h6" mr="6px" fontWeight="bold">
                Label Alamat
              </Typography>
              <Typography ml="6px" fontSize="14px" color="#B4B9C7">
                Contoh: Apartemen
              </Typography>
            </Box>
            <RoundedInput
              fullWidth
              autoFocus
              name="label"
              onChange={inputHandler}
            />
          </Box>
          <Box mt="52px">
            <Typography variant="h6" fontWeight="bold">
              Info Penerima
            </Typography>
            <Box display="flex">
              <Box mt="36px" width="50%" paddingRight="15px">
                <Typography fontSize="14px" color="#737A8D" mb="16px">
                  Nama Depan
                </Typography>
                <RoundedInput
                  fullWidth
                  name="namaDepan"
                  onChange={inputHandler}
                />
              </Box>
              <Box mt="36px" width="50%">
                <Typography fontSize="14px" color="#737A8D" mb="16px">
                  Nama Belakang
                </Typography>
                <RoundedInput
                  fullWidth
                  name="namaBelakang"
                  onChange={inputHandler}
                />
              </Box>
            </Box>
            <Box mt="36px">
              <Typography fontSize="14px" color="#737A8D" mb="16px">
                Nomor HP
              </Typography>
              {/* input no tlpon diganti pke library */}
              <RoundedInput
                onChange={inputHandler}
                name="nomorHp"
                startAdornment={
                  <InputAdornment position="start">+62</InputAdornment>
                }
                sx={{
                  width: "510px",
                }}
              />
            </Box>
            <Box display="flex">
              <Box mt="36px" width="50%" paddingRight="15px">
                <Typography fontSize="14px" color="#737A8D" mb="16px">
                  Provinsi
                </Typography>
                {/* ganti jadi select, tembak ke api */}
                <Select
                  onChange={provinsiHandler}
                  fullWidth
                  sx={{ borderRadius: "8px" }}
                >
                  {renderProvinsiList()}
                </Select>
              </Box>
              <Box mt="36px" width="50%">
                <Typography fontSize="14px" color="#737A8D" mb="16px">
                  Kota/Kabupaten
                </Typography>
                {/* ganti jadi select, tembak ke api */}
                <Select
                  onChange={kotaHandler}
                  fullWidth
                  sx={{ borderRadius: "8px" }}
                  disabled={selectedProvinsi ? false : true}
                >
                  {renderKotaList()}
                </Select>
              </Box>
            </Box>
            <Box mt="36px" width="50%" paddingRight="15px">
              <Typography fontSize="14px" color="#737A8D" mb="16px">
                Kecamatan
              </Typography>
              <RoundedInput
                onChange={inputHandler}
                name="kecamatan"
                sx={{
                  width: "510px",
                }}
              />
            </Box>
            <Box mt="36px">
              <Typography fontSize="14px" color="#737A8D" mb="16px">
                Alamat
              </Typography>
              <RoundedInput fullWidth name="alamat" onChange={inputHandler} />
            </Box>
            <Box mt="36px" width="50%" paddingRight="15px">
              <Typography fontSize="14px" color="#737A8D" mb="16px">
                Kode Pos
              </Typography>
              <RoundedInput fullWidth name="kodePos" onChange={inputHandler} />
            </Box>
          </Box>
        </Box>
        <Box mt="36px">
          <FormControlLabel
            control={<Checkbox defaultChecked color="default" />}
            label="Simpan sebagai alamat utama"
          />
        </Box>
        <Box display="flex" mt="68px">
          <Button
            variant="outlined"
            sx={{
              width: "50%",
              height: "52px",
              marginRight: "8px",
            }}
          >
            Batalkan
          </Button>
          {/* <Link href="checkout"> */}
          <Button
            onClick={formik.handleSubmit}
            disabled={formik.isSubmitting}
            variant="contained"
            sx={{
              width: "50%",
              height: "52px",
              marginLeft: "8px",
            }}
          >
            Simpan Alamat
          </Button>
          {/* </Link> */}
        </Box>
      </Box>
    </Box>
  );
};

export default Alamat;
