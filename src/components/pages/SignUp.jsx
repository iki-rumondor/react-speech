import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SelectInput } from "../layouts/input/SelectInput";
import { useState } from "react";
import { useLoading } from "../../context/LoadingContext";
import { fetchAPI, postAPI } from "../../utils/Fetching";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignUp() {
  const { setIsLoading, setIsSuccess } = useLoading();
  const [roles, setRoles] = useState(null);
  const [departments, setDepartments] = useState(null);
  const nav = useNavigate();
  const defaultValue = {
    role_id: "",
    department_uuid: "",
    nip: "",
    nim: "",
    name: "",
    email: "",
    password: "",
  };

  const [values, setValues] = useState(defaultValue);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleLoad = async () => {
    try {
      setIsLoading(true);
      const res = await fetchAPI(`/roles`);
      const createRoles = [];
      const createDepartments = [];
      res.data.map((item) => {
        if (item.name == "ADMIN") {
          return;
        }
        createRoles.push({ name: item.name, value: item.id });
      });
      
      const res2 = await fetchAPI(`/department`);
      res2.data.map((item) => {
        createDepartments.push({ name: item.name, value: item.uuid });
      });
      setDepartments(createDepartments);
      setRoles(createRoles);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleLoad();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setIsSuccess(false);
      const res = await postAPI("/user", "POST", values);
      setIsSuccess(true);
      toast.success(res.message);
      nav("/signin");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Daftar Akun
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              {roles && (
                <Grid item xs={12}>
                  <SelectInput
                    handleChange={handleChange}
                    value={values.role_id}
                    id={"role_id"}
                    label={"Daftar Sebagai"}
                    items={roles}
                  />
                </Grid>
              )}
              {values.role_id == 2 && (
                <>
                  <Grid item xs={12}>
                    <SelectInput
                      handleChange={handleChange}
                      value={values.department_uuid}
                      id={"department_uuid"}
                      label={"Pilih Program Studi"}
                      items={departments ?? []}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      value={values.nip}
                      onChange={handleChange}
                      id="nip"
                      label="Nomor Induk Pegawai"
                      name="nip"
                      autoComplete="nip"
                    />
                  </Grid>
                </>
              )}

              {values.role_id == 3 && (
                <>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      value={values.nim}
                      onChange={handleChange}
                      id="nim"
                      label="Nomor Induk Mahasiswa"
                      name="nim"
                      autoComplete="nim"
                    />
                  </Grid>
                </>
              )}

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={values.name}
                  onChange={handleChange}
                  id="name"
                  label="Nama Lengkap"
                  name="name"
                  autoComplete="name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={values.email}
                  onChange={handleChange}
                  id="email"
                  label="Alamat Email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={values.password}
                  onChange={handleChange}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Daftar
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="signin" variant="body2">
                  Sudah punya akun? Silahkan login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
