import React, { useEffect, useState } from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import { Grid } from "@mui/material";
import {
  Book,
  Groups,
  LibraryBooks,
  People,
  School,
  ShoppingBag,
  VideoCameraBack,
} from "@mui/icons-material";
import { DashboardCard } from "../../layouts/cards/DashboardCard";
import { fetchAPI } from "../../../utils/Fetching";
import toast from "react-hot-toast";
import { useLoading } from "../../../context/LoadingContext";

export const TeacherDashboard = () => {
  const { setIsLoading } = useLoading();
  const [data, setData] = useState();

  const handleLoad = async () => {
    try {
      setIsLoading(true);
      const res = await fetchAPI(`/dashboards/teacher`);
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
    <DashboardLayout name={"Selamat Datang Pengajar"}>
      <Grid container spacing={2}>
        <Grid item md={4} xs={12}>
          <DashboardCard
            icon={<School style={{ fontSize: 50, color: "#2C4E80" }} />}
            title={data?.jumlah_mahasiswa}
            subtitle={"Jumlah Mahasiswa"}
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <DashboardCard
            icon={<Groups style={{ fontSize: 50, color: "#FFC55A" }} />}
            title={data?.jumlah_kelas}
            subtitle={"Jumlah Kelas"}
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <DashboardCard
            icon={<Book style={{ fontSize: 50, color: "#EE4E4E" }} />}
            title={data?.jumlah_materi}
            subtitle={"Jumlah Materi"}
          />
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};
