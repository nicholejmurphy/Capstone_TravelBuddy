import React from "react";

import {
  Typography,
  makeStyles,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  notFound: {
    //
  },
  body: {},
  gif: {
    width: "90%",
    minWidth: "420px",
    [theme.breakpoints.up("sm")]: {
      width: "80%",
    },
    [theme.breakpoints.up("md")]: {
      width: "70%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "60%",
    },
    borderRadius: "6px",
    marginTop: "20px",
  },
}));

/** NotFound Component shows 404 error message for not found errors. */
function NotFound() {
  const classes = useStyles();
  return (
    <Grid container justifyContent="center" className={classes.body}>
      <Card className={classes.gif}>
        <CardMedia
          component="img"
          alt="Cat on a vacuum"
          height="200"
          image="https://media3.giphy.com/media/KcQeAaJVeTcNP4vQYM/giphy.gif?cid=ecf05e47djhk25xlwkzwwa85vn368h78bu776fjtfjpi2ixj&ep=v1_gifs_search&rid=giphy.gif&ct=g"
          title="Cat on a vacuum"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            color="secondary"
            component="h2"
          >
            404 Error
          </Typography>
          <Typography variant="body1" component="p">
            Okay, we're a little embarassed.. we can't find the URL you've
            requested. We are sorry for the inconvinence.
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default NotFound;
