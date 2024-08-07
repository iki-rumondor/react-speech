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
import { fetchAPI, pdfAPI } from "../../../utils/Fetching";
import { useEffect } from "react";
import { useState } from "react";

export default function StudentClassTable({ selectedClass }) {
  const { setIsLoading } = useLoading();
  const [data, setData] = useState(null);
  const handlePrint = async () => {
    try {
      setIsLoading(true);
      const res = await pdfAPI(`/pdf/reports/classes/${selectedClass}`, data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoad = async () => {
    try {
      setIsLoading(true);
      const res = await fetchAPI(`/classes/${selectedClass}`);

      const students =
        res?.data?.students &&
        res.data.students.map((item) => {
          return {
            ...item,
            register_string: moment
              .unix(item.register_class_time / 1000)
              .format("DD MMMM YYYY"),
          };
        });

      const respData = {
        ...res.data,
        students: students,
      };

      setData(respData);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    selectedClass && handleLoad();
    console.log(data);
  }, [selectedClass]);

  return (
    <>
      {data?.students && (
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
                  <TableCell>Nama Mahasiswa</TableCell>
                  <TableCell>NIM</TableCell>
                  <TableCell>Tanggal Bergabung</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.students &&
                  data.students.map((row, idx) => (
                    <TableRow
                      key={idx}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell>{row.nim}</TableCell>
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
