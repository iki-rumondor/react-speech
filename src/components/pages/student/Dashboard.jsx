import React, { useEffect, useState } from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import { Grid } from "@mui/material";
import { Book, Close, Groups, LibraryBooks, NotAccessible, People, PersonOff, School, ShoppingBag, Verified, VideoCameraBack, X } from "@mui/icons-material";
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
    <DashboardLayout name={"Selamat Datang Mahasiswa"}>
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <DashboardCard
            icon={<Verified style={{ fontSize: 50, color: "#799351" }} />}
            title={data?.jumlah_kelas_verified}
            subtitle={"Jumlah Kelas Disetujui"}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <DashboardCard
            icon={<Close style={{ fontSize: 50, color: "#EE4E4E" }} />}
            title={data?.jumlah_kelas_not}
            subtitle={"Jumlah Kelas Belum Disetujui"}
          />
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};
