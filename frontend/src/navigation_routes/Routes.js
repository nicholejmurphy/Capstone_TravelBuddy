import React from "react";
import { Route, Switch } from "react-router-dom";
import "./Routes.css";
import PrivateRoute from "./PrivateRoutes";
import Homepage from "../homepage/Homepage";
import Profile from "../profiles/Profile";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
import Locations from "../locations/Locations";
import LocationDetails from "../locations/LocationDetails";
import NotFound from "../common/NotFound";

function Routes({ login, signup, logout }) {
  return (
    <div className="Routes rounded shadow">
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route path="/login">
          <LoginForm login={login} />
        </Route>
        <Route path="/signup">
          <SignupForm signup={signup} />
        </Route>
        <PrivateRoute exact path="/locations">
          <Locations />
        </PrivateRoute>
        <PrivateRoute path="/locations/:locationId">
          <LocationDetails />
        </PrivateRoute>
        <PrivateRoute path="/profile">
          <Profile logout={logout} />
        </PrivateRoute>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default Routes;
