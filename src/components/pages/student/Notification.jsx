import React, { useEffect, useState } from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout";
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { fetchAPI } from "../../../utils/Fetching";
import { useLoading } from "../../../context/LoadingContext";
import toast from "react-hot-toast";
import { NotificationsRounded } from "@mui/icons-material";
import moment from "moment";

export const Notification = () => {
  const [notifications, setNotifications] = useState(null);
  const { setIsLoading } = useLoading();

  const handleLoad = async () => {
    try {
      setIsLoading(true);
      const res = await fetchAPI(`/notifications`);
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
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {notifications.map((item, index, row) => (
            <>
              <ListItem key={index} alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar>
                    <NotificationsRounded />
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
            </>
          ))}
        </List>
      )}
    </DashboardLayout>
  );
};
