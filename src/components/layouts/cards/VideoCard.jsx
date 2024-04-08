import { PlayCircle } from "@mui/icons-material";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export const VideoCard = ({ video }) => {
  const playIconStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "white",
    transition: "opacity 0.3s",
  };

  return (
    <>
      <Card>
        <CardActionArea
          component={Link}
          to={`videos/${video.uuid}`}
          target="__blank"
        >
          <CardMedia
            sx={{ height: 140 }}
            image={"/src/assets/img/bg-video.jpg"}
            title={video?.title}
          />
          <PlayCircle style={playIconStyle} fontSize="large" />
        </CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {video?.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {video?.description}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};
