import { Box, TextField, Typography } from "@mui/material";
import React from "react";

export const AddDepartmentForm = ({ title, values, onChange }) => {
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
        label="Nama Program Studi"
        onChange={onChange}
      />
    </Box>
  );
};
