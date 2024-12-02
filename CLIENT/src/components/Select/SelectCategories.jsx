import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useGetCategoriesQuery } from "../../api/slices/category.slice";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCategory,
  setCategory as setFormProductCategory,
} from "../../redux/slices/formProduct.slice";

const SelectCategories = () => {
  const { data: categories } = useGetCategoriesQuery();

  const category = useSelector(selectCategory);
  const dispatch = useDispatch();

  const handleChange = async (event) => {
    if (event.target.value === 0) {
      dispatch(
        setFormProductCategory({ id: 0, name: "Choisissez une catégorie" })
      );
      return;
    }
    const category = categories.find(
      (category) => category.id === event.target.value
    );
    dispatch(setFormProductCategory(category));
  };

  console.log("category", category);

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
        <MenuItem value={0}>Choisissez une catégorie</MenuItem>
        {categories?.map((category) => (
          <MenuItem key={category?.id} value={category?.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectCategories;
