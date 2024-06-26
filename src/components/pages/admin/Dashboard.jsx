import React, { useEffect, useState } from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import { Grid } from "@mui/material";
import { Groups, LibraryBooks, People, School, ShoppingBag } from "@mui/icons-material";
import { DashboardCard } from "../../layouts/cards/DashboardCard";
import { fetchAPI } from "../../../utils/Fetching";
import toast from "react-hot-toast";
import { useLoading } from "../../../context/LoadingContext";

export const AdminDashboard = () => {
  const { isSuccess, setIsLoading } = useLoading();
  const [data, setData] = useState();

  const handleLoad = async () => {
    try {
      setIsLoading(true);
      const res = await fetchAPI(`/dashboards/admin`);
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
    <DashboardLayout name={"Selamat Datang Administrator"}>
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <DashboardCard
            icon={<School style={{ fontSize: 50, color: "#2C4E80" }} />}
            title={data?.jumlah_prodi}
            subtitle={"Jumlah Program Studi"}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <DashboardCard
            icon={<Groups style={{ fontSize: 50, color: "#FFC55A" }} />}
            title={data?.jumlah_dosen}
            subtitle={"Jumlah Dosen"}
          />
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};
