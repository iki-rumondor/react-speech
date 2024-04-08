import {
  ExpandLess,
  ExpandMore,
  Inbox,
  RoundedCorner,
  StarBorder,
} from "@mui/icons-material";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export const ListItemsDropdown = ({ name, icon, items }) => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {items.map((item, idx) => (
            <ListItemButton
              key={idx}
              selected={pathname == item.to ? true : false}
              href={item.to}
              sx={{ pl: 6 }}
            >
              <ListItemText primary={item.name} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </>
  );
};
