import { Box, TextField, Typography } from "@mui/material";
import React from "react";

export const AddClassForm = ({ title, values, onChange }) => {
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
        value={values?.name}
        name="name"
        label="Nama Kelas"
        onChange={onChange}
      />
      <TextField
        fullWidth
        required
        value={values?.code}
        name="code"
        label="Kode Kelas"
        onChange={onChange}
      />
    </Box>
  );
};
