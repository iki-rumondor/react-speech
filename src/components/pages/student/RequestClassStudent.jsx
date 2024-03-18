import React, { useEffect, useState } from "react";
import { useLoading } from "../../../context/LoadingContext";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import { Box, Container, Paper } from "@mui/material";
import TeacherTable from "../../layouts/tables/TeacherTable";
import toast from "react-hot-toast";
import { fetchAPI } from "../../../utils/Fetching";
import { filterTeachers } from "../../../utils/Helpers";
import { SelectInput } from "../../layouts/input/SelectInput";
import RequestClassTable from "../../layouts/tables/RequestClassTable";

export const RequestClassStudent = () => {
  const { isSuccess, setIsLoading } = useLoading();
  const [data, setData] = useState(null);
  const [values, setValues] = useState(null);
  const [selected, setSelected] = useState("all");
  const items = [
    { name: "Semua Pengajuan", value: "all" },
    { name: "Pengajuan Diterima", value: "verified" },
    { name: "Pengajuan Diproses", value: "unverified" },
  ];

  const handleChange = (e) => {
    setSelected(e.target.value);
  };

  const handleLoad = async () => {
    try {
      setIsLoading(true);
      const res = await fetchAPI(`/class/request/students`);
      setData(res.data);
      console.log(res.data);
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
      <DashboardLayout name={"Pengajuan Kelas Mahasiswa"}>
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
            {values && <RequestClassTable data={values} />}
          </Box>
        </Container>
      </DashboardLayout>
    </>
  );
};
