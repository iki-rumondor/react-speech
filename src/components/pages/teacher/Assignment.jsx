import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { CheckCircle, FileOpen, MoreVert } from "@mui/icons-material";
import { useLoading } from "../../../context/LoadingContext";
import { DetailTeacherClass } from "./DetailClass";
import moment from "moment";
import { useUtils } from "../../../context/UtilsContext";
import { deleteAPI, fetchAPI, postAPI } from "../../../utils/Fetching";
import toast from "react-hot-toast";
import { CommonDelete } from "../../layouts/dialog/CommonDelete";
import { AddAssignmentForm } from "../../layouts/forms/AddAssignmentForm";
import { UpdateAssignmentForm } from "../../layouts/forms/UpdateAssignmentForm";
import dayjs from "dayjs";
import { getBackendUrl } from "../../../utils/Helpers";

export const AssignmentTeacher = () => {
  const { setIsLoading, setIsSuccess, isSuccess } = useLoading();
  const { classSelected } = useUtils();
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [answer, setAnswer] = useState(null);
  const [grade, setGrade] = useState("");

  // const dummy = [{ title: "sd", description: "Desc" }];
  const [materials, setMaterials] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClickAction = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const [selectID, setSelectID] = useState(null);

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLoad = async () => {
    try {
      setIsLoading(true);
      const res = await fetchAPI(`/assignments/classes/${classSelected}`);
      console.log(res.data);

      setMaterials(res.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setOpenDelete(false);
      setIsLoading(true);
      setIsSuccess(false);
      const res = await deleteAPI(`/assignments/${selectID}`);
      setIsSuccess(true);
      toast.success(res.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGrading = async () => {
    try {
      setOpenConfirm(false);
      setIsLoading(true);
      setIsSuccess(false);
      const data = {
        grade: parseInt(grade),
      };
      console.log(data);
      const res = await postAPI(
        `/answers/${answer.uuid}/grading`,
        "PATCH",
        data
      );
      setIsSuccess(true);
      toast.success(res.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    classSelected && handleLoad();
  }, [isSuccess, classSelected]);

  return (
    <DetailTeacherClass title={"Materi Pembelajaran"}>
      <Divider sx={{ marginY: 2 }} />
      {materials &&
        materials.map((item) => (
          <Card key={item.uuid} variant="outlined" sx={{ marginY: 2 }}>
            <CardHeader
              avatar={<Avatar />}
              title={item.class?.teacher}
              subheader={moment.unix(item.created_at / 1000).fromNow()}
              action={
                <>
                  <IconButton
                    onClick={(e) => {
                      handleClickAction(e);
                      setSelectID(item.uuid);
                    }}
                  >
                    <MoreVert />
                  </IconButton>
                </>
              }
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.title}
              </Typography>
              <Typography component={"div"}>{item.description}</Typography>
              <Typography color={"gray"} marginTop={3}>
                Deadline : {dayjs(Number(item.deadline)).format("DD-MM-YYYY")}
              </Typography>
              <Divider sx={{ marginTop: 2 }} />
            </CardContent>
            <CardActions>
              {/* <Box width={"100%"}>
                <List>
                  <ListItem
                    secondaryAction={
                      <>
                        <IconButton edge="end" aria-label="delete">
                          <FileOpen color="warning" />
                        </IconButton>
                        <IconButton edge="end" aria-label="delete">
                          <CheckCircle color="success" />
                        </IconButton>
                      </>
                    }
                  >
                    <ListItemText
                      primary="Single-line item"
                      secondary={"Belum Diberi Nilai"}
                    />
                  </ListItem>
                </List>
              </Box> */}
              {item.answers && (
                <Table>
                  <TableBody>
                    {item.answers.map((i) => (
                      <TableRow key={i.uuid}>
                        <TableCell>{i.student.name}</TableCell>
                        <TableCell>{i.student.nim}</TableCell>
                        <TableCell>
                          {i.ontime ? "Tepat Waktu" : "Terlambat"}
                        </TableCell>
                        <TableCell>{i.grade}</TableCell>
                        <TableCell>
                          {!i.grade && (
                            <Button
                              onClick={() => {
                                setOpenConfirm(true);
                                setAnswer(i);
                              }}
                              size="small"
                              variant="contained"
                            >
                              Periksa
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardActions>
          </Card>
        ))}

      <AddAssignmentForm />
      <UpdateAssignmentForm
        selectRow={selectID}
        open={openEdit}
        setOpen={setOpenEdit}
      />

      <CommonDelete
        open={openDelete}
        handleClose={() => {
          handleCloseMenu();
          setOpenDelete(false);
        }}
        handleSubmit={handleDelete}
      />

      <Menu anchorEl={anchorEl} open={openMenu} onClose={handleCloseMenu}>
        <MenuItem
          onClick={() => {
            setOpenEdit(true);
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleCloseMenu();
            setOpenDelete(true);
          }}
        >
          Hapus
        </MenuItem>
      </Menu>

      <Dialog
        maxWidth={"lg"}
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
      >
        <DialogTitle>Periksa Jawaban Mahasiswa</DialogTitle>
        <DialogContent>
          <Button
            href={`${getBackendUrl()}/file/answers/${answer?.filename}`}
            target="_blank"
            sx={{ marginBottom: 2 }}
            size="small"
            variant="contained"
          >
            Lihat Jawaban
          </Button>
          <TextField
            fullWidth
            required
            type="number"
            label="Nilai"
            variant="standard"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>Kembali</Button>
          <Button onClick={handleGrading} autoFocus>
            Simpan
          </Button>
        </DialogActions>
      </Dialog>
    </DetailTeacherClass>
  );
};
