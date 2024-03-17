import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Fragment, useState } from "react";
import { deleteAPI } from "../../../utils/Fetching";
import toast from "react-hot-toast";
import { useLoading } from "../../../context/LoadingContext";

export default function DeleteDialog({ endpoint }) {
  const [open, setOpen] = useState(false);
  const { setIsLoading, setIsSuccess } = useLoading();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    handleClose();
    try {
      setIsLoading(true);
      setIsSuccess(false);
      const res = await deleteAPI(endpoint);
      setIsSuccess(true);
      toast.success(res.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Fragment>
      <IconButton aria-label="delete" color="error" onClick={handleClickOpen}>
        <Delete fontSize="small" />
      </IconButton>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
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
    </Fragment>
  );
}
