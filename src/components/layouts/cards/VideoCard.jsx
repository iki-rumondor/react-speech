import { MoreVert, PlayCircle } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";

export const VideoCard = ({ video, setAnchorEl, setSelectID }) => {
  const role = sessionStorage.getItem("role");
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
        {role == "DOSEN" && (
          <CardHeader
            avatar={<Avatar />}
            title={video.teacher}
            subheader={moment.unix(video.created_at / 1000).fromNow()}
            action={
              <>
                <IconButton
                  onClick={(e) => {
                    setAnchorEl(e.currentTarget);
                    setSelectID(video.uuid);
                  }}
                >
                  <MoreVert />
                </IconButton>
              </>
            }
          />
        )}
        <CardActionArea
          component={Link}
          to={`/videos/${video.uuid}`}
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
