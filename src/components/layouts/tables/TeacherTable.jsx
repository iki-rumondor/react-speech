import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Stack } from "@mui/material";
import { Dangerous, Verified } from "@mui/icons-material";
import { SelectInput } from "../input/SelectInput";
import ConfirmDialog from "../dialog/ConfirmDialog";
import { useLoading } from "../../../context/LoadingContext";
import toast from "react-hot-toast";
import { postAPI } from "../../../utils/Fetching";

export default function TeacherTable({ data }) {
  const { setIsLoading, setIsSuccess } = useLoading();

  const handleSubmit = async (uuid) => {
    try {
      setIsLoading(true);
      setIsSuccess(false);
      const res = await postAPI(`/teacher/${uuid}/activate`, "PATCH");
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
              <TableCell>Email</TableCell>
              <TableCell>NIP</TableCell>
              <TableCell>Program Studi</TableCell>
              <TableCell>Status</TableCell>
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
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.nip}</TableCell>
                  <TableCell>{row.department}</TableCell>
                  <TableCell>
                    {row.status ? (
                      <Verified color="success" />
                    ) : (
                      <Dangerous color="error" />
                    )}
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      {row.status ? (
                        "-"
                      ) : (
                        <ConfirmDialog
                          buttonName={"Verifikasi"}
                          color={"success"}
                          title={"Verifikasi Dosen"}
                          handleSubmit={() => {
                            handleSubmit(row.uuid);
                          }}
                        />
                      )}
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
