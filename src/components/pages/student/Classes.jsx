import { RecordVoiceOver } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { fetchAPI, postAPI } from "../../../utils/Fetching";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useLoading } from "../../../context/LoadingContext";
import { green, orange } from "@mui/material/colors";
import { DashboardLayout } from "../../layouts/DashboardLayout";

export const Classes = () => {
  const { setIsLoading, setIsSuccess, isSuccess } = useLoading();
  const [classes, setClasses] = useState(null);

  const handleLoad = async () => {
    try {
      setIsLoading(true);
      const res = await fetchAPI(`/classes/all`);
      console.log(res.data);
      
      setClasses(res.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (uuid) => {
    try {
      setIsLoading(true);
      setIsSuccess(false);
      const res = await postAPI("/classes/join", "POST", {
        class_uuid: uuid,
      });
      toast.success(res.message);
      setIsSuccess(true);
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
    <DashboardLayout name={"Daftar Kelas"}>
      <Grid container spacing={2}>
        {classes &&
          classes.map((item) => (
            <Grid key={item.class?.uuid} item xs={12} md={6}>
              <Card>
                <CardMedia
                  sx={{ height: 140 }}
                  image="https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  title="class"
                />
                <CardContent sx={{ marginY: 0, paddingY: 1 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {item?.name}
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <RecordVoiceOver />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={item?.teacher}
                        primaryTypographyProps={{ fontWeight: "bold" }}
                        secondary={item?.teacher_department}
                      />
                    </ListItem>
                  </List>
                </CardContent>
                <CardActions
                  sx={{
                    justifyContent: "end",
                    paddingX: 4,
                    paddingTop: 0,
                    paddingBottom: 2,
                  }}
                >
                  {item?.join ? (
                    <Button
                      href={`/student/materials?class_uuid=${item.uuid}`}
                      variant="contained"
                      size="small"
                    >
                      Lihat Materi
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        handleSubmit(item?.uuid);
                      }}
                      variant="contained"
                      size="small"
                      sx={{
                        bgcolor: green[600],
                        "&:hover": {
                          bgcolor: green[900],
                        },
                      }}
                    >
                      Masuk
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </DashboardLayout>
  );
};
