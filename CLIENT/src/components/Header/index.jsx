import React from "react";
import {
  alpha,
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  InputBase,
  List,
  ListItemButton,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import SearchIcon from "@mui/icons-material/Search";
import PropTypes from "prop-types";
import ButtonAdCategory from "../Button/ButtonAdCategory";
import ButtonAdProduct from "../Button/ButtonAdProduct";
import BtnSeeAllCategories from "../Button/BtnSeeAllCategories";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 10,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  borderRadius: theme.shape.borderRadius,
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "30ch",
      },
    },
  },
}));

const pages = ["Produits", "Categories"];
const navItems = ["Produits", "Categories"];
const drawerWidth = 240;

const Header = (props) => {
  const { window } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [auth, setAuth] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={styles.textLogoMenu}
              >
                PRODIFY
              </Typography>
            </Box>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                className="ml-auto"
                onChange={(e) => console.log(e.target.value)}
              />
            </Search>
            <div className="ml-auto">
              {auth ? (
                <div>
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
                    <MenuItem onClick={handleClose}>Déconnexion</MenuItem>
                  </Menu>
                </div>
              ) : (
                <div>
                  <IconButton size="large" color="inherit">
                    <LoginIcon />
                  </IconButton>
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
