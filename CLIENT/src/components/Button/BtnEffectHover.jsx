import React from "react";
import PropTypes from "prop-types";
import { useCallback } from "react";
import { Button } from "@mui/material";

const BtnEffectHover = ({ children, color = "primary-main", ...rest }) => {
  const [isHover, setIsHover] = React.useState(false);

  const handelMouseEnter = useCallback(() => {
    setIsHover(true);
  }, []);

  const handelMouseLeave = useCallback(() => {
    setIsHover(false);
  }, []);

  const getColor = (couleur) => {
    switch (couleur) {
      case "primary-main":
        return "#007bff";
      case "orange-main":
        return "#fd7e14";
      case "green-main":
        return "bg-green-main";
      case "red-main":
        return "#dc3545";
      case "blue-main":
        return "bg-blue-main";
      default:
        return "bg-primary-main";
    }
  };

  return (
    <Button
      onMouseEnter={handelMouseEnter}
      onMouseLeave={handelMouseLeave}
      className={`relative overflow-hidden p-3 rounded-xl font-semibold uppercase text-white 
        bg-white group`}
      {...rest}
    >
      <span
        className={`absolute inset-0 w-full h-full bg-${color} transition-all duration-500 ease-in-out 
          group-hover:w-0 group-hover:opacity-0 `}
      ></span>

      {/* Texte (reste visible) */}
      <span
        className={`relative z-10 transition-all duration-500" 
        }`}
        style={{ color: `${isHover ? getColor(color) : "white"}` }}
      >
        {children}
      </span>
    </Button>
  );
};

BtnEffectHover.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
};

export default BtnEffectHover;
