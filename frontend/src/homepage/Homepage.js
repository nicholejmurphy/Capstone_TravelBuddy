import React, { useContext, useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import UserContext from "../auth/UserContext";
import TriviaApi from "../api/triviaApi";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
  },
}));

function Homepage() {
  const [trivia, setTrivia] = useState(null);
  const { currUser } = useContext(UserContext);
  const classes = useStyles();

  useEffect(function loadTrivia() {
    async function getTrivia() {
      let res = await TriviaApi.get();
      setTrivia(res.trivia);
    }
    getTrivia();
  }, []);

  function isLoggedIn() {
    return (
      <Container className={classes.root}>
        <Typography variant="h4">
          Welcome back, {currUser.firstName}!
        </Typography>
        {trivia && (
          <Box component="div">
            <Typography variant="body1">Geography Trivia</Typography>
            <Typography variant="body1">{trivia.question}</Typography>
            <Typography variant="body1">{trivia.answer}</Typography>
          </Box>
        )}
      </Container>
    );
  }

  function notLoggedIn() {
    return (
      <Grid item xs={12} md={8} className={classes.root}>
        <h3>Welcome to TravelBuddy!</h3>
        <p>Login or Signup to get started.</p>
        <Button className="bg-primary" tag="a" href="/login">
          Login
        </Button>
        <Button className="bg-primary" tag="a" href="/signup">
          SignUp
        </Button>
      </Grid>
    );
  }

  return currUser ? isLoggedIn() : notLoggedIn();
}

export default Homepage;
