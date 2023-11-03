import React, { useState } from "react";

import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import InputBase from "@material-ui/core/InputBase";
import Popover from "@material-ui/core/Popover";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  search: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
  },
  input: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  tip: {
    padding: theme.spacing(2),
    width: "320px",
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

/** Search input for locations
 *  - Parent passes setSearchTerm & searchTerm {state} which will trigger
 *    useEffect updating locations in parent
 *  - searchTerm may not be empty, otherwise error alert will show
 */
function LocationSearchForm({ searchTerm, setSearchTerm, setError }) {
  const [formData, setFormData] = useState(searchTerm);
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // Updates serchterm state on form input change
  function handleChange(e) {
    setFormData(e.target.value);
    setError(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formData) {
      setError(true);
    } else {
      setSearchTerm(formData);
    }
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Paper component="form" className={classes.search}>
      <InputBase
        className={classes.input}
        id="search"
        name="search"
        type="text"
        placeholder="Search for your next adventure"
        value={formData}
        onChange={handleChange}
        inputProps={{ "aria-label": "search locations" }}
      />
      <IconButton
        type="submit"
        onClick={handleSubmit}
        className={classes.iconButton}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton
        aria-describedby={id}
        onClick={handleClick}
        className={classes.iconButton}
        color="primary"
        aria-label="help"
      >
        <HelpOutlineIcon />
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Typography
          className={classes.tip}
          variant="body2"
          color="primary"
          align="center"
        >
          Try enhancing your search criteria with specific locations! If a
          search is broad, you may recieve repetitive data. <br />
          We hope this helps!
        </Typography>
      </Popover>
    </Paper>
  );
}

export default LocationSearchForm;
