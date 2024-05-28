import FullScreenDialog from "../../layouts/dialog/FullScreenDialog";
import {
  Card,
  CardContent,
  Divider,
  Fab,
  Grid,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";
import { DetailTeacherClass } from "./DetailClass";
import { VideoCard } from "../../layouts/cards/VideoCard";
import { useEffect, useState } from "react";
import { AddVideoForm, EditVideoForm } from "../../layouts/forms/AddVideoForm";
import { Add } from "@mui/icons-material";
import { useUtils } from "../../../context/UtilsContext";
import { useLoading } from "../../../context/LoadingContext";
import {
  deleteAPI,
  fetchAPI,
  postAPI,
  postFile,
} from "../../../utils/Fetching";
import { CommonDelete } from "../../layouts/dialog/CommonDelete";

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
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [file, setFile] = useState(null);
  const [videos, setVideos] = useState(null);
  const [values, setValues] = useState(defaultValue);

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const [selectID, setSelectID] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setValues(defaultValue);
    setOpen(false);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setValues(defaultValue);
    setOpenEdit(false);
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

  const handleLoadVideo = async () => {
    try {
      handleCloseMenu();
      handleOpenEdit();
      setIsLoading(true);
      const res = await fetchAPI(`/videos/${selectID}`);
      setValues({
        title: res.data.title,
        description: res.data.description,
      });
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
    formData.append("class_uuid", classSelected);

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

  const handleUpdate = async () => {
    try {
      handleOpenEdit();
      setIsLoading(true);
      setIsSuccess(false);
      const res = await postAPI(`/videos/${selectID}`, "PUT", values);
      setIsSuccess(true);
      setValues(defaultValue);
      toast.success(res.message);
      handleCloseEdit();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setOpenDelete(false);
      setIsLoading(true);
      setIsSuccess(false);
      const res = await deleteAPI(`/videos/${selectID}`);
      setIsSuccess(true);
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
  }, [classSelected, isSuccess]);

  return (
    <DetailTeacherClass title={"List Video Pembelajaran"}>
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

      <Grid container spacing={2} marginBottom={3}>
        {videos &&
          videos.map((video) => (
            <Grid key={video.uuid} item xs={12} md={6} lg={4}>
              <VideoCard
                video={video}
                setAnchorEl={setAnchorEl}
                setSelectID={setSelectID}
              />
            </Grid>
          ))}
      </Grid>
      <FullScreenDialog
        handleClose={handleClose}
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

      <FullScreenDialog
        handleClose={handleCloseEdit}
        open={openEdit}
        handleSubmit={handleUpdate}
      >
        <EditVideoForm
          handleChange={handleChange}
          values={values}
          title={"Edit Video Pembelajaran"}
        />
      </FullScreenDialog>

      <CommonDelete
        open={openDelete}
        handleClose={() => {
          handleCloseMenu();
          setOpenDelete(false);
        }}
        handleSubmit={handleDelete}
      />

      <Menu anchorEl={anchorEl} open={openMenu} onClose={handleCloseMenu}>
        <MenuItem
          onClick={handleLoadVideo}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleCloseMenu();
            setOpenDelete(true);
          }}
        >
          Hapus
        </MenuItem>
      </Menu>
    </DetailTeacherClass>
  );
};
