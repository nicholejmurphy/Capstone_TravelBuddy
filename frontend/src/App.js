import React, { useState, useEffect } from "react";
// import "./App.css";
import useLocalStorage from "./hooks/useLocalStorage";
import UserApi from "./api/userApi";
import { decodeToken } from "react-jwt";
import UserContext from "./auth/UserContext";
import Loading from "./common/Loading";
import Navigation from "./navigation_routes/Navigation";
import Routes from "./navigation_routes/Routes";

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
function App() {
  const [dataIsLoading, setDataIsLoading] = useState(true);
  const [token, setToken] = useLocalStorage("user_token");
  const [currUser, setCurrUser] = useState(null);
  const [savedLocationIds, setSavedLocationIds] = useState(null);

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
            const locations = await UserApi.getSavedLocations(id);
            setSavedLocationIds(locations);
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

  // Show loading component if data is still loading.
  if (dataIsLoading) {
    return <Loading />;
  }

  return (
    <UserContext.Provider value={{ currUser, setCurrUser }}>
      <Navigation logout={logout} />
      <div className="App">
        <Routes login={login} signup={signup} logout={logout} />
      </div>
    </UserContext.Provider>
  );
}

export default App;
