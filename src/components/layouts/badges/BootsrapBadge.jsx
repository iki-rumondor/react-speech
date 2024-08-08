import { Box, styled } from "@mui/material";
import React from "react";

const Badge = styled(Box)(({ theme }) => ({
  display: "inline-block",
  padding: "0.25em 0.4em",
  fontSize: "75%",
  fontWeight: 700,
  lineHeight: 1,
  textAlign: "center",
  whiteSpace: "nowrap",
  verticalAlign: "baseline",
  borderRadius: "0.375rem",
  color: "#fff",
  backgroundColor: theme.palette.primary.main,
}));

export const BootsrapBadge = ({ children, color, sx }) => {
  return <Badge sx={{ ...sx, backgroundColor: color || "primary" }}>{children}</Badge>;
};
