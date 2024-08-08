import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";
import { Button } from "@mui/material";
import toast from "react-hot-toast";
import { useLoading } from "../../../context/LoadingContext";
import { fetchAPI, laravelAPI, pdfAPI } from "../../../utils/Fetching";
import { useEffect } from "react";
import { useState } from "react";

export default function AssignmentStudentsTable({ selectedStudent }) {
  const { setIsLoading } = useLoading();
  const [data, setData] = useState(null);
  const handlePrint = async () => {
    try {
      setIsLoading(true);
      const res = await laravelAPI(`/pdf/speech/student_assignments`, data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoad = async () => {
    try {
      setIsLoading(true);
      const res = await fetchAPI(`/assignments/students/${selectedStudent}`);
      setData(res.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    selectedStudent && handleLoad();
  }, [selectedStudent]);

  return (
    <>
      {data && (
        <>
          <Button
            variant="contained"
            sx={{ marginBottom: 2 }}
            onClick={handlePrint}
          >
            Cetak
          </Button>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Kelas</TableCell>
                  <TableCell>Judul Tugas</TableCell>
                  <TableCell>Nilai</TableCell>
                  <TableCell>Keterangan</TableCell>
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
                        {row.class.name}
                      </TableCell>
                      <TableCell>{row.title}</TableCell>
                      <TableCell>{row.student_answer.grade}</TableCell>
                      <TableCell>{row.student_answer.ontime ? "Tepat Waktu" : "Terlambat"}</TableCell>
                      <TableCell>{row.register_string}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
}
