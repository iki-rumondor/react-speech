import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Box, Container, Paper } from "@mui/material";
import TeacherTable from "../../../layouts/tables/TeacherTable";
import { useLoading } from "../../../../context/LoadingContext";
import { fetchAPI, postAPI } from "../../../../utils/Fetching";
import { DashboardLayout } from "../../../layouts/DashboardLayout";
import { SelectInput } from "../../../layouts/input/SelectInput";
import { filterTeachers } from "../../../../utils/Helpers";

export const VerifyTeachers = () => {
  const { isSuccess, setIsLoading } = useLoading();
  const [data, setData] = useState(null);
  const [values, setValues] = useState(null);
  const [selected, setSelected] = useState("all");
  const items = [
    { name: "Semua Dosen", value: "all" },
    { name: "Dosen Terverifikasi", value: "verified" },
    { name: "Dosen Belum Terverifikasi", value: "unverified" },
  ];

  const handleChange = (e) => {
    setSelected(e.target.value);
  };


  const handleLoad = async () => {
    try {
      setIsLoading(true);
      const res = await fetchAPI(`/teachers`);
      setData(res.data);
      setValues(res.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilter = () => {
    setValues(filterTeachers(selected, data));
  };

  useEffect(() => {
    handleLoad();
  }, [isSuccess]);

  useEffect(() => {
    handleFilter();
  }, [selected]);

  return (
    <>
      <DashboardLayout name={"Verifikasi Pendaftaran Dosen"}>
        <Container>
          <Box>
            <Paper sx={{ marginBottom: 2, p: 3 }}>
              <SelectInput
                value={selected}
                handleChange={handleChange}
                size={"small"}
                label={"Filter"}
                items={items}
              />
            </Paper>
            {values && <TeacherTable data={values} />}
          </Box>
        </Container>
      </DashboardLayout>
    </>
  );
};
