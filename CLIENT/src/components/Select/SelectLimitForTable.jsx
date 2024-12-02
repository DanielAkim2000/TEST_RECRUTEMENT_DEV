import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectLimit,
  setLimit,
  setPage,
} from "../../redux/slices/searchData.slice";

const SelectLimitForTable = () => {
  const limit = useSelector(selectLimit);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(setLimit(e.target.value));
    dispatch(setPage(1));
  };
  return (
    <FormControl>
      <InputLabel id="select-label">Limit</InputLabel>
      <Select
        labelId="select-label"
        id="demo-simple-select"
        value={limit}
        label="Limit"
        onChange={handleChange}
      >
        {Array.from({ length: 10 }, (_, i) => (
          <MenuItem key={i} value={i + 1}>
            {i + 1}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectLimitForTable;
