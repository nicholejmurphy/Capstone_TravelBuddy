import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PersonIcon from "@material-ui/icons/Person";
import HomeIcon from "@material-ui/icons/Home";

import UserContext from "../auth/UserContext";

const useStyles = makeStyles((theme) => ({
  navTop: {
    flexGrow: 1,
    width: "100%",
    position: "fixed",
    top: 0,
    zIndex: 1,
  },
  navContent: {
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "80%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "70%",
    },
  },
  navMenuButton: {
    color: "#ffffff",
  },
  navTitle: {
    flexGrow: 1,
    textDecoration: "none",
    boxShadow: "none",
    color: "#ffffff",
    "&:hover": {
      color: "#d6d0db",
      textDecoration: "none",
    },
  },
  navBottom: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    zIndex: 1,
    boxShadow: "0px 0px 10px rgba(172, 174, 176, 0.75)",
  },
}));

function Navigation({ logout }) {
  const { currUser } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = useState(0);
  const history = useHistory();
  const classes = useStyles();

  const handleClick = (event) => {
    const route = event.target.innerText.toLowerCase();

    handleClose();
    if (route === "logout") {
      logout();
      history.push(`/`);
    } else {
      history.push(`/${route}`);
    }
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event, newValue) => {
    const routes = ["", "locations", "favorites", "settings"];
    setValue(newValue);
    history.push(`/${routes[newValue]}`);
  };

  function isLoggedIn() {
    return (
      <>
        <IconButton
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleMenuClick}
          edge="end"
          className={classes.navMenuButton}
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClick}>Settings</MenuItem>
          <MenuItem onClick={handleClick}>Logout</MenuItem>
        </Menu>
      </>
    );
  }

  return (
    <>
      <AppBar className={classes.navTop} position="static" elevation={5}>
        <Container disableGutters className={classes.navContent}>
          <Toolbar>
            <Link href="/" className={classes.navTitle}>
              <Typography variant="h5">TravelBuddy</Typography>
            </Link>
            {currUser && isLoggedIn()}
          </Toolbar>
        </Container>
      </AppBar>
      {currUser && (
        <BottomNavigation
          value={value}
          onChange={handleChange}
          showLabels
          className={classes.navBottom}
          elevation={5}
        >
          <BottomNavigationAction label="Home" icon={<HomeIcon />} />
          <BottomNavigationAction label="Locations" icon={<LocationOnIcon />} />
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Settings" icon={<PersonIcon />} />
        </BottomNavigation>
      )}
    </>
  );
}

export default Navigation;
