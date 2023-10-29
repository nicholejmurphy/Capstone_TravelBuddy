import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoutes";
import Homepage from "../homepage/Homepage";
import Profile from "../profiles/Profile";
import ProfileForm from "../profiles/ProfileForm";
import Locations from "../locations/Locations";
import LocationDetails from "../locations/LocationDetails";
import NotFound from "../common/NotFound";

function Routes({ login, signup, logout }) {
  return (
    <div className="Routes">
      <Switch>
        <Route exact path="/">
          <Homepage login={login} signup={signup} />
        </Route>
        <Route path="/settings">
          <ProfileForm logout={logout} />
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
