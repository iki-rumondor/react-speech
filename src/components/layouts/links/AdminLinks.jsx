import { Dashboard, Logout, VerifiedUser } from "@mui/icons-material";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useLocation } from "react-router-dom";

export const AdminLinks = () => {
  const { pathname } = useLocation();
  const links = [
    { name: "Dashboard", to: "/admin/dashboard", icon: <Dashboard /> },
    {
      name: "Program Studi",
      to: "/admin/master/prodi",
      icon: <VerifiedUser />,
    },
    {
      name: "Verifikasi Dosen",
      to: "/admin/verify-teachers",
      icon: <VerifiedUser />,
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
