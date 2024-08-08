import React, { useEffect, useState } from "react";
import { DashboardLayout } from "../../../layouts/DashboardLayout";
import { Box, Container, Paper, selectClasses } from "@mui/material";
import { useLoading } from "../../../../context/LoadingContext";
import { SelectInput } from "../../../layouts/input/SelectInput";
import { fetchAPI } from "../../../../utils/Fetching";
import toast from "react-hot-toast";
import StudentClassTable from "../../../layouts/tables/StudentClassTable";
import moment from "moment";
import AssignmentStudentsTable from "../../../layouts/tables/AssignmentStudentsTable";

export const StudentClassReport = () => {
  const { isSuccess, setIsLoading } = useLoading();
  
  const [classes, setClasses] = useState(null);
  const [students, setStudents] = useState(null);
  const [selected, setSelected] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [content, setContent] = useState("");
  const items = [
    { name: "Laporan Mahasiswa Per Kelas", value: "class_student" },
    { name: "Laporan Tugas Mahasiswa", value: "assignment_student" },
  ];

  const handleLoad = async () => {
    try {
      setIsLoading(true);
      const res = await fetchAPI(`/classes/all`);
      const res2 = await fetchAPI(`/students`);
      
      if (!res.data) {
        return;
      }
      const classesValue = res.data.map((item) => {
        return {
          name: `${item.name} - ${item.teacher}`,
          value: item.uuid,
        };
      });

      if (!res2.data) {
        return;
      }
      const studentsValue = res2.data.map((item) => {
        return {
          name: item.name,
          value: item.uuid,
        };
      });
      
      setClasses(classesValue);
      setStudents(studentsValue);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  

  useEffect(() => {
    switch (selected) {
      case "class_student":
        setContent(
          <StudentClassTable selectedClass={selectedClass} />
        );
        break;
      case "assignment_student":
        setContent(
          <AssignmentStudentsTable selectedStudent={selectedStudent} />
        );
        break;
    }
  }, [selected, selectedClass, selectedStudent]);

  useEffect(() => {
    handleLoad();
  }, [isSuccess]);


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

            {students && selected == "assignment_student" && (
              <SelectInput
                value={selectedStudent}
                handleChange={(e) => {
                  setSelectedStudent(e.target.value);
                }}
                size={"small"}
                label={"Pilih Mahasiswa"}
                items={students}
              />
            )}
          </Paper>

          {content}
        </Box>
      </Container>
    </DashboardLayout>
  );
};
