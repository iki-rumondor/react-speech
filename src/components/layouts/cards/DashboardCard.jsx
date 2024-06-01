import { ShoppingBag } from "@mui/icons-material";
import { Box, Card, CardHeader, Typography } from "@mui/material";
import React from "react";

export const DashboardCard = ({ title, subtitle, icon }) => {
  return (
    <Card>
      <CardHeader
        title={
          <Typography variant="h4" component="div" align="center" fontWeight={500}>
            {title}
          </Typography>
        }
        subheader={
          <Typography variant="body2" color="textSecondary" align="center">
            {subtitle}
          </Typography>
        }
        avatar={icon}
      />
    </Card>
  );
};
