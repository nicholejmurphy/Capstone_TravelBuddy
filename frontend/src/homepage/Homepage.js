import React, { useContext, useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import ToggleButton from "@material-ui/lab/ToggleButton";
import Skeleton from "@material-ui/lab/Skeleton";
import Grid from "@material-ui/core/Grid";

import UserContext from "../auth/UserContext";
import TriviaApi from "../api/triviaApi";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";

const useStyles = makeStyles(() => ({
  home: {
    maxWidth: "390px",
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  title: {
    marginTop: "40px",
    color: "#ffffff",
    fontWeight: "200",
  },
  hook: {
    color: "#FFFFFF",
    fontWeight: "200",
    marginTop: "40px",
    fontSize: "180%",
    minWidth: "350px",
  },
  trivia: {
    marginTop: "40px",
    padding: "8px",
    color: "#ffffff",
  },
  loadingTrivia: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  access: {
    margin: "5px",
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    margin: "8px",
  },
  toggle: {
    height: "15px",
    width: "100px",
    margin: "5px",
    backgroundColor: "#ffffff",
  },
  answer: {
    padding: "10px",
    margin: "5px",
    backgroundColor: "rgba(184, 177, 196, 0.5)",
    borderRadius: "8px",
  },
}));

/** Homepage for TavelBuddy.
 *
 *  - Responsive to user logged in or not
 *  - Shows random triva facts from around the world, gets fact on first render
 *  - If no user, signup/login forms are displayed
 *  - If user is logged in, a welcome is displayed
 */
function Homepage({ login, signup }) {
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
        <div className={classes.buttons}>
          <Button
            onClick={handleAccess}
            style={{
              fontWeight: method === "login" ? "600" : "200",
            }}
          >
            Login
          </Button>
          <Button
            style={{
              fontWeight: method === "signup" ? "600" : "200",
            }}
            onClick={handleAccess}
          >
            SignUp
          </Button>
        </div>
        {method === "login" ? (
          <LoginForm login={login} />
        ) : (
          <SignupForm signup={signup} />
        )}
      </Container>
    );
  }

  return (
    <Container className={classes.home}>
      {currUser && (
        <Typography className={classes.title} align="center" variant="h5">
          Welcome back, {currUser.firstName}!
        </Typography>
      )}
      <Typography className={classes.hook} align="center" variant="h4">
        What are you waiting for?
        <br />
        Let's do this.
      </Typography>
      {trivia ? (
        <Grid container justifyContent="center" className={classes.trivia}>
          <Grid item xs={12}>
            <Typography variant="h5" align="center">
              Geography Trivia
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" align="center">
              {trivia.question}
            </Typography>
          </Grid>
          <Grid item container justifyContent="center" xs={12}>
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
          </Grid>
          <Grid item xs={12}>
            <Fade in={revealed}>
              <Typography
                className={classes.answer}
                align="center"
                variant="body2"
              >
                {trivia.answer}
              </Typography>
            </Fade>
          </Grid>
        </Grid>
      ) : (
        <div className={classes.trivia}>
          <Skeleton variant="text" height={60} width="200px" />
          <Skeleton variant="text" height={40} width="200px" />
          <Skeleton variant="text" height={40} width="200px" />
        </div>
      )}
      {!currUser && notLoggedIn()}
    </Container>
  );
}

export default Homepage;
