import React from "react";
import LocationCard from "./LocationCard";
import { ButtonGroup, Button } from "reactstrap";

/** Shows a list of all locations
 *
 * - Saves locations as state
 * - Passes 'search()' to LocationSearchForm which allows
 *   usesrs to filter location list by name
 */
function LocationList({ category, setCategory, locations }) {
  return (
    <div className="LocationList container rounded shadow">
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
      {locations.map((l) => (
        <LocationCard
          key={l.location_id}
          id={l.location_id}
          name={l.location_name}
          address={l.address_obj.address_string}
        />
      ))}
    </div>
  );
}

export default LocationList;
