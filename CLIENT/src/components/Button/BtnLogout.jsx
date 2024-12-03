import { IconButton, Menu, MenuItem } from "@mui/material";
import React from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/auth.slice";

const BtnLogout = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
  };

  return (
    <>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Mon Compte</MenuItem>
        <MenuItem onClick={handleLogout}>Déconnexion</MenuItem>
      </Menu>
    </>
  );
};

export default BtnLogout;
