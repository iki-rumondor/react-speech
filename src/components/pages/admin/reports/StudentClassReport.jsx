import React, { useEffect, useState } from "react";
import { DashboardLayout } from "../../../layouts/DashboardLayout";
import { Box, Container, Paper } from "@mui/material";
import { useLoading } from "../../../../context/LoadingContext";
import { SelectInput } from "../../../layouts/input/SelectInput";
import { fetchAPI } from "../../../../utils/Fetching";
import toast from "react-hot-toast";
import StudentClassTable from "../../../layouts/tables/StudentClassTable";
import moment from "moment";

export const StudentClassReport = () => {
  const { isSuccess, setIsLoading } = useLoading();
  const [data, setData] = useState(null);
  const [classes, setClasses] = useState(null);
  const [selected, setSelected] = useState("class_student");
  const [selectedClass, setSelectedClass] = useState("");
  const items = [
    { name: "Laporan Mahasiswa Per Kelas", value: "class_student" },
  ];

  const handleLoad = async () => {
    try {
      setIsLoading(true);
      const res = await fetchAPI(`/classes/all`);
      const classesValue = res.data.map((item) => {
        return {
          name: `${item.name} - ${item.teacher}`,
          value: item.uuid,
        };
      });
      setClasses(classesValue);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadClass = async () => {
    try {
      setIsLoading(true);
      const res = await fetchAPI(`/classes/${selectedClass}`);

      const students = res?.data?.students?.map((item) => {
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
    handleLoad();
  }, [isSuccess]);

  useEffect(() => {
    selectedClass && handleLoadClass();
  }, [selectedClass]);

  return (
    <DashboardLayout name={"Laporan"}>
      <Container>
        <Box>
          <Paper sx={{ marginBottom: 2, p: 3 }}>
            <SelectInput
              sx={{ marginBottom: 2 }}
              value={selected}
              handleChange={(e) => {
                setSelected(e.target.value);
              }}
              size={"small"}
              label={"Jenis Laporan"}
              items={items}
            />
            {classes && selected == "class_student" && (
              <SelectInput
                value={selectedClass}
                handleChange={(e) => {
                  setSelectedClass(e.target.value);
                }}
                size={"small"}
                label={"Pilih Kelas"}
                items={classes}
              />
            )}
          </Paper>

          {data && selectedClass && <StudentClassTable data={data} />}
        </Box>
      </Container>
    </DashboardLayout>
  );
};
