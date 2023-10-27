import React, { useContext, useState, useEffect } from "react";
import ProfileForm from "./ProfileForm";
import UserContext from "../auth/UserContext";
import TravelApi from "../api/travelApi";
import Loading from "../common/Loading";
import LocationList from "../locations/LocationList";

/** Shows user 's profile data
 *  - Gets saved on data and passes to LocationList
 */
function Profile({ logout }) {
  const { savedLocationIds } = useContext(UserContext);
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
      setLocations(res);
      setDataIsLoading(false);
    }
    getLocationsOnMount();
  }, [savedLocationIds]);

  // TripAdvisor has some inconsitencies with their location ids. After a user has saved their location, it may not
  // function filteredLocations() {
  //   const notFoundIds = [];
  //   const filtered = locations.map((l) => {
  //     if (l.location_id) {
  //       return l;
  //     } else {
  //       notFoundIds.push(l.location_id);
  //     }
  //   });
  //   return <LocationList locations={filtered} />;
  // }

  if (dataIsLoading) return <Loading />;
  return (
    <div className="Profile bg-light p-4 shadow rounded">
      <div className="m-3">
        <h4>Saved Locations</h4>
        {locations.length ? (
          <LocationList locations={locations} />
        ) : (
          <p>You have no saved locations yet.</p>
        )}
      </div>
      <ProfileForm logout={logout} />
    </div>
  );
}

export default Profile;
