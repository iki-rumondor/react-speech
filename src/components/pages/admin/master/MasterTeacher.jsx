import React, { useState } from "react";
import { DashboardLayout } from "../../../layouts/DashboardLayout";
import { Box, Container, Fab } from "@mui/material";
import { Add } from "@mui/icons-material";
import FullScreenDialog from "../../../layouts/dialog/FullScreenDialog";
import { useLoading } from "../../../../context/LoadingContext";

const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
};

export const MasterTeacher = () => {
  const { isSuccess, setIsLoading, setIsSuccess } = useLoading();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const defaultValue = {
    name: "",
  };

  const [values, setValues] = useState(defaultValue);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <DashboardLayout name={"Manajemen Dosen Pengajar"}>
      <Fab sx={fabStyle} color="primary" aria-label="add" onClick={handleOpen}>
        <Add />
      </Fab>
      <Container>
        <Box>{/* {data && <DepartmentTable data={data} />} */}</Box>
      </Container>
      <FullScreenDialog
        // handleSubmit={handleSubmit}
        handleClose={handleClose}
        open={open}
      >
        {/* <AddDepartmentForm
          title={"Tambah Data Dosen Pengajar"}
          values={values}
          onChange={handleChange}
        /> */}
      </FullScreenDialog>
    </DashboardLayout>
  );
};
