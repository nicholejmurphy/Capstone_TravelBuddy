import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoutes";
import Homepage from "../homepage/Homepage";
import Profile from "../profiles/Profile";
import ProfileForm from "../profiles/Settings";
import Locations from "../locations/Locations";
import LocationDetails from "../locations/LocationDetails";
import NotFound from "../common/NotFound";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  routes: {
    minWidth: "430px",
  },
}));

function Routes({ login, signup, logout }) {
  const classes = useStyles();
  return (
    <div className={classes.routes}>
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
        <PrivateRoute path="/favorites">
          <Profile />
        </PrivateRoute>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default Routes;
