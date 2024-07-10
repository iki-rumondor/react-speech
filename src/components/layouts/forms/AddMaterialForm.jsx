import { Box, Divider, TextField, Typography } from "@mui/material";
import UploadFileInput from "../input/UploadFileInput";
import { forwardRef, useImperativeHandle, useState } from "react";
import { convertToMB } from "../../../utils/Helpers";
import { useLoading } from "../../../context/LoadingContext";
import toast from "react-hot-toast";
import { postFile } from "../../../utils/Fetching";
import { useUtils } from "../../../context/UtilsContext";

export const AddMaterialForm = forwardRef((props, ref) => {
  const { setIsLoading, setIsSuccess } = useLoading();
  const { classSelected } = useUtils();

  const [values, setValues] = useState({
    title: "",
    description: "",
  });

  const [book, setBook] = useState(null);
  const [video, setVideo] = useState(null);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setIsSuccess(false);
      const formData = new FormData();
      formData.append("class_uuid", classSelected);
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("book", book);
      formData.append("video", video);
      const res = await postFile(`/materials`, "POST", formData);
      setIsSuccess(true);
      setValues({
        title: "",
        description: "",
      });
      setBook(null);
      setVideo(null);
      toast.success(res.message);
      props.handleClose();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useImperativeHandle(ref, () => ({
    handleSubmit,
  }));

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1 },
      }}
    >
      <Typography component={"h2"} variant="h5" marginBottom={2} marginLeft={1}>
        Tambah Materi Pembelajaran
      </Typography>
      <TextField
        fullWidth
        required
        value={values?.title}
        name="title"
        label="Judul Materi"
        onChange={handleChange}
      />
      <TextField
        fullWidth
        required
        multiline
        rows={4}
        value={values?.description}
        name="description"
        label="Tuliskan Deskripsi Materi"
        onChange={handleChange}
      />
      <Divider sx={{ marginY: 3 }} />
      <UploadFileInput
        name={"Tambahkan Buku"}
        caption={"*File harus dalam bentuk pdf"}
        handleChange={(e) => {
          if (e.target.files) {
            setBook(e.target.files[0]);
          }
        }}
      />
      {book && (
        <>
          <div style={{ marginTop: 10 }}>File Detail: </div>
          <ul>
            <li>Nama File: {book.name}</li>
            <li>Tipe: {book.type}</li>
            <li>Ukuran: {convertToMB(book.size)}</li>
          </ul>
        </>
      )}
      <Divider sx={{ marginY: 3 }} />
      <UploadFileInput
        name={"Tambahkan Video"}
        caption={"*File harus dalam bentuk mp4/webm"}
        handleChange={(e) => {
          if (e.target.files) {
            setVideo(e.target.files[0]);
          }
        }}
      />
      {video && (
        <>
          <div style={{ marginTop: 10 }}>File Detail: </div>
          <ul>
            <li>Nama File: {video.name}</li>
            <li>Tipe: {video.type}</li>
            <li>Ukuran: {convertToMB(video.size)}</li>
          </ul>
        </>
      )}
    </Box>
  );
});
