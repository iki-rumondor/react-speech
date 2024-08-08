import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";
import { useLoading } from "../../../context/LoadingContext";
import moment from "moment";
import { useUtils } from "../../../context/UtilsContext";
import { fetchAPI, getFile, postFile } from "../../../utils/Fetching";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { DetailStudentClass } from "./DetailStudentClass";
import { BootsrapBadge } from "../../layouts/badges/BootsrapBadge";
import UploadFileInput from "../../layouts/input/UploadFileInput";
import FullScreenDialog from "../../layouts/dialog/FullScreenDialog";
import { getBackendUrl } from "../../../utils/Helpers";

const convertToMB = (bytes) => {
  const size = (bytes / (1024 * 1024)).toFixed(2);
  return `${size} MB`;
};

export const AssignmentStudent = () => {
  const { setIsLoading, setIsSuccess, isSuccess } = useLoading();
  const { classSelected } = useUtils();

  const [assignments, setAssignments] = useState(null);

  const [assignmentID, setAssignmentID] = useState(null);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleLoad = async () => {
    try {
      setIsLoading(true);
      const res = await fetchAPI(
        `/assignments/students/classes/${classSelected}`
      );
      setAssignments(res.data);
      console.log(res.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      toast.error("Belum Terdapat File Jawaban");
      return;
    }

    const formData = new FormData();
    formData.append("answer", file);

    try {
      setIsLoading(true);
      setIsSuccess(false);
      const res = await postFile(
        `/answers/assignments/${assignmentID}`,
        "POST",
        formData
      );
      setIsSuccess(true);
      toast.success(res.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };

  const handleGetFile = async (filename) => {
    try {
      const resp = await getFile(`/file/answers/${filename}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    classSelected && handleLoad();
  }, [isSuccess, classSelected]);

  return (
    <DetailStudentClass title={"Tugas Pembelajaran"}>
      <Divider sx={{ marginY: 2 }} />
      {assignments &&
        assignments.map((item) => (
          <Card key={item.uuid} variant="outlined" sx={{ marginY: 2 }}>
            <CardHeader
              avatar={<Avatar />}
              title={item.class?.teacher}
              subheader={moment.unix(item.created_at / 1000).fromNow()}
              action={
                <BootsrapBadge
                  color={"#d32f2f"}
                  sx={{ marginTop: 1, marginRight: 2 }}
                >
                  {item.student_answer.submitted
                    ? item.student_answer.ontime
                      ? "Tepat Waktu"
                      : "Terlambat"
                    : "Belum Kirim"}
                </BootsrapBadge>
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
              {item.student_answer?.submitted ? (
                <>
                  <Button
                    href={`${getBackendUrl()}/file/answers/${
                      item.student_answer.filename
                    }`}
                    target="_blank"
                  >
                    Lihat Jawaban
                  </Button>
                  <Button
                    onClick={() => {
                      alert(`${item.student_answer.grade}/100`);
                    }}
                  >
                    Nilai
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => {
                    setAssignmentID(item.uuid);
                    setOpen(true);
                  }}
                >
                  Kirim Tugas
                </Button>
              )}
            </CardActions>
          </Card>
        ))}
      <FullScreenDialog
        open={open}
        handleClose={() => {
          setFile(null);
          setOpen(false);
        }}
        handleSubmit={handleSubmit}
        title={"Kirim Tugas"}
      >
        <Typography sx={{ marginBottom: 2 }}>
          Silahkan Upload Dalam Bentuk PDF
        </Typography>
        <UploadFileInput
          handleChange={handleFileChange}
          name={"Tambahkan File PDF"}
        />
        {file && (
          <>
            <div style={{ marginTop: 10 }}>File Detail: </div>
            <ul>
              <li>Nama File: {file.name}</li>
              <li>Tipe: {file.type}</li>
              <li>Ukuran: {convertToMB(file.size)}</li>
            </ul>
          </>
        )}
      </FullScreenDialog>
    </DetailStudentClass>
  );
};
