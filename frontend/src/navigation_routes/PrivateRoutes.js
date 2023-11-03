import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../auth/UserContext";

/** Higher order function wrapper for auth routes
 *
 *  - Checks if there is a current user
 *    yes? Direct to path.
 *    no? Redirect to "/".
 */
function PrivateRoute({ exact, path, children }) {
  const { currUser } = useContext(UserContext);

  if (!currUser) {
    return <Redirect to="/" />;
  }

  return (
    <Route exact={exact} path={path}>
      {children}
    </Route>
  );
}

export default PrivateRoute;
