import {
  BookOnlineOutlined,
  ClassRounded,
  Dashboard,
  Logout,
  Notes,
} from "@mui/icons-material";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useLocation } from "react-router-dom";

export const TeacherLinks = () => {
  const { pathname } = useLocation();
  const links = [
    { name: "Dashboard", to: "/teacher/dashboard", icon: <Dashboard /> },
    {
      name: "Kelas",
      to: "/teacher/class",
      icon: <ClassRounded />,
    },
    {
      name: "Pengajuan Kelas",
      to: "/teacher/class/request",
      icon: <ClassRounded />,
    },
    {
      name: "Video Pembelajaran",
      to: "/teacher/class/videos",
      icon: <ClassRounded />,
    },
    {
      name: "Buku",
      to: "/teacher/class/books",
      icon: <BookOnlineOutlined />,
    },
    {
      name: "Catatan",
      to: "/teacher/class/notes",
      icon: <Notes />,
    },
  ];

  const dropLinks = [
    {
      name: "Kelas Saya",
      icon: <ClassRounded />,
      items: [
        {
          name: "Detail Kelas",
          to: "/teacher/class/detail",
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
        <ListItemsDropdown
          key={idx}
          icon={item.icon}
          name={item.name}
          items={item.items}
        />
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
