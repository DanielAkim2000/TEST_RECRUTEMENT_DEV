import { IconButton, Menu, MenuItem } from "@mui/material";
import React from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectIsAuthenticated } from "../../redux/slices/auth.slice";
import useSnackbar from "../../hooks/useSnackBar";
import BtnMyProfile from "./BtnMyProfile";

const BtnLogout = () => {
  const isAuth = useSelector(selectIsAuthenticated);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { openSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = async () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    dispatch(logout());
    handleClose().then(() => {
      openSnackbar("Déconnexion réussie", "info");
    });
  };

  if (isAuth) {
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
          <BtnMyProfile handleCloseModal={handleClose} />
          <MenuItem onClick={handleLogout}>Déconnexion</MenuItem>
        </Menu>
      </>
    );
  }
  return null;
};

export default BtnLogout;
