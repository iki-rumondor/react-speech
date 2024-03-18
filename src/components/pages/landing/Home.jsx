import React, { useEffect, useState } from "react";
import { TopbarLandingPage } from "./Topbar";
import { Hero } from "./Hero";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Slide,
  TextField,
  Typography,
} from "@mui/material";
import { fetchAPI, postAPI } from "../../../utils/Fetching";
import toast from "react-hot-toast";
import { useLoading } from "../../../context/LoadingContext";
import { Folder, RecordVoiceOver } from "@mui/icons-material";
import { orange } from "@mui/material/colors";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const Home = () => {
  const { setIsLoading } = useLoading();
  const [classes, setClasses] = useState(null);
  const nav = useNavigate();

  const [open, setOpen] = useState(false);
  const defaultValue = {
    email: "",
    password: "",
  };

  const [values, setValues] = useState(defaultValue);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLoad = async () => {
    try {
      setIsLoading(true);
      const res = await fetchAPI(`/public/classes`);
      setClasses(res.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const res = await postAPI("/verify-user", "POST", values);
      const uuid = jwtDecode(res.data.token).uuid;
      const userData = await fetchAPI(`/user/${uuid}`);
      sessionStorage.setItem("role", userData.data.role);
      sessionStorage.setItem("uuid", userData.data.uuid);
      sessionStorage.setItem("token", res.data.token);
      nav("/home");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (uuid) => {
    try {
      setIsLoading(true);
      const res = await postAPI("/class/register", "POST", {
        class_uuid: uuid,
      });
      toast.success(res.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDaftar = (uuid) => {
    const role = sessionStorage.getItem("role");
    if (!role) {
      handleOpen();
      return;
    }

    if (role != "MAHASISWA") {
      toast.error("Yang Dapat Mendaftar Kelas Hanya Mahasiswa");
      return;
    }

    handleSubmit(uuid);
  };

  useEffect(() => {
    handleLoad();
  }, []);
  return (
    <>
      <link
        rel="stylesheet"
        type="text/css"
        href="/src/assets/landing/css/theme.css"
      />
      {/* <TopbarLandingPage /> */}
      <Hero />
      <section>
        <div className="container">
          <h1 className="fw-bold fs-6 mb-3">Kelas Tersedia</h1>
          <p className="mb-6 text-secondary">
            Silahkan Mendaftar Di Banyak Kelas Dari Dosen-Dosen Ternama
          </p>
          <Grid container spacing={2}>
            {classes &&
              classes.map((item) => (
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardMedia
                      sx={{ height: 140 }}
                      image="https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      title="class"
                    />
                    <CardContent sx={{ marginY: 0, paddingY: 1 }}>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <List dense>
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                                <RecordVoiceOver />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={item.teacher}
                              primaryTypographyProps={{ fontWeight: "bold" }}
                              secondary={item.teacher_department}
                            />
                          </ListItem>
                        </List>
                      </Typography>
                    </CardContent>
                    <CardActions
                      sx={{
                        justifyContent: "end",
                        paddingX: 4,
                        paddingTop: 0,
                        paddingBottom: 2,
                      }}
                    >
                      <Button
                        onClick={() => {
                          handleDaftar(item.uuid);
                        }}
                        variant="contained"
                        size="small"
                        sx={{
                          bgcolor: orange[600],
                          "&:hover": {
                            bgcolor: orange[900],
                          },
                        }}
                      >
                        Daftar
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </div>
      </section>
      <section className="text-center py-0">
        <div className="container">
          <div className="container border-top py-3">
            <div className="row justify-content-between">
              <div className="col-12 col-md-auto mb-1 mb-md-0">
                <p className="mb-0">&copy; 2022 Your Company Inc </p>
              </div>
              <div className="col-12 col-md-auto">
                <p className="mb-0">
                  Made with
                  <span className="fas fa-heart mx-1 text-danger">
                    {" "}
                  </span>by{" "}
                  <a
                    className="text-decoration-none ms-1"
                    href="https://themewagon.com/"
                    target="_blank"
                  >
                    ThemeWagon
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Login Terlebih Dahulu"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            required
            fullWidth
            value={values.email}
            onChange={handleChange}
            id="email"
            label="Alamat Email"
            name="email"
            autoComplete="email"
          />
          <TextField
            margin="normal"
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
          <Button
            onClick={handleLogin}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Masuk
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};
