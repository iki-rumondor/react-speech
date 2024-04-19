import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useUtils } from "../../../context/UtilsContext";
import { useLoading } from "../../../context/LoadingContext";
import { fetchAPI } from "../../../utils/Fetching";
import moment from "moment";
import { DetailStudentClass } from "./DetailStudentClass";

export const StudentNotes = () => {
  const { classSelected } = useUtils();
  const { isSuccess, setIsLoading } = useLoading();
  const [notes, setNotes] = useState(null);
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

  useEffect(() => {
    if (classSelected) {
      handleLoad();
    }
  }, [classSelected, isSuccess]);

  return (
    <DetailStudentClass title={"Daftar Catatan Pembelajaran"}>
      {notes &&
        notes.map((item) => (
          <Card key={item.uuid} variant="outlined" sx={{ marginY: 2 }}>
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
    </DetailStudentClass>
  );
};
