import { Box, TextField, Typography } from "@mui/material";

export const AddNoteForm = ({ title, handleChange, values }) => {
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
        label="Judul Catatan"
        onChange={handleChange}
      />
      <TextField
        fullWidth
        required
        multiline
        rows={8}
        value={values?.body}
        name="body"
        label="Tuliskan Isi Catatan"
        onChange={handleChange}
      />
    </Box>
  );
};
