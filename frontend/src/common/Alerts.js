import React from "react";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  alert: {
    width: "420px",
    margin: "auto",
    "& > * + *": {
      margin: theme.spacing(2),
    },
  },
}));

/** Alert Component shows error messages from a variety of components.
 *  - renders with "type" { success, danger, warning }
 *    which controls the color of alert
 *  - errors maps through to show each error message
 */
function Alerts({ type, messages }) {
  const classes = useStyles();

  return (
    <Grid container justifyContent="center" className={classes.alert}>
      {messages.map((message) => (
        <Alert severity={type} key={message}>
          {message}
        </Alert>
      ))}
    </Grid>
  );
}

export default Alerts;
