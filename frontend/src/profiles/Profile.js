import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
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
  title: {
    marginTop: "40px",
    marginBottom: "40px",
    fontWeight: 200,
    color: "#ffffff",
  },
  savedError: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
  },
  savedErrorBody: {
    padding: "20px",
    marginTop: "10px",
    width: "90%",
    maxWidth: "600px",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  clear: { marginTop: "5px" },
  profile: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: "30px",
    marginTop: "10px",
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
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
    width: "400px",
    height: 250,
    margin: "10px",
  },
  skeletonMedia: {
    height: 150,
  },
}));

/** Shows User's saved locations (favorites) data
 *  - Gets saved data and passes to LocationList
 *
 * { Further Study: }
 * Adding a drop down for user's saved locations
 * and will add saved translations/conversions here or on separate pages
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
        <div className={classes.savedError}>
          <Paper className={classes.savedErrorBody}>
            <Typography align="left" color="primary" variant="h6">
              Server Error
            </Typography>
            <Typography align="left" variant="body2">
              Unfortunately, details on {notFoundIds.length} of your saved
              locations are no longer avaiable. We know this is not ideal, and
              we are sorry for the inconvienence.
            </Typography>

            <Typography align="right">
              <Button
                color="secondary"
                variant="outlined"
                size="small"
                onClick={handleClear}
                className={classes.clear}
              >
                Clear
              </Button>
            </Typography>
          </Paper>
        </div>
      )}
      <Paper className={classes.profile}>
        {dataIsLoading && (
          <div>
            <Box className={classes.skeletonBox}>
              <Skeleton variant="rect" className={classes.skeletonMedia} />
              <Box pt={0.5}>
                <Skeleton />
                <Skeleton width="60%" />
              </Box>
            </Box>
            <Box className={classes.skeletonBox}>
              <Skeleton variant="rect" className={classes.skeletonMedia} />
              <Box pt={0.5}>
                <Skeleton />
                <Skeleton width="60%" />
              </Box>
            </Box>
            <Box className={classes.skeletonBox}>
              <Skeleton variant="rect" className={classes.skeletonMedia} />
              <Box pt={0.5}>
                <Skeleton />
                <Skeleton width="60%" />
              </Box>
            </Box>
          </div>
        )}
        {locations.length ? (
          <Grid item container justifyContent="center" spacing={3}>
            <LocationList locations={locations} />
          </Grid>
        ) : (
          <Typography align="center" variant="subtitle1">
            Looks like you don't have any saved locations yet...
            <br />
            Head over ot the <Link to="/locations">Locations</Link> page and
            start exploring!
          </Typography>
        )}
      </Paper>
    </Grid>
  );
}

export default Profile;
