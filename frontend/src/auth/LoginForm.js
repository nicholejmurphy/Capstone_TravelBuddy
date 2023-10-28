import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import Alerts from "../common/Alerts";

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

/** Handles user login attemps.
 *  - Takes in form data and attempts to authenticate
 *    through UserApi
 *  - If valid, login prop will be triggered therefore updated user data across site.
 *  - If invalid data, a list of error messages will show through the { Alert } component
 */
function LoginForm({ login }) {
  const history = useHistory();
  const classes = useStyles();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  // Tracks changes of form data and updates state
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  }

  // If successful, redirects to homepage
  // if invalid attempt, error messages will be updated
  async function handleSubmit(e) {
    e.preventDefault();
    const res = await login(formData);
    if (res.success) {
      history.push("/");
    } else {
      setFormErrors(res.errors);
    }
  }
  return (
    <Paper className={classes.root}>
      {formErrors.length ? <Alerts type="error" messages={formErrors} /> : null}

      <form className={classes.form} autoComplete="off">
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          direction="column"
        >
          <Grid item>
            <TextField
              required
              id="username"
              label="Username"
              name="username"
              type="text"
              variant="outlined"
              value={formData.username}
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
          Login
        </Button>
      </form>
    </Paper>
  );
}

export default LoginForm;
