import FullScreenDialog from "../../layouts/dialog/FullScreenDialog";
import { Divider, Fab, Grid, Menu, MenuItem, Typography } from "@mui/material";
import toast from "react-hot-toast";
import { DetailTeacherClass } from "./DetailClass";
import { useEffect, useState } from "react";
import { Add } from "@mui/icons-material";
import { useUtils } from "../../../context/UtilsContext";
import { useLoading } from "../../../context/LoadingContext";
import { deleteAPI, fetchAPI, postFile } from "../../../utils/Fetching";
import { BookCard } from "../../layouts/cards/BookCard";
import { AddBookForm } from "../../layouts/forms/AddBookForm";
import { CommonDelete } from "../../layouts/dialog/CommonDelete";

const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
};

export const ListBooks = () => {
  const { classSelected } = useUtils();
  const { isSuccess, setIsLoading, setIsSuccess } = useLoading();

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const [selectID, setSelectID] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);

  const defaultValue = {
    title: "",
    description: "",
  };

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
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

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLoad = async () => {
    try {
      setIsLoading(true);
      const res = await fetchAPI(`/books/classes/${classSelected}`);
      setData(res.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = () => {
    handleOpen();
    if (!file) {
      toast.error("Belum Terdapat File Buku");
      return;
    }

    const formData = new FormData();
    formData.append("book", file);
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("class_uuid", classSelected);

    handleSubmit(formData);
  };

  const handleSubmit = async (formData) => {
    try {
      setIsLoading(true);
      setIsSuccess(false);
      const res = await postFile(`/books`, "POST", formData);
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
      const res = await deleteAPI(`/books/${selectID}`);
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
    <DetailTeacherClass title={"List Buku Pembelajaran"}>
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
        List Buku
      </Typography>
      <Divider sx={{ marginY: 2 }} />

      <Grid container spacing={2} marginBottom={3}>
        {data &&
          data.map((book) => (
            <Grid key={book.uuid} item xs={12} md={6} lg={4}>
              <BookCard
                book={book}
                setAnchorEl={setAnchorEl}
                setSelectID={setSelectID}
              />
            </Grid>
          ))}
      </Grid>
      <FullScreenDialog
        handleClose={handleOpen}
        open={open}
        handleSubmit={handleClick}
      >
        <AddBookForm
          file={file}
          handleChange={handleChange}
          handleFileChange={handleFileChange}
          values={values}
          title={"Tambah Buku Pembelajaran"}
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
