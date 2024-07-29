import React, { useEffect, useRef, useState } from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Fab,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Add, MoreVert, PlayCircle } from "@mui/icons-material";
import FullScreenDialog from "../../layouts/dialog/FullScreenDialog";
import { useLoading } from "../../../context/LoadingContext";
import { AddMaterialForm } from "../../layouts/forms/AddMaterialForm";
import moment from "moment";
import { useUtils } from "../../../context/UtilsContext";
import { deleteAPI, fetchAPI, postAPI } from "../../../utils/Fetching";
import toast from "react-hot-toast";
import { getBackendUrl } from "../../../utils/Helpers";
import { CommonDelete } from "../../layouts/dialog/CommonDelete";
import { DetailStudentClass } from "./DetailStudentClass";
import { useLocation, useParams } from "react-router-dom";

export const StudentMaterials = () => {
  const { setIsLoading, isSuccess } = useLoading();
  const { classParam } = useParams();
  const { setClassSelected, classSelected } = useUtils();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const classUuid = queryParams.get("class_uuid");
  const [materials, setMaterials] = useState(null);
  const backendUrl = getBackendUrl();

  const handleLoad = async () => {
    try {
      setIsLoading(true);
      const res = await fetchAPI(`/materials/classes/${classSelected}`);
      setMaterials(res.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setClassSelected(classUuid);
    classSelected && handleLoad();
  }, [isSuccess, classSelected]);

  return (
    <DetailStudentClass title={"Materi Pembelajaran"}>
      <Divider sx={{ marginY: 2 }} />
      {materials &&
        materials.map((item) => (
          <Card key={item.uuid} variant="outlined" sx={{ marginY: 2 }}>
            <CardHeader
              avatar={<Avatar />}
              title={item.class?.teacher}
              subheader={moment.unix(item.created_at / 1000).fromNow()}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.title}
              </Typography>
              <Typography component={"div"}>{item.description}</Typography>

              <Divider sx={{ marginTop: 2 }} />
            </CardContent>
            <CardActions>
              <Button
                size="small"
                component={"a"}
                href={`${backendUrl}/file/books/${item?.book_name}`}
                target="__blank"
              >
                Baca Buku
              </Button>
              <Button
                size="small"
                component={"a"}
                href={`/videos/materials/${item?.uuid}`}
                target="__blank"
              >
                Lihat Video
              </Button>
            </CardActions>
          </Card>
        ))}
    </DetailStudentClass>
  );
};
