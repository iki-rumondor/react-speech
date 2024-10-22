import React, { useEffect, useState } from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import {
  Avatar,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { fetchAPI, postAPI } from "../../../utils/Fetching";
import { useLoading } from "../../../context/LoadingContext";
import toast from "react-hot-toast";
import { NotificationsRounded } from "@mui/icons-material";
import moment from "moment";

export const AdminNotification = () => {
  const [notifications, setNotifications] = useState(null);
  const { setIsLoading } = useLoading();

  const handleLoad = async () => {
    try {
      setIsLoading(true);
      const res = await fetchAPI(`/admin/notifications`);
      setNotifications(res.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <DashboardLayout name={"Notifikasi"}>
      {notifications && (
        <List sx={{ width: "100%" }}>
          {notifications.map((item, index, row) => (
            <div key={index}>
              <ListItem
                alignItems="flex-start"
                sx={
                  item.is_read
                    ? { backgroundColor: "whitesmoke" }
                    : { backgroundColor: "white" }
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <IconButton href={item.link}>
                      <NotificationsRounded />
                    </IconButton>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={item.title}
                  secondary={
                    <>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {moment.unix(item.created_at / 1000).fromNow()}
                      </Typography>
                      {` — ${item.body}`}
                    </>
                  }
                />
              </ListItem>
              {index + 1 != row.length && <Divider component="li" />}
            </div>
          ))}
        </List>
      )}
    </DashboardLayout>
  );
};
