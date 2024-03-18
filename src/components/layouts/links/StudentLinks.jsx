import {
  ClassRounded,
  Dashboard,
  Logout,
  VerifiedUser,
} from "@mui/icons-material";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useLocation } from "react-router-dom";

export const StudentLinks = () => {
  const { pathname } = useLocation();
  const links = [
    { name: "Dashboard", to: "/student/dashboard", icon: <Dashboard /> },
    {
      name: "Pengajuan Kelas",
      to: "/student/request-classes",
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
