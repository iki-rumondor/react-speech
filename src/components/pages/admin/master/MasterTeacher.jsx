import React, { useEffect, useState } from "react";
import { DashboardLayout } from "../../../layouts/DashboardLayout";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  Paper,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import FullScreenDialog from "../../../layouts/dialog/FullScreenDialog";
import { useLoading } from "../../../../context/LoadingContext";
import { convertToMB } from "../../../../utils/Helpers";
import UploadFileInput from "../../../layouts/input/UploadFileInput";
import { fetchAPI, postAPI, postFile } from "../../../../utils/Fetching";
import toast from "react-hot-toast";
import MasterTeacherTable from "../../../layouts/tables/MasterTeacherTable";
import CreateTeacherDialog from "./_internal/components/create-teacher-dialog";

const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
};

export const MasterTeacher = () => {
  const { isSuccess, setIsLoading, setIsSuccess } = useLoading();
  const [values, setValues] = useState({
    department_uuid: "",
    name: "",
    nidn: "",
  });

  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [failedData, setFailedData] = useState(false);
  const [data, setData] = useState(null);
  const [file, setFile] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleLoad = async () => {
    try {
      setIsLoading(true);
      const res = await fetchAPI(`/teachers`);
      setData(res.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (file == null) {
      toast.error("File Tidak Diupload");
      return;
    }
    try {
      setIsLoading(true);
      setIsSuccess(false);
      const data = new FormData();
      data.append("teachers", file);
      const res = await postFile(`/teachers/import`, "POST", data);
      setFailedData(res.data);
      setIsSuccess(true);
      toast.success("Data Dosen Berhasil Diupload");
      setFile(null);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
      handleClose();
      setOpenDialog(true);
    }
  };

  const handleAddTeacher = async () => {
    try {
      setIsLoading(true);
      setIsSuccess(false);
      const res = await postAPI(`/teachers`, "POST", values);
      setIsSuccess(true);
      toast.success(res.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleLoad();
  }, [isSuccess]);

  return (
    <DashboardLayout name={"Manajemen Dosen Pengajar"}>
      <Fab sx={fabStyle} color="primary" aria-label="add" onClick={handleOpen}>
        <Add />
      </Fab>
      <Container>
        <CreateTeacherDialog
          values={values}
          setValues={setValues}
          handleSubmit={handleAddTeacher}
        />
        <Box>{data && <MasterTeacherTable data={data} />}</Box>
      </Container>
      <FullScreenDialog
        handleSubmit={handleSubmit}
        handleClose={handleClose}
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
            Import File Dosen
          </Typography>
          <p>
            Silahkan Import File Excel Berisi Data Dosen Dengan Format Berikut
            Dengan Menekan Tombol Dibawah Ini
          </p>
          <small>*File Yang Diupload Harus Dalam Format .xlsx</small>
          <UploadFileInput
            handleChange={handleFileChange}
            name={"Import Excel"}
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
      </FullScreenDialog>
      <Dialog
        maxWidth={"xl"}
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>{"Daftar Data Yang Gagal Diupload"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Nama</TableCell>
                    <TableCell>Pesan</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {failedData &&
                    failedData.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell>{row.message}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Keluar</Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
};
