import { Slider, styled } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPriceMax,
  selectPriceMin,
  setPage,
  setPriceMax,
  setPriceMin,
} from "../../redux/slices/searchData.slice";
import { useGetPrixMaxQuery } from "../../api/slices/product.slice";

function valuetext(value) {
  return `${value} €`;
}

const minDistance = 50000;

const StyledSlider = styled(Slider)({
  color: "#007bff",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 20,
    width: 20,
    backgroundColor: "#fff",
    border: "4px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&::before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "4px 8px",
    borderRadius: 4,
    transformOrigin: "bottom center",
    transform: "translateY(-50%)",
    whiteSpace: "nowrap",
    "&::before": {
      display: "none",
    },
  },
});

const InputPriceFilter = () => {
  // prix max et min pour la recherche
  const priceMax = useSelector(selectPriceMax);
  const priceMin = useSelector(selectPriceMin);
  const dispatch = useDispatch();

  const { data } = useGetPrixMaxQuery();
  const [localPrice, setLocalPrice] = React.useState([0, 1000000]);
  const [isSliding, setIsSliding] = React.useState(false);
  const [maxPriceLabel, setMaxPriceLabel] = React.useState(1000000);

  // on met a ajour le prix max si la valeur change dans la base de donnée
  React.useEffect(() => {
    if (data?.maxPrice && data.maxPrice !== maxPriceLabel) {
      setMaxPriceLabel(data.maxPrice);
      dispatch(setPriceMax(data.maxPrice));
    }
  }, [data?.maxPrice, maxPriceLabel]);

  // on synchtronise localement si l utilisateur slide
  React.useEffect(() => {
    if (!isSliding && data?.maxPrice && priceMax !== null) {
      setLocalPrice([priceMin, priceMax]);
    }
    if (priceMax === null && data?.maxPrice) {
      setLocalPrice([priceMin, data.maxPrice]);
    }
  }, [priceMin, priceMax, data?.maxPrice, isSliding]);

  const handleChange = (e, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) return;

    const newPrice =
      activeThumb === 0
        ? [Math.min(newValue[0], localPrice[1] - minDistance), localPrice[1]]
        : [localPrice[0], Math.max(newValue[1], localPrice[0] + minDistance)];

    setLocalPrice(newPrice);
  };

  // on met a jour le prix min et max pour la recherche
  const handleChangeCommitted = () => {
    setIsSliding(false);
    dispatch(setPriceMin(localPrice[0]));
    dispatch(setPriceMax(localPrice[1]));
    dispatch(setPage(1));
  };

  // me permet de recharger les données à chaque fois que je change de page, de limite, de prix ou de catégorie
  const handleSliderStart = () => {
    setIsSliding(true);
  };

  return (
    <div className="w-[95%] p-2">
      <StyledSlider
        getAriaLabel={() => "Price range"}
        value={localPrice}
        max={maxPriceLabel}
        min={0}
        onChange={handleChange}
        onChangeCommitted={handleChangeCommitted}
        onMouseDown={handleSliderStart}
        onTouchStart={handleSliderStart}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        marks={[
          { value: localPrice[0], label: `${localPrice[0]} €` },
          {
            value: localPrice[1] !== null ? localPrice[1] : "",
            label: `${localPrice[1] !== null ? `${localPrice[1]} €` : ""}`,
          },
          { value: maxPriceLabel, label: `Max (${maxPriceLabel} €)` },
        ]}
        step={Math.max(1, maxPriceLabel / 100)}
        disableSwap
      />
    </div>
  );
};

export default InputPriceFilter;
