import FullScreenDialog from "../../layouts/dialog/FullScreenDialog";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Fab,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";
import { DetailTeacherClass } from "./DetailClass";
import { useEffect, useState } from "react";
import { Add, MoreVert } from "@mui/icons-material";
import { useUtils } from "../../../context/UtilsContext";
import { useLoading } from "../../../context/LoadingContext";
import { deleteAPI, fetchAPI, postAPI } from "../../../utils/Fetching";
import { AddNoteForm } from "../../layouts/forms/AddNoteForm";
import moment from "moment";
import { CommonDelete } from "../../layouts/dialog/CommonDelete";

const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
};

export const ListNotes = () => {
  const { classSelected } = useUtils();
  const { isSuccess, setIsLoading, setIsSuccess } = useLoading();
  const defaultValue = {
    title: "",
    body: "",
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [notes, setNotes] = useState(null);
  const [values, setValues] = useState(defaultValue);

  const [selectID, setSelectID] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpen = () => {
    setValues({ ...values, class_uuid: classSelected });
    setOpen(!open);
  };

  const handleOpenEdit = () => {
    setValues({ ...values, class_uuid: classSelected });
    setOpenEdit(!openEdit);
  };

  const handleCloseEdit = () => {
    setValues(defaultValue);
    setOpenEdit(!openEdit);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleLoad = async () => {
    try {
      setIsLoading(true);
      const res = await fetchAPI(`/notes/classes/${classSelected}`);
      setNotes(res.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      handleOpen();
      setIsLoading(true);
      setIsSuccess(false);
      const res = await postAPI(`/notes`, "POST", values);
      setIsSuccess(true);
      setValues(defaultValue);
      toast.success(res.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadNote = async () => {
    try {
      handleCloseMenu();
      handleOpenEdit();
      setIsLoading(true);
      const res = await fetchAPI(`/notes/${selectID}`);
      setValues({
        class_uuid: classSelected,
        title: res.data.title,
        body: res.data.body,
      });
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
      const res = await postAPI(`/notes/${selectID}`, "PUT", values);
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
      const res = await deleteAPI(`/notes/${selectID}`);
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
    <DetailTeacherClass title={"Daftar Catatan Pembelajaran"}>
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

      {notes &&
        notes.map((item) => (
          <Card key={item.uuid} variant="outlined" sx={{ marginY: 2 }}>
            <CardHeader
              avatar={<Avatar></Avatar>}
              title={item.title}
              subheader={moment.unix(item.created_at / 1000).fromNow()}
              action={
                <>
                  <IconButton
                    onClick={(e) => {
                      handleClick(e);
                      setSelectID(item.uuid);
                    }}
                  >
                    <MoreVert />
                  </IconButton>
                </>
              }
            />
            <CardContent>
              <Typography component={"div"}>
                {item.body.split("\n").map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </Typography>
            </CardContent>
          </Card>
        ))}
      <FullScreenDialog
        handleClose={handleOpen}
        open={open}
        handleSubmit={handleSubmit}
      >
        <AddNoteForm
          handleChange={handleChange}
          values={values}
          title={"Tambah Catatan Pembelajaran"}
        />
      </FullScreenDialog>

      <FullScreenDialog
        handleClose={handleCloseEdit}
        open={openEdit}
        handleSubmit={handleUpdate}
      >
        <AddNoteForm
          handleChange={handleChange}
          values={values}
          title={"Edit Catatan Pembelajaran"}
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
        <MenuItem onClick={handleLoadNote}>Edit</MenuItem>
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
