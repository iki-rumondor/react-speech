import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { useLoading } from "../../../context/LoadingContext";
import { useEffect, useState } from "react";
import { UpdateTeacherForm } from "../forms/UpdateTeacherForm";
import { CommonDelete } from "../dialog/CommonDelete";
import { deleteAPI } from "../../../utils/Fetching";
import toast from "react-hot-toast";

export default function MasterTeacherTable({ data }) {
  const { setIsLoading, setIsSuccess, isSuccess } = useLoading();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectRow, setSelectrow] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleSubmit = async () => {
    setOpenDelete(false);
    try {
      setIsLoading(true);
      setIsSuccess(false);
      const res = await deleteAPI(`/teachers/${selectRow}`);
      setIsSuccess(true);
      toast.success(res.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setAnchorEl(null);
  }, [isSuccess]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Nama</TableCell>
              <TableCell>NIDN</TableCell>
              <TableCell>Program Studi</TableCell>
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((row, idx) => (
                <TableRow
                  key={idx}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>{row.nidn}</TableCell>
                  <TableCell>{row.department}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={(event) => {
                        setSelectrow(row.uuid);
                        setAnchorEl(event.currentTarget);
                      }}
                    >
                      <MoreVert />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={() => {
          setAnchorEl(null);
        }}
      >
        <MenuItem
          onClick={() => {
            setOpenEdit(true);
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            setOpenDelete(true);
          }}
        >
          Hapus
        </MenuItem>
      </Menu>

      <CommonDelete
        open={openDelete}
        handleClose={() => {
          setOpenDelete(false);
        }}
        handleSubmit={handleSubmit}
      />

      <UpdateTeacherForm
        open={openEdit}
        setOpen={setOpenEdit}
        selectRow={selectRow}
      />
    </>
  );
}
