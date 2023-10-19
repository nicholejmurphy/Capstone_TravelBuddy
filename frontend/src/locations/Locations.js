import React, { useState, useEffect } from "react";
import { ButtonGroup, Button } from "reactstrap";
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
      <ButtonGroup>
        <Button
          color="primary"
          outline
          onClick={() => setCategory("geos")}
          active={category === "geos"}
        >
          General
        </Button>
        <Button
          color="primary"
          outline
          onClick={() => setCategory("hotels")}
          active={category === "hotels"}
        >
          Hotels
        </Button>
        <Button
          color="primary"
          outline
          onClick={() => setCategory("restaurants")}
          active={category === "restaurants"}
        >
          Restaurants
        </Button>
        <Button
          color="primary"
          outline
          onClick={() => setCategory("attractions")}
          active={category === "attractions"}
        >
          Attractions
        </Button>
      </ButtonGroup>
      {locations ? (
        <LocationList locations={locations} />
      ) : (
        <p>Search for a location to get started. Happy Trails!</p>
      )}
    </div>
  );
}

export default Locations;
