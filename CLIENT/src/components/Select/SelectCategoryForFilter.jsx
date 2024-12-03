import React from "react";
import { useGetCategoriesQuery } from "../../api/slices/category.slice";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCategory,
  setCategory,
  setPage,
} from "../../redux/slices/searchData.slice";

const SelectCategoryForFilter = () => {
  const { data: categories } = useGetCategoriesQuery();
  const category = useSelector(selectCategory);
  const dispatch = useDispatch();

  const handleChange = async (event) => {
    if (event.target.value === 0) {
      dispatch(setCategory({ id: 0, name: "Choisissez une catégorie" }));
      return;
    }
    const category = categories.find(
      (category) => category.id === event.target.value
    );
    dispatch(setCategory(category));
    dispatch(setPage(1));
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Catégorie</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={category?.id || 0}
        label="Catégorie"
        onChange={handleChange}
      >
        <MenuItem value={0}>Toutes les catégories</MenuItem>
        {categories?.map((category) => (
          <MenuItem key={category?.id} value={category?.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectCategoryForFilter;
