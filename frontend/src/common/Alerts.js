import React from "react";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: "5px",
    marginBottom: "15px",
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
    <div className={classes.root}>
      {messages.map((message) => (
        <Alert severity={type} key={message}>
          {message}
        </Alert>
      ))}
    </div>
  );
}

export default Alerts;
