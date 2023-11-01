import React from "react";
import LocationCard from "./LocationCard";

import Grid from "@material-ui/core/Grid";

/** Shows a list of all locations
 *
 * - Saves locations as state
 * - Passes 'search()' to LocationSearchForm which allows
 *   usesrs to filter location list by name
 */
function LocationList({ locations }) {
  return (
    <>
      {locations.map((l) => (
        <Grid
          item
          container
          xs={12}
          md={6}
          lg={4}
          key={l.location_id}
          justifyContent="center"
          alignContent="space-between"
        >
          <LocationCard
            id={l.location_id}
            name={l.name}
            address={l.address_obj.address_string}
          />
        </Grid>
      ))}
    </>
  );
}

export default LocationList;
