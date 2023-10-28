import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import Alerts from "../common/Alerts";
import UserContext from "../auth/UserContext";
import UserApi from "../api/userApi";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
    padding: "15px",
    width: "250px",
  },
  form: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  submit: {
    marginLeft: "8px",
  },
}));

/** Handles user profile information update
 *  - Pulls user data from currUser state to populate form.
 *  - Requires password input to verify submission
 *  - Updates user info across site state.
 */
function ProfileForm({ logout }) {
  const history = useHistory();
  const classes = useStyles();
  const { currUser, setCurrUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    firstName: currUser.firstName,
    lastName: currUser.lastName,
  });
  const [formErrors, setFormErrors] = useState([]);
  const [updateConfirmed, setUpdateConfirmed] = useState(false);

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
   *    - Update form data and clear password
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
    setFormData((data) => ({ ...data, password: "" }));
    setFormErrors([]);
  }

  async function handleDelete(e) {
    e.preventDefault();
    UserApi.deleteProfile(currUser.id);
    logout();
    alert(`${currUser.username} has been successfully deleted.`);
    history.push("/");
  }

  return (
    <Paper className={classes.root}>
      {updateConfirmed ? (
        <Alerts
          type="success"
          messages={["Profile has been successfully updated!"]}
        />
      ) : null}
      {formErrors.length ? <Alerts type="error" messages={formErrors} /> : null}
      <Typography variant="h2"></Typography>
      <form className={classes.form} autoComplete="off">
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
          <Grid item>
            <TextField
              required
              id="password"
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              value={formData.password}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Button className={classes.submit} onClick={handleSubmit}>
          Update
        </Button>
        <br />
        <Button onClick={handleDelete}>Delete Account</Button>
      </form>
    </Paper>
  );
}

export default ProfileForm;
