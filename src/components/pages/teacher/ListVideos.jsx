import FullScreenDialog from "../../layouts/dialog/FullScreenDialog";
import {
  Card,
  CardContent,
  Divider,
  Fab,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";
import { DetailTeacherClass } from "./DetailClass";
import { VideoCard } from "../../layouts/cards/VideoCard";
import { useEffect, useState } from "react";
import { AddVideoForm } from "../../layouts/forms/AddVideoForm";
import { Add } from "@mui/icons-material";
import { useUtils } from "../../../context/UtilsContext";
import { useLoading } from "../../../context/LoadingContext";
import { fetchAPI } from "../../../utils/Fetching";

const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
};

export const ListVideos = () => {
  const { classSelected } = useUtils();
  const { isSuccess, setIsLoading, setIsSuccess } = useLoading();

  const defaultValue = {
    title: "",
    description: "",
  };

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [videos, setVideos] = useState(null);
  const [values, setValues] = useState(defaultValue);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleLoad = async () => {
    try {
      setIsLoading(true);
      const res = await fetchAPI(`/videos/classes/${classSelected}`);
      setVideos(res.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = () => {
    handleOpen();
    if (!file) {
      toast.error("Belum Terdapat Video");
      return;
    }

    const formData = new FormData();
    formData.append("video", file);
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("class_uuid", selectedClass);

    handleSubmit(formData);
  };

  const handleSubmit = async (formData) => {
    try {
      setIsLoading(true);
      setIsSuccess(false);
      const res = await postFile(`/videos`, "POST", formData);
      setIsSuccess(true);
      setValues(defaultValue);
      toast.success(res.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (classSelected) {
      handleLoad();
    }
  }, [classSelected]);

  return (
    <DetailTeacherClass>
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

      <Typography marginTop={4} variant="h5" gutterBottom>
        List Video
      </Typography>
      <Divider sx={{ marginY: 2 }} />

      {videos &&
        videos.map((video) => (
          <Grid key={video.uuid} container spacing={2} marginBottom={3}>
            <Grid item xs={12} md={6} lg={4}>
              <VideoCard video={video} />
            </Grid>
          </Grid>
        ))}
      <FullScreenDialog
        handleClose={handleOpen}
        open={open}
        handleSubmit={handleClick}
      >
        <AddVideoForm
          file={file}
          handleChange={handleChange}
          handleFileChange={handleFileChange}
          values={values}
          title={"Tambah Video Pembelajaran"}
        />
      </FullScreenDialog>
    </DetailTeacherClass>
  );
};
