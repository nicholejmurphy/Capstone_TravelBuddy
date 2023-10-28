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
import UserContext from "../auth/UserContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "#ffffff",
  },
  title: {
    flexGrow: 1,
    textDecoration: "none",
    boxShadow: "none",
    color: "#ffffff",
    "&:hover": {
      color: "#d6d0db",
      textDecoration: "none",
    },
  },
}));

function Navigation({ logout }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();
  const { currUser } = useContext(UserContext);
  const classes = useStyles();

  const handleClick = (event) => {
    const route = event.target.innerText.toLowerCase();
    handleClose();
    if (route === "logout") {
      logout();
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

  function isLoggedIn() {
    return (
      <>
        <IconButton
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleMenuClick}
          edge="start"
          className={classes.menuButton}
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
          <MenuItem onClick={handleClick}>Profile</MenuItem>
          <MenuItem onClick={handleClick}>Logout</MenuItem>
        </Menu>
      </>
    );
  }

  return (
    <AppBar className={classes.root} position="static">
      <Toolbar>
        <Link href="/" className={classes.title}>
          <Typography variant="h5">TravelBuddy</Typography>
        </Link>
        {currUser && isLoggedIn()}
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;
