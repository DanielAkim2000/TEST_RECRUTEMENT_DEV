import React from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useGetCategoriesQuery } from "../../api/slices/category.slice";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCategory,
  setCategory as setFormProductCategory,
} from "../../redux/slices/formProduct.slice";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "../../api/slices/product.slice";

const SelectCategories = () => {
  const { data: categories } = useGetCategoriesQuery();
  const [fecthCreate, { isError: isErrorUpdate }] = useUpdateProductMutation();
  const [fecthUpdate, { isError: isErrorCreate }] = useCreateProductMutation();
  const [touched, setTouched] = React.useState(false);

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

  const testCategory = (category) => {
    if (categories.find((cat) => cat.id === category?.id)) {
      return true;
    }
    return false;
  };

  const checkCategory = () => {
    if (
      (!testCategory(category) && touched) ||
      (!testCategory(category) && (isErrorCreate || isErrorUpdate))
    ) {
      return true;
    }
    return false;
  };

  return (
    <FormControl fullWidth error={checkCategory()}>
      <InputLabel id="demo-simple-select-label">Catégorie</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={category?.id || 0}
        label="Catégorie"
        onChange={handleChange}
        onFocus={() => setTouched(true)}
      >
        <MenuItem value={0}>Choisissez une catégorie</MenuItem>
        {categories?.map((category) => (
          <MenuItem key={category?.id} value={category?.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText error>
        {checkCategory() ? "Veuillez choisir une catégorie" : ""}
      </FormHelperText>
    </FormControl>
  );
};

export default SelectCategories;
