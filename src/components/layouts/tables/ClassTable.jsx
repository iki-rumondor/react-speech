import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton, Stack } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import DeleteDialog from "../dialog/DeleteDialog";
import { useLoading } from "../../../context/LoadingContext";
import toast from "react-hot-toast";
import { fetchAPI, postAPI } from "../../../utils/Fetching";
import { useState } from "react";
import FullScreenDialog from "../dialog/FullScreenDialog";
import { AddClassForm } from "../forms/AddClassForm";
import { AddSubjectForm } from "../forms/AddSubjectForm";

export default function ClassTable({ data }) {
  const { setIsLoading, setIsSuccess } = useLoading();
  const [open, setOpen] = useState(false);
  const [uuid, setUuid] = useState(false);
  const [teachers, setTeachers] = useState(null);
  const [values, setValues] = useState({
    name: "",
    code: "",
    teacher_uuid: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleOpen = (uuid) => {
    setOpen(true);
    handleLoad(uuid);
    setUuid(uuid);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLoad = async (uuid) => {
    try {
      setIsLoading(true);
      const res = await fetchAPI(`/classes/${uuid}`);
      const res2 = await fetchAPI(`/teachers`);
      const teachers =
        res2.data &&
        res2.data.map((item) => {
          return {
            name: item.name,
            value: item.uuid,
          };
        });
      setTeachers(teachers);
      setValues(res.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    handleClose();
    try {
      setIsLoading(true);
      setIsSuccess(false);
      const res = await postAPI(`/classes/${uuid}`, "PUT", values);
      setIsSuccess(true);
      toast.success(res.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nama</TableCell>
              <TableCell>Kode</TableCell>
              <TableCell>Dosen Pengajar</TableCell>
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((row) => (
                <TableRow
                  key={row.code}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>{row.code}</TableCell>
                  <TableCell>{row.teacher}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        onClick={() => handleOpen(row.uuid)}
                        aria-label="edit"
                        color="primary"
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                      <DeleteDialog endpoint={`/classes/${row.uuid}`} />
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <FullScreenDialog
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        open={open}
        title={"Update Mata Kuliah"}
      >
        <AddSubjectForm
          title={"Update Mata Kuliah"}
          values={values}
          onChange={handleChange}
          teachers={teachers}
        />
      </FullScreenDialog>
    </>
  );
}
