import { Slider } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPriceMax,
  selectPriceMin,
  setPage,
  setPriceMax,
  setPriceMin,
} from "../../redux/slices/searchData.slice";

function valuetext(value) {
  return `${value} €`;
}

const minDistance = 500;

const marks = [
  {
    value: 0,
    label: "0 €",
  },
  {
    value: 10000,
    label: "10000 €",
  },
];

const InputPriceFilter = () => {
  const priceMax = useSelector(selectPriceMax);
  const priceMin = useSelector(selectPriceMin);
  const dispatch = useDispatch();
  const [localPrice, setLocalPrice] = React.useState([priceMin, priceMax]);
  const [debounceTimeout, setDebounceTimeout] = React.useState(null);
  const handleChange = async (e, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    let newPrice = [];
    if (activeThumb === 0) {
      newPrice = [
        Math.min(newValue[0], localPrice[1] - minDistance),
        localPrice[1],
      ];
    } else {
      newPrice = [
        localPrice[0],
        Math.max(newValue[1], localPrice[0] + minDistance),
      ];
    }
    setLocalPrice(newPrice);
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    const newTimeout = setTimeout(() => {
      dispatch(setPriceMin(newPrice[0]));
      dispatch(setPriceMax(newPrice[1]));
      dispatch(setPage(1));
    }, 500);
    setDebounceTimeout(newTimeout);
  };

  console.log("priceMin", priceMin);
  console.log("priceMax", priceMax);
  return (
    <div className="w-[95%] p-2">
      <Slider
        getAriaLabel={() => "Price range"}
        value={localPrice}
        max={10000}
        min={0}
        onChange={handleChange}
        valueLabelDisplay={"auto"}
        getAriaValueText={valuetext}
        marks={marks}
        step={100}
        disableSwap
      />
    </div>
  );
};

export default InputPriceFilter;
