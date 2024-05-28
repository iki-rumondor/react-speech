import { Box, Divider, TextField, Typography } from "@mui/material";
import React from "react";
import UploadFileInput from "../input/UploadFileInput";

export const AddVideoForm = ({
  title,
  handleChange,
  handleFileChange,
  values,
  file,
}) => {
  const convertToMB = (bytes) => {
    const size = (bytes / (1024 * 1024)).toFixed(2);
    return `${size} MB`;
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1 },
      }}
    >
      <Typography component={"h2"} variant="h5" marginBottom={2} marginLeft={1}>
        {title}
      </Typography>
      <TextField
        fullWidth
        required
        value={values?.title}
        name="title"
        label="Judul Video"
        onChange={handleChange}
      />
      <TextField
        fullWidth
        required
        multiline
        rows={4}
        value={values?.description}
        name="description"
        label="Deskripsi Video"
        onChange={handleChange}
      />
      <Divider sx={{ marginY: 3 }} />
      <UploadFileInput
        handleChange={handleFileChange}
        name={"Tambahkan Video"}
      />
      {file && (
        <>
          <div style={{ marginTop: 10 }}>File Detail: </div>
          <ul>
            <li>Nama File: {file.name}</li>
            <li>Tipe: {file.type}</li>
            <li>Ukuran: {convertToMB(file.size)}</li>
          </ul>
        </>
      )}
    </Box>
  );
};

export const EditVideoForm = ({ title, handleChange, values }) => {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1 },
      }}
    >
      <Typography component={"h2"} variant="h5" marginBottom={2} marginLeft={1}>
        {title}
      </Typography>
      <TextField
        fullWidth
        required
        value={values?.title}
        name="title"
        label="Judul Video"
        onChange={handleChange}
      />
      <TextField
        fullWidth
        required
        multiline
        rows={4}
        value={values?.description}
        name="description"
        label="Deskripsi Video"
        onChange={handleChange}
      />
    </Box>
  );
};
