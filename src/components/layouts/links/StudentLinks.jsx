import {
  ClassRounded,
  Dashboard,
  Logout,
  VerifiedUser,
} from "@mui/icons-material";
import { Divider, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useLocation } from "react-router-dom";
import { ListItemsDropdown } from "../items/ListItems";

export const StudentLinks = () => {
  const { pathname } = useLocation();
  const links = [
    { name: "Dashboard", to: "/student/dashboard", icon: <Dashboard /> },
    {
      name: "Pengajuan Kelas",
      to: "/student/request-classes",
      icon: <ClassRounded />,
    },
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
      {dropLinks.map((item, idx) => (
        <ListItemsDropdown key={idx} icon={item.icon} name={item.name} items={item.items} />
      ))}
      <ListItemButton href={"/logout"}>
        <ListItemIcon>
          <Logout />
        </ListItemIcon>
        <ListItemText primary={"Logout"} />
      </ListItemButton>
    </>
  );
};
