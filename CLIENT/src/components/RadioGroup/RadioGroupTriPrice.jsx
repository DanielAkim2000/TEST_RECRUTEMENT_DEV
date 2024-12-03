import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  styled,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTriPrice,
  setPage,
  setTriPrice,
} from "../../redux/slices/searchData.slice";

const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: "50%",
  width: 16,
  height: 16,
  boxShadow:
    "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
  backgroundColor: "#f5f8fa",
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
  ".Mui-focusVisible &": {
    outline: "2px auto rgba(19,124,189,.6)",
    outlineOffset: 2,
  },
  "input:hover ~ &": {
    backgroundColor: "#ebf1f5",
    ...theme.applyStyles("dark", {
      backgroundColor: "#30404d",
    }),
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background: "rgba(206,217,224,.5)",
    ...theme.applyStyles("dark", {
      background: "rgba(57,75,89,.5)",
    }),
  },
  ...theme.applyStyles("dark", {
    boxShadow: "0 0 0 1px rgb(16 22 26 / 40%)",
    backgroundColor: "#394b59",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))",
  }),
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: "#007bff",
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  "&::before": {
    display: "block",
    width: 16,
    height: 16,
    backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: "#106ba3",
  },
});

function BpRadio(props) {
  return (
    <Radio
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
}

const RadioGroupTriPrice = () => {
  const triPrice = useSelector(selectTriPrice);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(setTriPrice(event.target.value));
    dispatch(setPage(1));
  };
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Trier par prix</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        value={triPrice}
        name="radio-buttons-group"
        row
        onChange={handleChange}
      >
        <FormControlLabel
          value="asc"
          control={<BpRadio size="small" />}
          label="Croissant"
        />
        <FormControlLabel
          value="desc"
          control={<BpRadio size="small" />}
          label="Décroissant"
        />
      </RadioGroup>
    </FormControl>
  );
};

export default RadioGroupTriPrice;
