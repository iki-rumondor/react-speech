import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton, Stack } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useLoading } from "../../../context/LoadingContext";
import { useState } from "react";
import FullScreenDialog from "../dialog/FullScreenDialog";
import { AddDepartmentForm } from "../forms/AddDepartmentForm";
import { fetchAPI, postAPI } from "../../../utils/Fetching";
import toast from "react-hot-toast";
import DeleteDialog from "../dialog/DeleteDialog";

export default function DepartmentTable({ data }) {
  const { setIsLoading, setIsSuccess } = useLoading();
  const [open, setOpen] = useState(false);
  const [uuid, setUuid] = useState(null);
  const [values, setValues] = useState(null);
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
      const res = await fetchAPI(`/department/${uuid}`);
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
      const res = await postAPI(`/department/${uuid}`, "PUT", values);
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
              <TableCell>No</TableCell>
              <TableCell>Nama</TableCell>
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, idx) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{idx + 1}</TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <DeleteDialog endpoint={`/department/${row.uuid}`} />
                    <IconButton
                      onClick={() => handleOpen(row.uuid)}
                      aria-label="edit"
                      color="primary"
                    >
                      <Edit fontSize="small" />
                    </IconButton>
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
      >
        <AddDepartmentForm
          title={"Update Data Program Studi"}
          values={values}
          onChange={handleChange}
        />
      </FullScreenDialog>
    </>
  );
}
