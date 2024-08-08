import { Box, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import FullScreenDialog from "../dialog/FullScreenDialog";
import toast from "react-hot-toast";
import { useLoading } from "../../../context/LoadingContext";
import { fetchAPI, postAPI } from "../../../utils/Fetching";

export const UpdateStudentForm = ({ selectRow, open, setOpen }) => {
  const { setIsLoading, setIsSuccess } = useLoading();
  const [values, setValues] = useState({
    name: "",
    nim: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleLoad = async () => {
    try {
      setIsLoading(true);
      const res = await fetchAPI(`/students/${selectRow}`);
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
      const res = await postAPI(`/students/${selectRow}`, "PUT", values);
      setIsSuccess(true);
      toast.success(res.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
      setOpen(false)
    }
  };

  useEffect(() => {
    if (selectRow) {
      handleLoad();
    }
  }, [open]);

  return (
    <FullScreenDialog
      handleSubmit={handleSubmit}
      handleClose={() => {
        setOpen(false);
      }}
      open={open}
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
          Update Data Mahasiswa
        </Typography>
        <TextField
          fullWidth
          required
          value={values?.name}
          name="name"
          label="Nama Mahasiswa"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          required
          value={values?.nim}
          name="nim"
          label="Nomor Induk Mahasiswa"
          onChange={handleChange}
        />
      </Box>
    </FullScreenDialog>
  );
};
