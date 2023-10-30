import React from "react";
import LocationCard from "./LocationCard";

import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

/** Shows a list of all locations
 *
 * - Saves locations as state
 * - Passes 'search()' to LocationSearchForm which allows
 *   usesrs to filter location list by name
 */
function LocationList({ locations }) {
  const classes = useStyles();
  return (
    <Grid container className={classes.root} spacing={3}>
      {locations.map((l) => (
        <Grid item xs={12} md={6} lg={4} key={l.location_id}>
          <LocationCard
            id={l.location_id}
            name={l.name}
            address={l.address_obj.address_string}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default LocationList;
