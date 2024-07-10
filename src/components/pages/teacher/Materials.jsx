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
import { fetchAPI } from "../../../utils/Fetching";
import toast from "react-hot-toast";
import { getBackendUrl } from "../../../utils/Helpers";

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

  const { setIsLoading, isSuccess } = useLoading();
  const { classSelected } = useUtils();
  const [open, setOpen] = useState(false);
  // const dummy = [{ title: "sd", description: "Desc" }];
  const [materials, setMaterials] = useState(null);
  const backendUrl = getBackendUrl();

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

  const handleLoad = async () => {
    try {
      setIsLoading(true);
      const res = await fetchAPI(`/materials/classes/${classSelected}`);
      setMaterials(res.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    classSelected && handleLoad();
  }, [isSuccess, classSelected]);

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
          <Card key={item.uuid} variant="outlined" sx={{ marginY: 2 }}>
            <CardHeader
              avatar={<Avatar />}
              title={item.class?.teacher}
              subheader={moment.unix(item.created_at / 1000).fromNow()}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.title}
              </Typography>
              <Typography component={"div"}>{item.description}</Typography>

              <Divider sx={{ marginTop: 2 }} />
            </CardContent>
            <CardActions>
              <Button
                size="small"
                component={"a"}
                href={`${backendUrl}/file/books/${item?.book_name}`}
                target="__blank"
              >
                Baca Buku
              </Button>
              <Button
                size="small"
                component={"a"}
                href={`/videos/materials/${item?.uuid}`}
                target="__blank"
              >
                Lihat Video
              </Button>
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
