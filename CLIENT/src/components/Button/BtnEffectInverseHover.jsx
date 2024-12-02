import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useCallback } from "react";
import { Button } from "@mui/material";

const BtnEffectInverseHover = ({
  children,
  color = "primary-main",
  ...rest
}) => {
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
      case "slate-main":
        return "#475569";
      case "red-main":
        return "#dc3545";
      case "blue-main":
        return "bg-blue-main";
      default:
        return "bg-primary-main";
    }
  };

  useEffect(() => {
    return () => {
      setIsHover(false);
    };
  }, [color]);

  return (
    <Button
      onMouseEnter={handelMouseEnter}
      onMouseLeave={handelMouseLeave}
      className={`relative overflow-hidden p-3 rounded-xl font-semibold uppercase text-white
        bg-white group`}
      {...rest}
    >
      <span
        className={`absolute inset-0 w-0 h-full transition-all duration-500 ease-in-out opacity-0
          group-hover:w-full group-hover:opacity-100 `}
        style={{ backgroundColor: `${isHover ? getColor(color) : "white"}` }}
      ></span>

      {/* Texte (reste visible) */}
      <span
        className={`relative z-10 transition-all duration-500" 
        }`}
        style={{ color: `${isHover ? "white" : getColor(color)} ` }}
      >
        {children}
      </span>
    </Button>
  );
};

BtnEffectInverseHover.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
};

export default BtnEffectInverseHover;
