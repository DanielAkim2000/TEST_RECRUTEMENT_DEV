import React from "react";
import CachedIcon from "@mui/icons-material/Cached";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";

const RotatingIcon = styled(CachedIcon)(({ theme }) => ({
  animation: "rotate 1s linear infinite",
  "@keyframes rotate": {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
}));

const Spinner = ({ isLoading, content }) => {
  if (isLoading) {
    return <RotatingIcon />;
  }
  return <>{content}</>;
};

Spinner.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  content: PropTypes.element.isRequired,
};

export default Spinner;
