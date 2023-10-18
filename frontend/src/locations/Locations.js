import React, { useState, useEffect } from "react";
import LocationSearchForm from "./LocationSearch";
import LocationList from "./LocationList";
import TravelApi from "../api/travelApi";
import Loading from "../common/Loading";

/** Shows a list of all locations
 *
 * - Saves locations as state
 * - Passes 'setSearchTerm' to LocationSearchForm which allows
 *   usesrs to filter location list by name
 */
function Locations() {
  const [dataIsLoading, setDataIsLoading] = useState(false);
  const [locations, setLocations] = useState(null);
  const [category, setCategory] = useState("geos");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(
    function loadLocations() {
      async function getLocations() {
        if (searchTerm) {
          setDataIsLoading(true);
          try {
            const res = await TravelApi.searchLocation(searchTerm, category);
            setLocations(res);
            console.log(res);
          } catch (error) {
            console.error(
              "Failed to get locations based on search term and category: ",
              searchTerm,
              category,
              ".",
              error
            );
            setLocations(null);
          }
          setDataIsLoading(false);
        }
      }
      getLocations();
    },
    [searchTerm, category]
  );

  if (dataIsLoading) return <Loading />;

  return (
    <div className="">
      {searchTerm && <h3>Things to do in {searchTerm}</h3>}
      <LocationSearchForm
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
      />
      {locations ? (
        <LocationList
          setCategory={setCategory}
          category={category}
          locations={locations}
        />
      ) : (
        <p>Search for a location to get started. Happy Trails!</p>
      )}
    </div>
  );
}

export default Locations;
