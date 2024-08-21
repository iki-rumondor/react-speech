import React, { useEffect, useState } from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Book, Groups } from "@mui/icons-material";
import { DashboardCard } from "../../layouts/cards/DashboardCard";
import { fetchAPI } from "../../../utils/Fetching";
import toast from "react-hot-toast";
import { useLoading } from "../../../context/LoadingContext";
import { SelectInput } from "../../layouts/input/SelectInput";

export const TeacherDashboard = () => {
  const { setIsLoading } = useLoading();
  const [data, setData] = useState(null);
  const [classes, setClasses] = useState(null);
  const [students, setStudents] = useState(null);
  const [selectClass, setSelectClass] = useState("");

  const handleLoad = async () => {
    try {
      setIsLoading(true);
      const res = await fetchAPI(`/dashboards/teacher`);
      const res2 = await fetchAPI(`/classes`);
      const classes =
        res2.data &&
        res2.data.map((item) => {
          return {
            name: item.name,
            value: item.uuid,
          };
        });
      setData(res.data);
      setClasses(classes);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadStudents = async () => {
    try {
      setIsLoading(true);
      const res = await fetchAPI(`/students/classes/${selectClass}`);
      setStudents(res.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleLoad();
  }, []);

  useEffect(() => {
    if (selectClass) {
      handleLoadStudents();
    }
  }, [selectClass]);

  return (
    <DashboardLayout
      name={`Selamat Datang ${data?.teacher?.name ?? "Pengajar"} (${
        data?.teacher?.nidn
      })`}
    >
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <DashboardCard
            icon={<Groups style={{ fontSize: 50, color: "#FFC55A" }} />}
            title={data?.jumlah_kelas}
            subtitle={"Jumlah Tugas"}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <DashboardCard
            icon={<Book style={{ fontSize: 50, color: "#EE4E4E" }} />}
            title={data?.jumlah_materi}
            subtitle={"Jumlah Materi"}
          />
        </Grid>
      </Grid>

      <Typography
        component={"h1"}
        sx={{ marginY: 2, fontSize: "1.2rem", fontWeight: "medium" }}
      >
        Daftar Mahasiswa Per Kelas
      </Typography>
      <SelectInput
        handleChange={(e) => setSelectClass(e.target.value)}
        value={selectClass}
        id={"class_uuid"}
        items={classes}
        label={"Pilih Kelas"}
        size={"small"}
        sx={{ backgroundColor: "white" }}
      />
      <Box width={"100%"} marginTop={2}>
        {students && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Nama</TableCell>
                  <TableCell>NIM</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((row, i) => (
                  <TableRow
                    key={i}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {i + 1}
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.nim}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </DashboardLayout>
  );
};
