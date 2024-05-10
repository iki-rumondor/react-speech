import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

export const CommonDelete = ({open, handleClose, handleSubmit}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="alert-dialog-title">
        {"Apakah Yakin Untuk Menghapus Data Ini?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Tekan tombol Hapus untuk melanjutkan
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Batal</Button>
        <Button color="error" onClick={handleSubmit} autoFocus>
          Hapus
        </Button>
      </DialogActions>
    </Dialog>
  );
};
