import React, { useEffect, useState } from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import { Card, CardContent, CardMedia, Paper, Typography } from "@mui/material";
import { SelectInput } from "../../layouts/input/SelectInput";
import { useLoading } from "../../../context/LoadingContext";
import toast from "react-hot-toast";
import { fetchAPI } from "../../../utils/Fetching";
import { useUtils } from "../../../context/UtilsContext";

export const DetailStudentClass = ({ title, children }) => {
  const { isSuccess, setIsLoading } = useLoading();
  const { classSelected, setClassSelected } = useUtils();
  const [classes, setClasses] = useState([]);
  const [detailClass, setDetailClass] = useState(null);
  const userUuid = sessionStorage.getItem("uuid")

  const handleLoad = async () => {
    try {
      setIsLoading(true);
      const res = await fetchAPI(`/classes/students/${userUuid}`);
      const items = [];
      res.data &&
        res.data.map((item) => {
          items.push({
            name: item.name,
            value: item.uuid,
          });
        });
      setClasses(items);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadDetail = async () => {
    try {
      setIsLoading(true);
      const res = await fetchAPI(`/classes/${classSelected}`);
      setDetailClass(res.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleLoad();
  }, [isSuccess]);

  useEffect(() => {
    if (classSelected) {
      handleLoadDetail();
    }
  }, [classSelected]);

  return (
    <>
      <DashboardLayout name={title}>
        <Paper sx={{ p: 3 }}>
          <SelectInput
            value={classSelected}
            handleChange={(e) => {
              setClassSelected(e.target.value);
            }}
            size={"small"}
            label={"Pilih Kelas"}
            items={classes}
          />
        </Paper>

        {detailClass && (
          <Card sx={{ marginTop: 4 }}>
            <CardMedia sx={{ height: 200 }} image="/src/assets/img/bg-class.jpg" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {detailClass.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {detailClass.code}
              </Typography>
            </CardContent>
          </Card>
        )}

        {children}
      </DashboardLayout>
    </>
  );
};
