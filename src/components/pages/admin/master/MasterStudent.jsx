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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import FullScreenDialog from "../../../layouts/dialog/FullScreenDialog";
import StudentTable from "../../../layouts/tables/StudentTable";
import { useLoading } from "../../../../context/LoadingContext";
import toast from "react-hot-toast";
import { fetchAPI, postAPI, postFile } from "../../../../utils/Fetching";
import UploadFileInput from "../../../layouts/input/UploadFileInput";
import { convertToMB } from "../../../../utils/Helpers";
import CreateStudentDialog from "./_internal/components/create-student-dialog";

const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
};

export const MasterStudent = () => {
  const { isSuccess, setIsLoading, setIsSuccess } = useLoading();
  const [values, setValues] = useState({
    name: "",
    nim: "",
  });

  const [data, setData] = useState(null);
  const [file, setFile] = useState(null);
  const [openCreate, setOpenCreate] = useState(false);
  const [failedData, setFailedData] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleLoad = async () => {
    try {
      setIsLoading(true);
      const res = await fetchAPI(`/students`);
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
      data.append("students", file);
      const res = await postFile(`/students/import`, "POST", data);
      setFailedData(res.data);
      setIsSuccess(true);
      toast.success("Data Mahasiswa Berhasil Diupload");
      setFile(null);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
      setOpenCreate(false);
      setOpenDialog(true);
    }
  };

  useEffect(() => {
    handleLoad();
  }, [isSuccess]);

  const handleAddStudent = async () => {
    try {
      setIsLoading(true);
      setIsSuccess(false);
      const res = await postAPI(`/students`, "POST", values);
      setIsSuccess(true);
      toast.success(res.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout name={"Manajemen Mahasiswa"}>
      <Fab
        sx={fabStyle}
        color="primary"
        aria-label="add"
        onClick={() => {
          setOpenCreate(true);
        }}
      >
        <Add />
      </Fab>
      <Container>
        <CreateStudentDialog
          values={values}
          setValues={setValues}
          handleSubmit={handleAddStudent}
        />
        <Box>{data && <StudentTable data={data} />}</Box>
      </Container>
      <FullScreenDialog
        handleSubmit={handleSubmit}
        handleClose={() => {
          setOpenCreate(false);
        }}
        open={openCreate}
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
            Import File Mahasiswa
          </Typography>
          <p>
            Silahkan Import File Excel Berisi Data Mahasiswa Dengan Format
            Berikut
          </p>
          <small>*File Yang Diupload Harus Dalam Format .xlsx</small>
          <UploadFileInput
            handleChange={(e) => {
              if (e.target.files) {
                setFile(e.target.files[0]);
              }
            }}
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
