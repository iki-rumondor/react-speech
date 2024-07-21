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
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Add, MoreVert, PlayCircle } from "@mui/icons-material";
import FullScreenDialog from "../../layouts/dialog/FullScreenDialog";
import { useLoading } from "../../../context/LoadingContext";
import { AddMaterialForm } from "../../layouts/forms/AddMaterialForm";
import { DetailTeacherClass } from "./DetailClass";
import moment from "moment";
import { useUtils } from "../../../context/UtilsContext";
import { deleteAPI, fetchAPI, postAPI } from "../../../utils/Fetching";
import toast from "react-hot-toast";
import { getBackendUrl } from "../../../utils/Helpers";
import { CommonDelete } from "../../layouts/dialog/CommonDelete";

export const Materials = () => {
  const fabStyle = {
    position: "absolute",
    bottom: 16,
    right: 16,
  };

  const { setIsLoading, setIsSuccess, isSuccess } = useLoading();
  const { classSelected } = useUtils();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  // const dummy = [{ title: "sd", description: "Desc" }];
  const [materials, setMaterials] = useState(null);
  const backendUrl = getBackendUrl();
  const defaultValue = {
    title: "",
    description: "",
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

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClickAction = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const [selectID, setSelectID] = useState(null);

  const submitButton = useRef();

  const handleClick = () => {
    if (submitButton.current) {
      submitButton.current.handleSubmit();
    }
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenEdit = () => {
    setValues({ ...values, class_uuid: classSelected });
    setOpenEdit(!openEdit);
  };

  const handleCloseEdit = () => {
    setValues(defaultValue);
    setOpenEdit(!openEdit);
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

  const handleLoadMaterial = async () => {
    try {
      handleCloseMenu();
      handleOpenEdit();
      setIsLoading(true);
      const res = await fetchAPI(`/materials/${selectID}`);
      setValues(res?.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    handleCloseEdit();
    try {
      setIsLoading(true);
      setIsSuccess(false);
      const res = await postAPI(`/materials/${selectID}`, "PUT", values);
      setIsSuccess(true);
      setValues(defaultValue);
      toast.success(res.message);
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
      const res = await deleteAPI(`/materials/${selectID}`);
      setIsSuccess(true);
      toast.success(res.message);
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
              action={
                <>
                  <IconButton
                    onClick={(e) => {
                      handleClickAction(e);
                      setSelectID(item.uuid);
                    }}
                  >
                    <MoreVert />
                  </IconButton>
                </>
              }
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
      <FullScreenDialog
        open={openEdit}
        handleClose={handleCloseEdit}
        title={"Edit Materi Pembelajaran"}
        handleSubmit={handleSubmit}
      >
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1 },
          }}
        >
          <Typography
            component={"h2"}
            variant="h5"
            marginBottom={2}
            marginLeft={1}
          >
            Tambah Materi Pembelajaran
          </Typography>
          <TextField
            fullWidth
            required
            value={values?.title}
            name="title"
            label="Judul Materi"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            required
            multiline
            rows={4}
            value={values?.description}
            name="description"
            label="Tuliskan Deskripsi Materi"
            onChange={handleChange}
          />
        </Box>
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
        <MenuItem onClick={handleLoadMaterial}>Edit</MenuItem>
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
