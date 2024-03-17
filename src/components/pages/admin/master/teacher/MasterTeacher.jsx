import React, { useState } from "react";
import { DashboardLayout } from "../../../../layouts/DashboardLayout";
import { Box, Container, Fab, Typography } from "@mui/material";
import { Add, AddIcCallOutlined } from "@mui/icons-material";
import TeacherTable from "../../../../layouts/tables/TeacherTable";
import FullScreenDialog from "../../../../layouts/dialog/FullScreenDialog";
import { AddTeacherForm } from "../../../../layouts/forms/AddClassForm";

const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
};

export const MasterTeacher = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <DashboardLayout name={"Manajemen Dosen"}>
        <Fab
          sx={fabStyle}
          color="primary"
          aria-label="add"
          onClick={handleOpen}
        >
          <Add />
        </Fab>
        <Container>
          <Box>
            <TeacherTable />
          </Box>
        </Container>
        <FullScreenDialog handleClose={handleClose} open={open}>
          <AddTeacherForm />
        </FullScreenDialog>
      </DashboardLayout>
    </>
  );
};
