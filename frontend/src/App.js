import React, { useState, useEffect } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import { decodeToken } from "react-jwt";

import {
  makeStyles,
  ThemeProvider,
  createTheme,
} from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";

import UserApi from "./api/userApi";
import UserContext from "./auth/UserContext";
import Navigation from "./navigation_routes/Navigation";
import Routes from "./navigation_routes/Routes";

const theme = createTheme({
  // typography: {
  //   h5: {
  //     fontSize: 100,
  //   },
  // },
});

/** TravelBuddy Application
 *
 * - dataIsLoading: Identifies if user data has been retrieved.
 *   Manages loading component to show or not.
 *
 * - token: Saved in localStorage and stores username & user_id in payload.
 *
 * - currUser: holds user data for currently logged in user.
 *
 */
const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: "56px",
    marginBottom: "56px",
    paddingBottom: "106px",
    height: "100%",
    flexGrow: 1,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function App() {
  const [dataIsLoading, setDataIsLoading] = useState(true);
  const [token, setToken] = useLocalStorage("user_token");
  const [currUser, setCurrUser] = useState(null);
  const [savedLocationIds, setSavedLocationIds] = useState(new Set([]));
  const classes = useStyles();

  console.debug(
    "App. Loading user data.",
    "currUser: ",
    currUser,
    "token: ",
    token
  );

  /** Updates if token changes.
   *  - dataIsLoading => { true } while awaiting data
   *  - Retrieves user data from token and pulls from UserApi
   *  - Updates currUser & applicationIds
   *  - dataIsLoading => { false } after useEffect
   */
  useEffect(
    function loadUserInfo() {
      async function getCurrUser() {
        if (token) {
          try {
            const { id } = decodeToken(token);
            // Set api token
            UserApi.token = token;
            const user = await UserApi.getCurrUser(id);
            const locationIds = await UserApi.getSavedLocations(id);
            setSavedLocationIds(new Set(locationIds));
            setCurrUser(user);
          } catch (error) {
            console.error("Failed to set current user.", error);
            setCurrUser(null);
          }
        }
        setDataIsLoading(false);
      }
      setDataIsLoading(true);
      getCurrUser();
    },
    [token]
  );

  // User login { username, password } => { token }
  async function login(data) {
    try {
      const token = await UserApi.login(data);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("Error with login. Invalid username or password.", errors);
      return { success: false, errors };
    }
  }

  // User signup { user data } => { token }
  async function signup(data) {
    try {
      const token = await UserApi.signup(data);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("Error with signup.", errors);
      return { success: false, errors };
    }
  }

  // User logout.
  async function logout() {
    setCurrUser(null);
    setToken(null);
  }

  // Check if user has saved location.
  // - Is locationId in savedLocationIds?
  function hasSaved(id) {
    return savedLocationIds.has(id);
  }

  // User saves location
  // - Send api request to save location
  // - Add locaitonId to savedLocationIds set
  async function saveLocation(id) {
    if (hasSaved(id)) return;
    UserApi.addSavedLocation(id, currUser.id);
    setSavedLocationIds(new Set([...savedLocationIds, id]));
  }

  // User removes saved location
  // - Send api request to remove saved location
  // - Remove locationId from savedLocationIds set
  async function removeLocation(id) {
    if (!hasSaved(id)) return;
    UserApi.deleteSavedLocation(id, currUser.id);
    setSavedLocationIds((ids) => {
      const updatedSet = new Set(ids);
      updatedSet.delete(id);
      return updatedSet;
    });
  }

  // Show loading component if data is still loading.
  if (dataIsLoading) {
    return (
      <Backdrop className={classes.backdrop} open={dataIsLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider
        value={{
          currUser,
          setCurrUser,
          savedLocationIds,
          saveLocation,
          removeLocation,
          hasSaved,
        }}
      >
        <Navigation logout={logout} />
        <Grid container justifyContent="center" className={classes.main}>
          <Routes login={login} signup={signup} logout={logout} />
        </Grid>
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default App;
