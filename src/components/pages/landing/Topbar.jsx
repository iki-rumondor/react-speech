import { Adb } from "@mui/icons-material";
import {
  Avatar,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { orange } from "@mui/material/colors";
import React from "react";

export const TopbarLandingPage = () => {
  return (
    <>
      <div className="container p-3 d-flex justify-content-between align-items-center">
        <a class="navbar-brand" href="index.html">
          <img src="assets/img/logo.svg" height="31" alt="logo" />
        </a>

        <Button
          href="/home"
          variant="contained"
          sx={{
            bgcolor: orange[600],
            "&:hover": {
              bgcolor: orange[900],
            },
          }}
        >
          Dashboard
        </Button>
      </div>
    </>
  );
};
