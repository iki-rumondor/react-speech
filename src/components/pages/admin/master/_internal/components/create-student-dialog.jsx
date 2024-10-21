import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

export default function CreateStudentDialog({
  values,
  setValues,
  handleSubmit,
}) {
  const [open, setOpen] = useState(false);
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="contained"
        sx={{ marginBottom: 1 }}
      >
        Tambah
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Tambah Mahasiswa</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ marginBottom: 3 }}>
            Silahkan lengkapi data berikut
          </DialogContentText>
          <TextField
            fullWidth
            required
            value={values?.name}
            name="name"
            label="Nama Lengkap"
            sx={{ marginBottom: 2 }}
            onChange={onChange}
          />
          <TextField
            fullWidth
            required
            value={values?.nim}
            name="nim"
            label="Nomor Induk Mahasiswa"
            sx={{ marginBottom: 2 }}
            onChange={onChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Kembali</Button>
          <Button type="submit">Tambahkan</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
