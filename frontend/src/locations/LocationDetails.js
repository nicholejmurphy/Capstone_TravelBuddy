import React, { useState, useEffect, useContext } from "react";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Skeleton from "@material-ui/lab/Skeleton";

import UserContext from "../auth/UserContext";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import TravelApi from "../api/travelApi";
import LocationPhotos from "./LocationPhotos";
import LocationReviewList from "./LocationReviewList";
import NotFound from "../common/NotFound";

const useStyles = makeStyles((theme) => ({
  locationDetails: {
    paddingTop: "56px",
  },
  title: {
    // marginBottom: "px",
    fontWeight: 200,
  },
  main: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.up("sm")]: {
      width: "80%",
    },
    [theme.breakpoints.up("md")]: {
      width: "70%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "60%",
    },
  },
  body: {
    padding: "30px",
    marginTop: "10px",
    marginBottom: "20px",
  },
  address: {
    marginTop: "5px",
    marginBottom: "5px",
  },
}));

/** Shows location details
 *
 * - Gets location id from url params
 * - Retrieves location details, reviews, and photos from API
 * - Passes reviews and photos to children
 */
function LocationDetails() {
  const { saveLocation, hasSaved, removeLocation } = useContext(UserContext);
  const [saved, setSaved] = useState(false);
  const [dataIsLoading, setDataIsLoading] = useState(false);
  const [location, setLocation] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [photos, setPhotos] = useState(null);

  const { locationId } = useParams();
  const classes = useStyles();

  useEffect(
    function loadLocation() {
      async function getLocation() {
        setDataIsLoading(true);
        try {
          const detailsRes = await TravelApi.getLocationDetails(locationId);
          const photosRes = await TravelApi.getLocationPhotos(locationId);
          const reviewsRes = await TravelApi.getLocationReviews(locationId);
          setLocation(detailsRes.name ? detailsRes : null);
          setPhotos(photosRes);
          setReviews(reviewsRes);
          // Check if user has saved the location
          setSaved(hasSaved(locationId));
        } catch (error) {
          console.error("Failed to get location: ", locationId, error);
          setLocation(null);
        }
        setDataIsLoading(false);
      }
      getLocation();
    },
    [locationId]
  );

  async function handleSave() {
    if (!saved) {
      // Handle saving location
      saveLocation(locationId);
      setSaved(true);
    } else {
      // Handle removing location
      removeLocation(locationId);
      setSaved(false);
    }
  }

  if (dataIsLoading) return null;

  return (
    <Grid container justifyContent="center" className={classes.locationDetails}>
      {location ? (
        <Grid container item justifyContent="center">
          <Grid item className={classes.main}>
            <LocationPhotos photos={photos} />
            <Paper className={classes.body}>
              <Grid container item spacing={2}>
                <Grid item>
                  <Typography variant="h4" className={classes.title}>
                    {location.name}
                  </Typography>
                  <Typography variant="caption">
                    <img
                      alt="rating icon"
                      src={location.rating_image_url}
                    ></img>
                    {location.rating} ({location.num_reviews} reviews)
                  </Typography>
                  <Typography variant="subtitle2" className={classes.address}>
                    {location.address_obj.address_string}
                  </Typography>
                  <Typography variant="body1">
                    {location.description}
                  </Typography>
                </Grid>
                <Grid item container alignItems="center">
                  <Grid item xs={11}>
                    <ButtonGroup
                      // variant="text"
                      color="primary"
                      size="small"
                      aria-label="write a reviw or read more on TripAdvisor"
                    >
                      <Button
                        component={Link}
                        href={location.write_review}
                        target="_blank"
                      >
                        Write a Review
                      </Button>
                      <Button
                        component={Link}
                        href={location.web_url}
                        target="_blank"
                      >
                        Read more on TripAdvisor
                      </Button>
                    </ButtonGroup>
                  </Grid>
                  <Grid item xs={1}>
                    <Tooltip title="Save for later">
                      <IconButton
                        aria-label="add to favorites"
                        onClick={handleSave}
                      >
                        <FavoriteIcon color={saved ? "secondary" : "inherit"} />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
            <Paper className={classes.body}>
              <LocationReviewList reviews={reviews} />
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <NotFound />
      )}
    </Grid>
  );
}

export default LocationDetails;
