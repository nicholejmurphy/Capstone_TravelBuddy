import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";
import Container from "@material-ui/core/Container";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import HomeIcon from "@material-ui/icons/Home";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import useMediaQuery from "@material-ui/core/useMediaQuery";

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
    "&:hover": {
      color: "#d6d0db",
    },
  },
  navLink: {
    "&:hover": {
      color: "#d6d0db",
    },
    margin: "5px",
  },
  navBottom: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    zIndex: 1,
    boxShadow: "0px 0px 10px rgba(172, 174, 176, 0.75)",
  },
}));

/** Navigation component
 *
 * - Conditional rendering based on if a user is logged in and viewport size
 * - Renders basic nav bar with nav links (include bottom navbar links if below small breakpoint)
 * - Renders bottom app bar for mobile viewports
 * - Has an array of route names and routes are tracked as active based on their index in the routes array
 */
function Navigation({ logout }) {
  const { currUser } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [activePage, setActivePage] = useState(0);
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const smallViewport = useMediaQuery(theme.breakpoints.down("xs"));
  const routes = ["", "locations", "converter", "settings", "favorites"];

  const handleClick = (event) => {
    const route = event.target.innerText.toLowerCase();

    handleClose();
    if (route === "logout") {
      logout();
      setActivePage(0);
      history.push(`/`);
    } else if (route === "travelbuddy") {
      setActivePage(0);
      history.push(`/`);
    } else {
      setActivePage(routes.indexOf(route));
      history.push(`/${route}`);
    }
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event, newPage) => {
    setActivePage(newPage);
    history.push(`/${routes[newPage]}`);
  };

  function isLoggedIn() {
    return (
      <Grid item container xs={1} justifyContent="flex-end">
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
          <MenuItem onClick={handleClick}>Favorites</MenuItem>
          <MenuItem onClick={handleClick}>Logout</MenuItem>
        </Menu>
      </Grid>
    );
  }

  function showSmallNav() {
    if (!currUser) return null;
    return (
      <BottomNavigation
        value={activePage}
        onChange={handleChange}
        showLabels
        className={classes.navBottom}
        elevation={5}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Locations" icon={<LocationOnIcon />} />
        <BottomNavigationAction label="Converter" icon={<LocalAtmIcon />} />
      </BottomNavigation>
    );
  }

  function showRegNav() {
    if (!currUser) return null;
    return (
      <Grid
        item
        container
        justifyContent="flex-end"
        alignItems="center"
        xs={10}
        spacing={2}
      >
        <Grid item>
          <Typography
            variant="body1"
            color="inherit"
            onClick={handleClick}
            className={classes.navLink}
            style={{
              fontWeight: routes[activePage] === "locations" ? 500 : 200,
            }}
          >
            LOCATIONS
          </Typography>{" "}
        </Grid>

        <Grid item>
          <Typography
            variant="body1"
            color="inherit"
            onClick={handleClick}
            className={classes.navLink}
            style={{
              fontWeight: routes[activePage] === "converter" ? 500 : 200,
            }}
          >
            CONVERTER
          </Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    <>
      <AppBar className={classes.navTop} position="static" elevation={5}>
        <Container disableGutters className={classes.navContent}>
          <Toolbar>
            <Typography
              variant="h5"
              component="div"
              onClick={handleClick}
              className={classes.navTitle}
            >
              TravelBuddy
            </Typography>
            <Grid container justifyContent="flex-end">
              {!smallViewport && showRegNav()}
              {currUser && isLoggedIn()}
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>
      {smallViewport && showSmallNav()}
    </>
  );
}

export default Navigation;
