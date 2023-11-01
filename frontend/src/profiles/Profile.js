import React, { useContext, useState, useEffect } from "react";
import UserContext from "../auth/UserContext";
import TravelApi from "../api/travelApi";
import LocationList from "../locations/LocationList";

import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Skeleton from "@material-ui/lab/Skeleton";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  profile: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: "30px",
    marginTop: "10px",
  },
  title: {
    marginTop: "30px",
    marginBottom: "30px",
    fontWeight: 200,
    color: "#ffffff",
  },
  body: {
    paddingTop: "10px",
    flexGrow: 1,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  skeletonBox: {
    width: "100%",
    height: 250,
    margin: "10px",
  },
  skeletonMedia: {
    height: 150,
  },
  clear: {
    marginTop: "15px",
  },
}));

/** Shows user 's profile data
 *  - Gets saved on data and passes to LocationList
 */
function Profile() {
  const { savedLocationIds, removeLocation } = useContext(UserContext);
  const [locations, setLocations] = useState([]);
  const [dataIsLoading, setDataIsLoading] = useState(false);
  const [notFoundIds, setNotFoundIds] = useState(null);
  const classes = useStyles();

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

  return (
    <Grid>
      <Typography variant="h4" className={classes.title} align="center">
        Saved Locations
      </Typography>
      {notFoundIds && (
        <Paper className={classes.profile}>
          <div>
            <Typography variant="h6">Server Error:</Typography>
            <Typography variant="body1">
              Unfortunately, details on {notFoundIds.length} of your saved
              locations are no longer avaiable. We know this is not ideal, and
              we are sorry for the inconvienence.
            </Typography>
            <Typography variant="body2">
              Clear your invalid locations here:{" "}
            </Typography>
            <Button
              color="secondary"
              variant="contained"
              size="small"
              onClick={handleClear}
              className={classes.clear}
            >
              Clear
            </Button>
          </div>
        </Paper>
      )}
      <Paper className={classes.profile}>
        {dataIsLoading &&
          Array.from(new Array(3)).map((index) => (
            <Box key={index} className={classes.skeletonBox}>
              <Skeleton
                key={index}
                variant="rect"
                className={classes.skeletonMedia}
              />
              <Box pt={0.5} key={index}>
                <Skeleton />
                <Skeleton width="60%" />
              </Box>
            </Box>
          ))}
        {locations.length ? (
          <Grid item container justifyContent="center" spacing={3}>
            <LocationList locations={locations} />
          </Grid>
        ) : (
          <Typography variant="subtitle1" align="left">
            You have no saved locations yet.
          </Typography>
        )}
      </Paper>
    </Grid>
  );
}

export default Profile;
