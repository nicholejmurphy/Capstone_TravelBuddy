import React from "react";
import LocationCard from "./LocationCard";

import Grid from "@material-ui/core/Grid";

/** Shows a list of all locations
 *
 * - Recieves list of locations from parent
 * - Maps data to location cards and renders inside a responsive grid
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
