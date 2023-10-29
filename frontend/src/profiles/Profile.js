import React, { useContext, useState, useEffect } from "react";
import UserContext from "../auth/UserContext";
import TravelApi from "../api/travelApi";
import Loading from "../common/Loading";
import LocationList from "../locations/LocationList";
import { Button } from "reactstrap";

/** Shows user 's profile data
 *  - Gets saved on data and passes to LocationList
 */
function Profile({ logout }) {
  const { savedLocationIds, removeLocation } = useContext(UserContext);
  const [locations, setLocations] = useState([]);
  const [dataIsLoading, setDataIsLoading] = useState(false);
  const [notFoundIds, setNotFoundIds] = useState(null);

  useEffect(() => {
    async function getLocationsOnMount() {
      setDataIsLoading(true);
      const promiseArray = [];
      savedLocationIds.forEach((id) => {
        promiseArray.push(TravelApi.getLocationDetails(id));
      });
      let res = await Promise.all(promiseArray);
      filterLocations(res);
      setDataIsLoading(false);
    }
    getLocationsOnMount();
  }, [savedLocationIds]);

  // TripAdvisor has some inconsitencies with their location ids. After a user has saved their location, it may not
  function filterLocations(locations) {
    const ids = [];
    const filteredLocations = [];
    locations.forEach((l) => {
      l.name ? filteredLocations.push(l) : ids.push(l.location_id);
    });
    setLocations(filteredLocations);
    setNotFoundIds(ids.length ? ids : null);
  }

  function handleClear(e) {
    e.preventDefault();
    notFoundIds.forEach((id) => {
      removeLocation(id);
    });
    setNotFoundIds(null);
  }

  if (dataIsLoading) return <Loading />;

  return (
    <div className="Profile bg-light p-4 shadow rounded">
      <div className="m-3">
        {notFoundIds && (
          <div>
            <h4>Server Error:</h4>
            <p>
              Unfortunately, details on {notFoundIds.length} of your saved
              locations are no longer avaiable. We know this is not ideal, and
              we are sorry for the inconvienence.
            </p>
            <p>
              Clear your invalid locations here:{" "}
              <Button onClick={handleClear}>Clear</Button>
            </p>
          </div>
        )}
        <h4>Saved Locations</h4>
        {/* {locations.length ? (
          <LocationList locations={locations} />
        ) : (
          <p>You have no saved locations yet.</p>
        )} */}
      </div>
    </div>
  );
}

export default Profile;
