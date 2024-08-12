import { Box, TextField, Typography } from "@mui/material";
import React from "react";
import { SelectInput } from "../input/SelectInput";

export const AddSubjectForm = ({
  teachers,
  values,
  onChange,
  title = "Tambah Mata Kuliah",
}) => {
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
      <SelectInput
        handleChange={onChange}
        id={"teacher_uuid"}
        value={values.teacher_uuid}
        label={"Pilih Dosen Pengajar"}
        sx={{ marginLeft: 1, marginY: 1 }}
        items={teachers}
      />
      <TextField
        fullWidth
        required
        value={values?.name}
        name="name"
        label="Nama Mata Kuliah"
        onChange={onChange}
      />
      <TextField
        fullWidth
        required
        value={values?.code}
        name="code"
        label="Kode Mata Kuliah"
        onChange={onChange}
      />
    </Box>
  );
};
