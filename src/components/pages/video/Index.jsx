import { Grid, Typography } from "@mui/material";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";

export const VideoPages = () => {
  const { uuid } = useParams();

  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "80vh", width: "100%" }}
      >
        <Grid item xs={12}>
          <Typography variant="h4" align="center" gutterBottom>
            {uuid}
          </Typography>
          <ReactPlayer
            url={"https://www.youtube.com/watch?v=iu-LBY7NXD4&t=349s"}
            controls
            width="100%"
            height="80vh"
          />
        </Grid>
      </Grid>
    </>
  );
};
