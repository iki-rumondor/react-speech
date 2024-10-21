import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { SelectInput } from "../../../../../layouts/input/SelectInput";
import { fetchAPI } from "../../../../../../utils/Fetching";
import toast from "react-hot-toast";

export default function CreateTeacherDialog({
  values,
  setValues,
  handleSubmit,
}) {
  const [open, setOpen] = useState(false);
  const [departments, setDepartments] = useState([]);
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleLoad = async () => {
    try {
      const res = await fetchAPI(`/department`);
      const departments =
        res.data &&
        res.data.map((item) => {
          return {
            name: item.name,
            value: item.uuid,
          };
        });
      setDepartments(departments);
    } catch (error) {
      toast.error(error.message);
    } finally {
    }
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="contained"
        sx={{ marginBottom: 1 }}
      >
        Tambah
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Tambah Dosen</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ marginBottom: 3 }}>
            Silahkan lengkapi data berikut
          </DialogContentText>
          <TextField
            fullWidth
            required
            value={values?.name}
            name="name"
            label="Nama Lengkap"
            sx={{ marginBottom: 2 }}
            onChange={onChange}
          />
          <TextField
            fullWidth
            required
            value={values?.nidn}
            name="nidn"
            label="NIDN"
            sx={{ marginBottom: 2 }}
            onChange={onChange}
          />
          <SelectInput
            label={"Pilih Program Studi"}
            id={"department_uuid"}
            items={departments}
            value={values?.department_uuid}
            handleChange={onChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Kembali</Button>
          <Button type="submit">Tambahkan</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
