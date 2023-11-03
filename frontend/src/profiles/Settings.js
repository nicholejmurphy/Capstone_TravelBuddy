import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Modal from "@material-ui/core/Modal";

import Alerts from "../common/Alerts";
import UserContext from "../auth/UserContext";
import UserApi from "../api/userApi";

const useStyles = makeStyles((theme) => ({
  settingsBody: {
    margin: "auto",
    marginTop: "20px",
    padding: "15px",
    width: "250px",
    display: "flex",
    justifyContent: "center",
  },
  title: {
    marginTop: "40px",
    marginBottom: "20px",
    fontWeight: "200",
    color: "#ffffff",
  },
  form: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  submit: {
    margin: "4px",
  },
  delete: {
    width: "300px",
    height: "300px",
    position: "absolute",
    left: "50%",
    top: "50%",
    marginLeft: "-150px",
    marginTop: "-150px",
    padding: "30px",
    borderRadius: "8px",
    backgroundColor: "rgba(255,255,255)",
  },
  confirm: {
    marginTop: "10px",
  },
}));

/** Handles user profile information update
 *  - Pulls user data from currUser state to populate form.
 *  - Updates user info across site state.
 */
function Settings({ logout }) {
  const { currUser, setCurrUser } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [formErrors, setFormErrors] = useState([]);
  const [updateConfirmed, setUpdateConfirmed] = useState(false);
  const [formData, setFormData] = useState({
    firstName: currUser.firstName,
    lastName: currUser.lastName,
  });
  const history = useHistory();
  const classes = useStyles();

  /** Handle form input changes
   *  - update formData state to catch all form changes
   *
   */
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  }

  /** Handle form submition
   *  - Attempts to updated profile through UserApi
   *   { data } => { user }
   *  - If valid user,
   *    - Update currUser across application
   *    - Reset formErrors
   *  - If invalid request, show errors
   *
   */
  async function handleSubmit(e) {
    e.preventDefault();
    const profileData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
    };
    const userId = currUser.id;
    let updatedUser;

    try {
      updatedUser = await UserApi.updateProfile(userId, profileData);
    } catch (errors) {
      setFormErrors(errors);
      return;
    }
    setCurrUser(updatedUser);
    setUpdateConfirmed(true);
    setFormData((data) => ({ ...data }));
    setFormErrors([]);
  }

  async function handleDelete(e) {
    e.preventDefault();
    alert(`${currUser.username} has been successfully deleted.`);
    UserApi.deleteProfile(currUser.id);
    logout();
    history.push("/");
  }

  return (
    <div>
      <Typography variant="h4" align="center" className={classes.title}>
        Profile Settings
      </Typography>
      {updateConfirmed ? (
        <Alerts
          type="success"
          messages={["Profile has been successfully updated!"]}
        />
      ) : null}
      {formErrors.length ? <Alerts type="error" messages={formErrors} /> : null}
      <Paper className={classes.settingsBody}>
        <Typography variant="h2"></Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            direction="column"
          >
            <Grid item>
              <TextField
                disabled
                id="username"
                label="Username"
                name="username"
                type="text"
                variant="outlined"
                value={currUser.username}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                required
                id="first_name"
                label="First Name"
                name="firstName"
                type="text"
                variant="outlined"
                value={formData.firstName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                required
                id="last_name"
                label="Last Name"
                name="lastName"
                type="text"
                variant="outlined"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button className={classes.submit} color="primary" type="submit">
            Update
          </Button>
          <br />
        </form>
      </Paper>
      <Paper className={classes.settingsBody}>
        <Button
          variant="contained"
          color="secondary"
          type="button"
          className={classes.submitDelete}
          onClick={() => {
            setOpen(!open);
          }}
          startIcon={<DeleteIcon />}
        >
          Delete My Account
        </Button>
        <Modal
          open={open}
          onClose={() => {
            setOpen(!open);
          }}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className={classes.delete}>
            <Typography variant="h5">Are you sure??</Typography>

            <Typography variant="body1">
              Deleteing your account will erase all of the really cool data
              you've saved.{" "}
            </Typography>
            <hr />
            <Button
              variant="contained"
              color="secondary"
              className={classes.confirm}
              onClick={handleDelete}
            >
              Yea, I'm out.
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.confirm}
              onClick={() => {
                setOpen(!open);
              }}
            >
              Nah, I'll stay.
            </Button>
          </div>
        </Modal>
      </Paper>
    </div>
  );
}

export default Settings;
