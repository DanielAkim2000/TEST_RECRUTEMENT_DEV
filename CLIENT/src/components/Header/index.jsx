import React from "react";
import {
  AppBar,
  Box,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PropTypes from "prop-types";
import ButtonAdCategory from "../Button/ButtonAdCategory";
import ButtonAdProduct from "../Button/ButtonAdProduct";
import BtnSeeAllCategories from "../Button/BtnSeeAllCategories";
import InputSearchProductByName from "../Input/InputSearchProductByName";
import BtnLoginOrRegister from "../Button/BtnLoginOrRegister";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../redux/slices/auth.slice";
import BtnLogout from "../Button/BtnLogout";
import { Link } from "react-router-dom";

const pages = ["Produits", "Categories"];
const navItems = ["Produits", "Categories"];
const drawerWidth = 240;

const Header = (props) => {
  const { window } = props;
  const isAuth = useSelector(selectIsAuthenticated);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box sx={{ textAlign: "center" }}>
      <div className="items-center flex flex-row justify-center my-5">
        <span className="rounded-tl-[2rem] rounded-br-[2rem] rounded-tr-xl rounded-bl-xl bg-primary-main text-white px-3 font-extrabold">
          Prodify
        </span>
      </div>
      <Divider />
      <List>
        <ListItemButton>
          <ButtonAdCategory />
        </ListItemButton>
        <ButtonAdProduct />
        <BtnSeeAllCategories />
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <>
      <AppBar position="sticky">
        <Container
          maxWidth="xl"
          sx={{
            overflow: "hidden",
          }}
        >
          <Toolbar disableGutters>
            <Box sx={styles.boxMenu} alignItems={"center"}>
              <IconButton
                size="large"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleDrawerToggle}
                color="inherit"
                className="sm:!hidden"
              >
                <MenuIcon />
              </IconButton>
              <Link to="/" sx={styles.textLogo}>
                <Typography variant="h6" noWrap sx={styles.textLogo}>
                  Prodify
                </Typography>
              </Link>
            </Box>
            <InputSearchProductByName />
            <div className="ml-auto">
              {isAuth ? (
                <div>
                  <BtnLogout />
                </div>
              ) : (
                <div>
                  <BtnLoginOrRegister />
                </div>
              )}
            </div>
          </Toolbar>
        </Container>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={styles.drawer}
        >
          {drawer}
        </Drawer>
      </nav>
    </>
  );
};

const styles = {
  textLogo: {
    mr: 2,
    display: { xs: "none", md: "flex" },
    fontWeight: 700,
    letterSpacing: ".3rem",
    color: "inherit",
    textDecoration: "none",
  },
  boxMenu: {
    display: "flex",
    alignItems: "center",
  },
  textLogoMenu: {
    mr: 2,
    fontWeight: 700,
    letterSpacing: ".3rem",
    color: "inherit",
    textDecoration: "none",
    // media queries
    display: { xs: "none", sm: "flex" },
  },
  drawer: {
    display: { sm: "block", md: "none" },
    "& .MuiDrawer-paper": {
      boxSizing: "border-box",
      width: drawerWidth,
    },
  },
};

Header.propTypes = {
  window: PropTypes.func,
};

export default Header;
