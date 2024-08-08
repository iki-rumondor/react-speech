import { Box, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLoading } from "../../../context/LoadingContext";
import toast from "react-hot-toast";
import { fetchAPI, postAPI, postFile } from "../../../utils/Fetching";
import FullScreenDialog from "../dialog/FullScreenDialog";

export const UpdateAssignmentForm = ({ open, setOpen, selectRow }) => {
  const { setIsLoading, setIsSuccess } = useLoading();

  const defaultValue = {
    title: "",
    description: "",
  };

  const [values, setValues] = useState(defaultValue);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoad = async () => {
    try {
      setIsLoading(true);
      const res = await fetchAPI(`/assignments/${selectRow}`);
      setValues(res.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setIsSuccess(false);
      const res = await postAPI(`/assignments/${selectRow}`, "PUT", values);
      setIsSuccess(true);
      toast.success(res.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };

  useEffect(() => {
    selectRow && handleLoad();
  }, [selectRow]);

  return (
    <>
      <FullScreenDialog
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
        title={"Update Tugas"}
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
            Update Tugas
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
        </Box>
      </FullScreenDialog>
    </>
  );
};
