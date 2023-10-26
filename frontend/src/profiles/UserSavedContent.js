import React, { useState, useContext } from "react";
import Alerts from "../common/Alerts";
import UserContext from "../auth/UserContext";
import UserApi from "../api/userApi";

/** Shows list of user's saved locations
 *  - Retreives saved location data from UserApi
 *  - User's can remove saved locations
 */
function SavedContent() {
  const [locations, setLocations] = useState(null);
  const { currUser } = useContext(UserContext);

  // Get's saved locations on mount and re-renders if a user updates locations list
  useEffect(
    function getSavedLocations() {
      async function getLocations() {
        try {
          const res = await UserApi.getSavedLocations(currUser.id);
          setLocations(res);
        } catch (error) {
          console.error("Failed to get saved locations.", error);
          setLocations(null);
        }
      }
      getLocations();
    },
    [locations]
  );

  /** Handles deletions of saved item
   * - Triggers API call to removed item from user's data
   * - Filters state of items, which triggers re-render of comp to update list
   */
  async function handleDelete(e) {
    e.preventDefault();
    UserApi.deleteSavedLocation(currUser.id, e.target.id);
    const updatedList = locations.filter((l) => l.locationId !== e.target.id);
    setLocations(...updatedList);
  }

  return (
    <div className="SavedContent bg-light p-4 w-100 shadow rounded">
      <h1>{currUser.firstName}'s favorites</h1>
      <h4>Saved Locations</h4>
      {locations ? (
        locations.map((l) => (
          <div>
            <p>{l.name}</p>
            <p>{l.addressString}</p>
            <button id={l.locationId} onClick={handleDelete}>
              Delete
            </button>
          </div>
        ))
      ) : (
        <p>You don't have any locations saved yet.</p>
      )}
    </div>
  );
}

export default SavedContent;
