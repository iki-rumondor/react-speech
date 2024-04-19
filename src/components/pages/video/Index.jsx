import { Grid, Typography, Card, CardContent } from "@mui/material";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLoading } from "../../../context/LoadingContext";
import { fetchAPI } from "../../../utils/Fetching";
import toast from "react-hot-toast";
import { getBackendUrl } from "../../../utils/Helpers";

export const VideoPages = () => {
  const { uuid } = useParams();
  const { isSuccess, setIsLoading } = useLoading();
  const [subtitle, setSubtitle] = useState("");
  const [data, setData] = useState(null);
  const backendUrl = getBackendUrl();
  const handleLoad = async () => {
    try {
      setIsLoading(true);
      const res = await fetchAPI(`/videos/${uuid}`);
      const res2 = await fetchAPI(`/file/subtitle/${res.data.subtitle_name}`);
      setData(res.data);
      setSubtitle(res2);
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
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "80vh", width: "100%" }}
      >
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h4" align="center">
                {data?.title}
              </Typography>
              <Typography align="center" gutterBottom>
                {data?.description}
              </Typography>
              <ReactPlayer
                url={`${backendUrl}/file/videos/${data?.video_name}`}
                config={{
                  file: {
                    tracks: [
                      {
                        kind: "subtitles",
                        src: `data:text/vtt;base64,${btoa(subtitle)}`,
                        srcLang: "en",
                        default: true,
                      },
                    ],
                  },
                }}
                controls
                width="100%"
                height="80vh"
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
