import React, { useEffect, useState } from "react";
import { DashboardLayout } from "../../../../layouts/DashboardLayout";
import { Box, Container, Fab } from "@mui/material";
import { Add } from "@mui/icons-material";
import TeacherTable from "../../../../layouts/tables/TeacherTable";
import FullScreenDialog from "../../../../layouts/dialog/FullScreenDialog";
import { AddClassForm } from "../../../../layouts/forms/AddClassForm";
import ClassTable from "../../../../layouts/tables/ClassTable";
import { useLoading } from "../../../../../context/LoadingContext";
import { fetchAPI, postAPI } from "../../../../../utils/Fetching";
import toast from "react-hot-toast";

const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
};

export const MasterClass = () => {
  const { isSuccess, setIsLoading, setIsSuccess } = useLoading();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const uuid = sessionStorage.getItem("uuid");
  const defaultValue = {
    name: "",
    code: "",
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

  const handleLoad = async () => {
    try {
      setIsLoading(true);
      const res = await fetchAPI(`/classes`);
      setData(res.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    handleClose();
    try {
      setIsLoading(true);
      setIsSuccess(false);
      const res = await postAPI(`/classes`, "POST", values);
      setIsSuccess(true);
      setValues(defaultValue);
      toast.success(res.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleLoad();
  }, [isSuccess]);

  return (
    <>
      <DashboardLayout name={"Manajemen Kelas"}>
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
            <ClassTable data={data} />
          </Box>
        </Container>
        <FullScreenDialog
          handleSubmit={handleSubmit}
          handleClose={handleClose}
          open={open}
        >
          <AddClassForm values={values} onChange={handleChange} />
        </FullScreenDialog>
      </DashboardLayout>
    </>
  );
};
