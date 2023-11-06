import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoutes";
import Homepage from "../homepage/Homepage";
import Favorites from "../profiles/Favorites";
import Settings from "../profiles/Settings";
import Locations from "../locations/Locations";
import LocationDetails from "../locations/LocationDetails";
import NotFound from "../common/NotFound";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  routes: {
    minWidth: "380px",
  },
}));

/** Routes component to handle site routing
 * - include PrivateRoutes which authorize only logged in user access
 */
function Routes({ login, signup, logout }) {
  const classes = useStyles();
  return (
    <div className={classes.routes}>
      <Switch>
        <Route exact path="/">
          <Homepage login={login} signup={signup} />
        </Route>
        <PrivateRoute path="/settings">
          <Settings logout={logout} />
        </PrivateRoute>
        <PrivateRoute exact path="/locations">
          <Locations />
        </PrivateRoute>
        <PrivateRoute path="/locations/:locationId">
          <LocationDetails />
        </PrivateRoute>
        <PrivateRoute path="/favorites">
          <Favorites />
        </PrivateRoute>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default Routes;
