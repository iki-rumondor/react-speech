import {
  ClassRounded,
  Dashboard,
  Logout,
  VerifiedUser,
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
      name: "Logout",
      to: "/logout",
      icon: <Logout />,
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
    </>
  );
};
