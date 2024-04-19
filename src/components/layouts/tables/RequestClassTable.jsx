import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Stack } from "@mui/material";
import {
  CheckCircle,
  Dangerous,
  DoNotDisturb,
  HourglassBottom,
  Verified,
} from "@mui/icons-material";
import { SelectInput } from "../input/SelectInput";
import ConfirmDialog from "../dialog/ConfirmDialog";
import { useLoading } from "../../../context/LoadingContext";
import toast from "react-hot-toast";
import { postAPI } from "../../../utils/Fetching";
import moment from "moment";

export default function RequestClassTable({ data }) {
  const student = sessionStorage.getItem("role") == "MAHASISWA";
  const { setIsLoading, setIsSuccess } = useLoading();

  const handleSubmit = async (uuid) => {
    try {
      setIsLoading(true);
      setIsSuccess(false);
      const res = await postAPI(`/classes/${uuid}/request`, "PATCH", {
        status: 2,
      });
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
              <TableCell>Nama Kelas</TableCell>
              <TableCell>Nama Mahasiswa</TableCell>
              <TableCell>Mendaftar Pada</TableCell>
              <TableCell>Status</TableCell>
              {!student && <TableCell>Aksi</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((row, idx) => {
                const status =
                  row.status == "1" ? (
                    <HourglassBottom sx={{ fontSize: 20 }} color="warning" />
                  ) : row.status == "2" ? (
                    <CheckCircle sx={{ fontSize: 20 }} color="success" />
                  ) : (
                    <DoNotDisturb sx={{ fontSize: 20 }} color="error" />
                  );
                const t = new Date(row.created_at);
                const date = moment(t).format("L");
                return (
                  <TableRow
                    key={idx}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell component="th" scope="row">
                      {row.class_name}
                    </TableCell>
                    <TableCell>{row.teacher}</TableCell>
                    <TableCell>{date}</TableCell>
                    <TableCell>{status}</TableCell>
                    {!student && (
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          {row.status != "1" ? (
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
                    )}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
