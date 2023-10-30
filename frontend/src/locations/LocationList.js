import React from "react";
import LocationCard from "./LocationCard";

/** Shows a list of all locations
 *
 * - Saves locations as state
 * - Passes 'search()' to LocationSearchForm which allows
 *   usesrs to filter location list by name
 */
function LocationList({ locations }) {
  return (
    <div className="LocationList">
      {locations.map((l) => (
        <LocationCard
          key={l.location_id}
          id={l.location_id}
          name={l.name}
          address={l.address_obj.address_string}
        />
      ))}
    </div>
  );
}

export default LocationList;
