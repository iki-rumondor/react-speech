import { Box, Divider, Fab, TextField, Typography } from "@mui/material";
import UploadFileInput from "../input/UploadFileInput";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { convertToMB } from "../../../utils/Helpers";
import { useLoading } from "../../../context/LoadingContext";
import toast from "react-hot-toast";
import { postAPI } from "../../../utils/Fetching";
import { useUtils } from "../../../context/UtilsContext";
import FullScreenDialog from "../dialog/FullScreenDialog";
import { Add } from "@mui/icons-material";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";

export const AddAssignmentForm = () => {
  const fabStyle = {
    position: "absolute",
    bottom: 16,
    right: 16,
  };

  const { classSelected } = useUtils();

  const { setIsLoading, setIsSuccess } = useLoading();
  const [open, setOpen] = useState(false);
  const [deadline, setDeadline] = useState(dayjs());

  const defaultValue = {
    title: "",
    description: "",
    deadline: 0,
  };

  const [values, setValues] = useState(defaultValue);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setIsSuccess(false);
      const res = await postAPI(`/assignments`, "POST", {
        ...values,
        class_uuid: classSelected,
        deadline: parseInt(deadline.format("x")),
      });
      setIsSuccess(true);
      toast.success(res.message);
      setValues(defaultValue);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      {classSelected && (
        <Fab
          sx={fabStyle}
          color="primary"
          aria-label="add"
          onClick={() => {
            setOpen(true);
          }}
        >
          <Add />
        </Fab>
      )}
      <FullScreenDialog
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
        title={"Tambah Tugas"}
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
            Tambah Tugas
          </Typography>
          <TextField
            fullWidth
            required
            value={values?.title}
            name="title"
            label="Judul Tugas"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            required
            multiline
            rows={4}
            value={values?.description}
            name="description"
            label="Tuliskan Deskripsi Tugas"
            onChange={handleChange}
          />

          <DatePicker
            sx={{ display: "block" }}
            onChange={(value) => setDeadline(value)}
            value={deadline}
            label="Pilih Tanggal Deadline"
          />
        </Box>
      </FullScreenDialog>
    </>
  );
};
