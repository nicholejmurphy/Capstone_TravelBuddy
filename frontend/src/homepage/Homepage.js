import React, { useContext, useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import ToggleButton from "@material-ui/lab/ToggleButton";

import UserContext from "../auth/UserContext";
import TriviaApi from "../api/triviaApi";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    paddingTop: "20px",
  },
  hook: {
    fontStyle: "italic",
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "200",
    marginTop: "20px",
    margin: "auto",
    maxWidth: "500px",
  },
  trivia: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "30px",
    padding: "8px",
    color: "#ffffff",
  },
  access: {
    margin: "5px",
  },
  toggle: {
    height: "15px",
    margin: "5px",
  },
  answer: {
    padding: "10px",
    margin: "5px",
    backgroundColor: "rgba(184, 177, 196, 0.5)",
    borderRadius: "8px",
  },
}));

function Homepage() {
  const [trivia, setTrivia] = useState(null);
  const [method, setMethod] = useState("login");
  const [revealed, setRevealed] = useState(false);
  const { currUser } = useContext(UserContext);
  const classes = useStyles();

  useEffect(function loadTrivia() {
    async function getTrivia() {
      let res = await TriviaApi.get();
      setTrivia(res.trivia);
    }
    getTrivia();
  }, []);

  const handleAccess = (event) => {
    const access = event.target.innerText.toLowerCase();
    setMethod(access);
  };

  function notLoggedIn() {
    return (
      <Container className={classes.access}>
        <div className={classes.accessToggle}>
          <Button disabled={method === "login"} onClick={handleAccess}>
            Login
          </Button>
          <Button disabled={method === "signup"} onClick={handleAccess}>
            SignUp
          </Button>
        </div>
        {method === "login" ? <LoginForm /> : <SignupForm />}
      </Container>
    );
  }

  return (
    <Container className={classes.root}>
      <Typography className={classes.title} variant="h4">
        {currUser ? `back, ${currUser.firstName}!` : null}
      </Typography>
      <Typography className={classes.hook} variant="h4">
        "All of your travel needs in one location."
      </Typography>
      {trivia && (
        <Box className={classes.trivia} elevation={10}>
          <Typography variant="h5">Geography Trivia</Typography>
          <Typography variant="subtitle1">{trivia.question}</Typography>
          <ToggleButton
            className={classes.toggle}
            value="check"
            selected={revealed}
            onChange={() => {
              setRevealed(!revealed);
            }}
          >
            <Typography variant="body1">
              {revealed ? "Hide" : "Reveal"}
            </Typography>
          </ToggleButton>
          <Fade in={revealed}>
            <Typography className={classes.answer} variant="body1">
              {trivia.answer}
            </Typography>
          </Fade>
        </Box>
      )}
      {!currUser && notLoggedIn()}
    </Container>
  );
}

export default Homepage;
