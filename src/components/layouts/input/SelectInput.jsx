import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

export const SelectInput = ({
  size,
  id,
  value,
  handleChange,
  items,
  label,
  sx,
  valueName,
}) => {
  return (
    <FormControl sx={sx} fullWidth size={size}>
      <InputLabel id={id + "-label"}>{label}</InputLabel>
      <Select
        name={id}
        labelId={id + "-label"}
        id={id}
        value={value}
        label={label}
        onChange={handleChange}
      >
        {items.map((item, idx) => (
          <MenuItem key={idx} value={item.value}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
