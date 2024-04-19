import FullScreenDialog from "../../layouts/dialog/FullScreenDialog";
import {
  Card,
  CardContent,
  Divider,
  Fab,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";
import { DetailStudentClass } from "./DetailStudentClass";
import { VideoCard } from "../../layouts/cards/VideoCard";
import { useEffect, useState } from "react";
import { useUtils } from "../../../context/UtilsContext";
import { useLoading } from "../../../context/LoadingContext";
import { fetchAPI } from "../../../utils/Fetching";

export const StudentVideos = () => {
  const { classSelected } = useUtils();
  const { isSuccess, setIsLoading } = useLoading();

  const [videos, setVideos] = useState(null);
  const handleLoad = async () => {
    try {
      setIsLoading(true);
      const res = await fetchAPI(`/videos/classes/${classSelected}`);
      setVideos(res.data);
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
    <DetailStudentClass title={"List Video Pembelajaran"}>
      <Typography marginTop={4} variant="h5" gutterBottom>
        List Video
      </Typography>
      <Divider sx={{ marginY: 2 }} />

      <Grid container spacing={2} marginBottom={3}>
        {videos &&
          videos.map((video) => (
            <Grid key={video.uuid} item xs={12} md={6} lg={4}>
              <VideoCard video={video} />
            </Grid>
          ))}
      </Grid>
    </DetailStudentClass>
  );
};
