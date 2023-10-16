import React from "react";
import UserContext from "./auth/UserContext";

const testUser = {
  id: 234,
  username: "testuser",
  first_name: "testuser",
  last_name: "testuser",
  location_id: "60489",
  location_name: "Asheville, NC",
};

const UserProvider = (currUser = testUser, { children }) => (
  <UserContext.Provider value={{ currUser }}>{children}</UserContext.Provider>
);

export { UserProvider };
