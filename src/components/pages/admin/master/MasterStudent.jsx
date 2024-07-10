import React from "react";
import { DashboardLayout } from "../../../layouts/DashboardLayout";
import { Container, Fab } from "@mui/material";
import { Add } from "@mui/icons-material";
import FullScreenDialog from "../../../layouts/dialog/FullScreenDialog";

export const MasterStudent = () => {
  return (
    <DashboardLayout name={"Manajemen Program Studi"}>
      <Fab sx={fabStyle} color="primary" aria-label="add" onClick={handleOpen}>
        <Add />
      </Fab>
      <Container>
        <Box>{data && <DepartmentTable data={data} />}</Box>
      </Container>
      <FullScreenDialog
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        open={open}
      >
        <AddDepartmentForm
          title={"Tambah Data Program Studi"}
          values={values}
          onChange={handleChange}
        />
      </FullScreenDialog>
    </DashboardLayout>
  );
};
