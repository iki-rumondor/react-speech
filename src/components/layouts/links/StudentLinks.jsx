import {
  ClassRounded,
  Dashboard,
  Logout,
  Notes,
  NotificationAdd,
  NotificationsRounded,
  RequestPage,
  VerifiedUser,
} from "@mui/icons-material";
import {
  Badge,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { ListItemsDropdown } from "../items/ListItems";
import { useEffect, useState } from "react";
import { useLoading } from "../../../context/LoadingContext";
import toast from "react-hot-toast";
import { fetchAPI } from "../../../utils/Fetching";

export const StudentLinks = () => {
  const [data, setData] = useState(null);
  const { setIsLoading } = useLoading();

  const handleLoad = async () => {
    try {
      setIsLoading(true);
      const res = await fetchAPI(`/informations/students`);
      setData(res.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleLoad();
  }, []);
  const { pathname } = useLocation();
  const links = [
    { name: "Dashboard", to: "/student/dashboard", icon: <Dashboard /> },
    {
      name: "Notifikasi",
      to: "/student/notifications",
      icon: (
        <Badge badgeContent={data?.unread_notification} color="primary">
          <NotificationsRounded color="action" />
        </Badge>
      ),
    },
    {
      name: "Daftar Kelas",
      to: "/classes",
      icon: <RequestPage />,
    },
    // {
    //   name: "Pengajuan Kelas",
    //   to: "/student/request-classes",
    //   icon: <ClassRounded />,
    // },
    {
      name: "Materi",
      to: "/student/materials",
      icon: <ClassRounded />,
    },
    {
      name: "Tugas",
      to: "/student/assignments",
      icon: <ClassRounded />,
    },
    // {
    //   name: "Video",
    //   to: "/student/videos",
    //   icon: <ClassRounded />,
    // },
    // {
    //   name: "Buku",
    //   to: "/student/books",
    //   icon: <ClassRounded />,
    // },
    // {
    //   name: "Catatan",
    //   to: "/student/notes",
    //   icon: <Notes />,
    // },
  ];

  const dropLinks = [
    {
      name: "Kelas Saya",
      icon: <ClassRounded />,
      items: [
        {
          name: "Pengajuan Kelas",
          to: "/student/request-classes",
        },
      ],
    },
  ];

  return (
    <>
      {links.map((item, idx) => (
        <ListItemButton
          selected={pathname == item.to ? true : false}
          key={idx}
          href={item.to}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.name} />
        </ListItemButton>
      ))}
      {/* {dropLinks.map((item, idx) => (
        <ListItemsDropdown key={idx} icon={item.icon} name={item.name} items={item.items} />
      ))} */}
      <ListItemButton href={"/logout"}>
        <ListItemIcon>
          <Logout />
        </ListItemIcon>
        <ListItemText primary={"Logout"} />
      </ListItemButton>
    </>
  );
};
