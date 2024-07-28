import { Box, TextField, Typography } from "@mui/material";
import { SelectInput } from "../input/SelectInput";
import { fetchAPI, postAPI } from "../../../utils/Fetching";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLoading } from "../../../context/LoadingContext";
import FullScreenDialog from "../dialog/FullScreenDialog";

export const UpdateTeacherForm = ({ selectRow, open, setOpen }) => {
  const { setIsLoading, setIsSuccess } = useLoading();
  const [departments, setDepartments] = useState(null);
  const [values, setValues] = useState({
    name: "",
    nidn: "",
    department_uuid: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleLoadEdit = async () => {
    try {
      setIsLoading(true);
      const res = await fetchAPI(`/teachers/${selectRow}`);
      const res2 = await fetchAPI(`/department`);
      const department = res2.data.map((item) => {
        return {
          value: item.uuid,
          name: item.name,
        };
      });
      setValues(res.data);
      setDepartments(department);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setIsSuccess(false);
      const res = await postAPI(`/teachers/${selectRow}`, "PUT", values);
      setIsSuccess(true);
      toast.success(res.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
      setOpen(false)
    }
  };

  useEffect(() => {
    if (selectRow) {
      handleLoadEdit();
    }
  }, [open]);

  return (
    <FullScreenDialog
      handleSubmit={handleSubmit}
      handleClose={() => {
        setOpen(false);
      }}
      open={open}
    >
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1 },
        }}
      >
        <Typography
          component={"h2"}
          variant="h5"
          marginBottom={2}
          marginLeft={1}
        >
          Update Data Dosen
        </Typography>
        <TextField
          fullWidth
          required
          value={values?.name}
          name="name"
          label="Nama Dosen"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          required
          value={values?.nidn}
          name="nidn"
          label="NIDN"
          onChange={handleChange}
        />
        <SelectInput
          id={"department_uuid"}
          sx={{ marginX: "7px", marginTop: "2px" }}
          handleChange={handleChange}
          items={departments}
          label={"Pilih Program Studi"}
          value={values?.department_uuid}
        />
      </Box>
    </FullScreenDialog>
  );
};
