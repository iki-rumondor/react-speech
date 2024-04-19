import FullScreenDialog from "../../layouts/dialog/FullScreenDialog";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Fab,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";
import { DetailTeacherClass } from "./DetailClass";
import { useEffect, useState } from "react";
import { Add } from "@mui/icons-material";
import { useUtils } from "../../../context/UtilsContext";
import { useLoading } from "../../../context/LoadingContext";
import { fetchAPI, postAPI } from "../../../utils/Fetching";
import { AddNoteForm } from "../../layouts/forms/AddNoteForm";
import moment from "moment";

const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
};

export const ListNotes = () => {
  const { classSelected } = useUtils();
  const { isSuccess, setIsLoading, setIsSuccess } = useLoading();
  const defaultValue = {
    title: "",
    body: "",
  };

  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState(null);
  const [values, setValues] = useState(defaultValue);

  const handleOpen = () => {
    setValues({ ...values, class_uuid: classSelected });
    setOpen(!open);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleLoad = async () => {
    try {
      setIsLoading(true);
      const res = await fetchAPI(`/notes/classes/${classSelected}`);
      setNotes(res.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      handleOpen();
      setIsLoading(true);
      setIsSuccess(false);
      const res = await postAPI(`/notes`, "POST", values);
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
    if (classSelected) {
      handleLoad();
    }
  }, [classSelected, isSuccess]);

  return (
    <DetailTeacherClass title={"Daftar Catatan Pembelajaran"}>
      {classSelected && (
        <Fab
          sx={fabStyle}
          color="primary"
          aria-label="add"
          onClick={handleOpen}
        >
          <Add />
        </Fab>
      )}

      {notes &&
        notes.map((item) => (
          <Card variant="outlined" sx={{ marginY: 2 }}>
            <CardHeader
              avatar={<Avatar></Avatar>}
              title={item.title}
              subheader={moment.unix(item.created_at / 1000).fromNow()}
            />
            <CardContent>
              <Typography component={"div"}>
                {item.body.split("\n").map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </Typography>
            </CardContent>
          </Card>
        ))}
      <FullScreenDialog
        handleClose={handleOpen}
        open={open}
        handleSubmit={handleSubmit}
      >
        <AddNoteForm
          handleChange={handleChange}
          values={values}
          title={"Tambah Catatan Pembelajaran"}
        />
      </FullScreenDialog>
    </DetailTeacherClass>
  );
};
