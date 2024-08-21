import React, { useEffect, useState } from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import { Box, Grid } from "@mui/material";
import {
  Book,
  Close,
  Groups,
  LibraryBooks,
  NotAccessible,
  People,
  PersonOff,
  School,
  ShoppingBag,
  Verified,
  VideoCameraBack,
  X,
} from "@mui/icons-material";
import { DashboardCard } from "../../layouts/cards/DashboardCard";
import { fetchAPI } from "../../../utils/Fetching";
import toast from "react-hot-toast";
import { useLoading } from "../../../context/LoadingContext";

export const StudentDashboard = () => {
  const { setIsLoading } = useLoading();
  const [data, setData] = useState();

  const handleLoad = async () => {
    try {
      setIsLoading(true);
      const res = await fetchAPI(`/dashboards/student`);
      setData(res.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <DashboardLayout
      name={`Selamat Datang ${data?.student?.name ?? "Mahasiswa"} (${
        data?.student?.nim
      })`}
    >
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <DashboardCard
            icon={<Groups style={{ fontSize: 50, color: "#FFC55A" }} />}
            title={data?.jumlah_materi}
            subtitle={"Jumlah Materi"}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <DashboardCard
            icon={<Book style={{ fontSize: 50, color: "#EE4E4E" }} />}
            title={data?.jumlah_tugas}
            subtitle={"Jumlah Tugas"}
          />
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};
