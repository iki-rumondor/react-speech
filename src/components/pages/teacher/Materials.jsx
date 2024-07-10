import React, { useEffect, useRef, useState } from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Fab,
  Grid,
  Typography,
} from "@mui/material";
import { Add, PlayCircle } from "@mui/icons-material";
import FullScreenDialog from "../../layouts/dialog/FullScreenDialog";
import { useLoading } from "../../../context/LoadingContext";
import { AddMaterialForm } from "../../layouts/forms/AddMaterialForm";
import { DetailTeacherClass } from "./DetailClass";
import moment from "moment";
import { useUtils } from "../../../context/UtilsContext";

export const Materials = () => {
  const fabStyle = {
    position: "absolute",
    bottom: 16,
    right: 16,
  };

  const playIconStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "white",
    transition: "opacity 0.3s",
  };

  const { isSuccess } = useLoading();
  const { classSelected } = useUtils();
  const [open, setOpen] = useState(false);
  const dummy = [{ title: "sd", description: "Desc" }];
  const [materials, setMaterials] = useState(dummy);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitButton = useRef();

  const handleClick = () => {
    if (submitButton.current) {
      submitButton.current.handleSubmit();
    }
  };

  useEffect(() => {}, [isSuccess]);

  return (
    <DetailTeacherClass title={"Materi Pembelajaran"}>
      {classSelected && (
        <Fab
          sx={fabStyle}
          color="primary"
          aria-label="add"
          onClick={handleOpen}
        >
          <Add />
        </Fab>
      )}

      <Divider sx={{ marginY: 2 }} />
      {materials &&
        materials.map((item) => (
          <Card key={item.title} variant="outlined" sx={{ marginY: 2 }}>
            <CardHeader
              avatar={<Avatar />}
              title={"Pengajar"}
              subheader={moment.unix(1231231 / 1000).fromNow()}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Title
              </Typography>
              <Typography component={"div"}>{item.description}</Typography>

              <Divider sx={{ marginTop: 2 }} />
            </CardContent>
            <CardActions>
              <Button size="small">Baca Buku</Button>
              <Button size="small">Lihat Video</Button>
            </CardActions>
          </Card>
        ))}

      <FullScreenDialog
        open={open}
        handleClose={handleClose}
        title={"Tambah Materi Pembelajaran"}
        handleSubmit={handleClick}
      >
        <AddMaterialForm handleClose={handleClose} ref={submitButton} />
      </FullScreenDialog>
    </DetailTeacherClass>
  );
};
